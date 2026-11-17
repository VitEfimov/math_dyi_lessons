# Antigravity Python Dev Runner (Fallback)
import http.server
import socketserver
import webbrowser
import mimetypes
import sys
import os

PORT = int(os.environ.get("PORT", 3000))
os.chdir(os.path.dirname(os.path.abspath(__file__)))

mimetypes.add_type("application/javascript", ".js")
mimetypes.add_type("application/javascript", ".mjs")
mimetypes.add_type("application/manifest+json", ".webmanifest")
mimetypes.add_type("application/json", ".json")

class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-cache")
        self.send_header("Access-Control-Allow-Origin", "*")
        super().end_headers()

def run():
    port = PORT
    while port < PORT + 20:
        try:
            with socketserver.TCPServer(("0.0.0.0", port), QuietHandler) as httpd:
                url = f"http://localhost:{port}"
                print("\n======================================================")
                print(" 🚀 Antigravity Math PWA - Python Dev Runner")
                print("======================================================")
                print(f"  ➜  URL: {url}")
                print("======================================================\n")
                print(f"Opening {url} in your default browser...")
                webbrowser.open(url)
                httpd.serve_forever()
        except OSError:
            port += 1
            continue

if __name__ == "__main__":
    run()
