// Antigravity Math PWA - Dev Server & Runner
// Zero-dependency: runs on Node.js built-ins with instant startup,
// proper MIME types, auto-opening the browser, and live-reload on file edits.

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { exec, spawn } from 'node:child_process';
import os from 'node:os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = __dirname;

const DEFAULT_PORT = parseInt(process.env.PORT || '3000', 10);
const AUTO_OPEN = !process.argv.includes('--no-open');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
};

// --- Live Reload via Server-Sent Events (SSE) ---
const sseClients = new Set();

function notifyClients() {
  for (const res of sseClients) {
    try {
      res.write('data: reload\n\n');
    } catch {
      sseClients.delete(res);
    }
  }
}

// Watch project directories for file changes (debounced)
let watchTimer = null;
const WATCH_DIRS = ['', 'js', 'css', 'data', 'icons'];

for (const dir of WATCH_DIRS) {
  const targetPath = path.join(ROOT, dir);
  if (fs.existsSync(targetPath)) {
    try {
      fs.watch(targetPath, { recursive: false }, (eventType, filename) => {
        if (!filename) return;
        if (filename.startsWith('.') || filename.endsWith('~')) return;
        clearTimeout(watchTimer);
        watchTimer = setTimeout(() => {
          console.log(`  [LiveReload] ${filename} changed, reloading connected browsers...`);
          notifyClients();
        }, 120);
      });
    } catch (err) {
      // Recursive watching might not be supported on all platforms/dirs, ignore
    }
  }
}

// Client-side script injected into index.html for auto-reload
const LIVE_RELOAD_SCRIPT = `
<!-- Antigravity Dev Live-Reload -->
<script>
(() => {
  if (window.location.protocol === 'file:') return;
  const es = new EventSource('/__livereload');
  es.onmessage = (e) => {
    if (e.data === 'reload') {
      console.log('[DevServer] File changed, reloading...');
      window.location.reload();
    }
  };
  es.onerror = () => {
    // Reconnect after server restart
    setTimeout(() => {
      fetch('/index.html', { method: 'HEAD' })
        .then(() => window.location.reload())
        .catch(() => {});
    }, 1500);
  };
})();
</script>
`;

function getLocalIp() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name] || []) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return '127.0.0.1';
}

function openBrowser(url) {
  const platform = process.platform;
  let cmd = '';
  let args = [];

  if (platform === 'win32') {
    cmd = 'cmd.exe';
    args = ['/c', 'start', '""', url];
  } else if (platform === 'darwin') {
    cmd = 'open';
    args = [url];
  } else {
    cmd = 'xdg-open';
    args = [url];
  }

  try {
    const cp = spawn(cmd, args, { detached: true, stdio: 'ignore' });
    cp.unref();
  } catch (err) {
    console.warn(`  Could not open browser automatically: ${err.message}`);
  }
}

function requestHandler(req, res) {
  // SSE endpoint for live reload
  if (req.url === '/__livereload') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
    });
    res.write('retry: 1000\n\n');
    sseClients.add(res);
    req.on('close', () => sseClients.delete(res));
    return;
  }

  // Parse path and normalize
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  if (pathname === '/' || pathname === '') {
    pathname = '/index.html';
  }

  // Sanitize path to prevent directory traversal
  const safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(ROOT, safePath);

  // If path is directory, look for index.html
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  // Check file existence
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    // SPA fallback: return index.html for unknown routes if not asking for static assets
    const ext = path.extname(filePath);
    if (!ext || ext === '.html') {
      filePath = path.join(ROOT, 'index.html');
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(`404 Not Found: ${pathname}`);
      return;
    }
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  try {
    let content = fs.readFileSync(filePath);

    // Inject live-reload script into HTML
    if (ext === '.html') {
      const htmlStr = content.toString('utf-8');
      if (htmlStr.includes('</body>')) {
        content = Buffer.from(htmlStr.replace('</body>', `${LIVE_RELOAD_SCRIPT}\n</body>`));
      } else {
        content = Buffer.from(`${htmlStr}\n${LIVE_RELOAD_SCRIPT}`);
      }
    }

    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': content.length,
      // Dev mode: prevent caching issues
      'Cache-Control': ext === '.html' ? 'no-cache, no-store, must-revalidate' : 'no-cache',
      'Access-Control-Allow-Origin': '*',
    });
    res.end(content);
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`500 Server Error: ${err.message}`);
  }
}

function startServer(port) {
  const server = http.createServer(requestHandler);

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`  Port ${port} in use, trying port ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('Server error:', err);
      process.exit(1);
    }
  });

  server.listen(port, '0.0.0.0', () => {
    const localIp = getLocalIp();
    const localUrl = `http://localhost:${port}`;
    const networkUrl = `http://${localIp}:${port}`;

    console.log('\n  ======================================================');
    console.log('   🚀 Antigravity Math PWA - Local Dev Runner');
    console.log('  ======================================================');
    console.log(`   ➜  Local:    ${localUrl}`);
    console.log(`   ➜  Network:  ${networkUrl}`);
    console.log('   ➜  Status:   Ready (Live Reload active)');
    console.log('  ======================================================\n');
    console.log('  Press Ctrl+C to stop the server.\n');

    if (AUTO_OPEN) {
      console.log(`  Opening ${localUrl} in your default browser...`);
      openBrowser(localUrl);
    }
  });
}

startServer(DEFAULT_PORT);
