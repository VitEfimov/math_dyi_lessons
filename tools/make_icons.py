"""Generate PWA PNG icons (pure stdlib). Run: python tools/make_icons.py"""
import math, struct, zlib, pathlib

OUT = pathlib.Path(__file__).resolve().parent.parent / "icons"
OUT.mkdir(exist_ok=True)

def lerp(a, b, t): return a + (b - a) * t

def render(size, maskable):
    px = bytearray()
    c1, c2 = (79, 70, 229), (124, 58, 237)
    pad = 0 if maskable else size * 0.0
    radius = 0 if maskable else size * 0.22
    scale = 0.62 if maskable else 0.78   # keep art inside the maskable safe zone
    s = size
    for y in range(size):
        px.append(0)
        for x in range(size):
            # rounded-square mask (supersampled edge)
            inside = 1.0
            if radius:
                dx = max(abs(x + .5 - s / 2) - (s / 2 - radius), 0)
                dy = max(abs(y + .5 - s / 2) - (s / 2 - radius), 0)
                d = math.hypot(dx, dy) - radius
                inside = max(0.0, min(1.0, 0.5 - d))
            t = (x + y) / (2 * s)
            r, g, b = (lerp(c1[i], c2[i], t) for i in range(3))
            # normalized coords centered, art space [-1,1]
            u = ((x + .5) / s - .5) * 2 / scale
            v = ((y + .5) / s - .5) * 2 / scale
            white = 0.0
            # upward arrow: triangle head + shaft
            if -0.55 <= v <= 0.0 and abs(u) <= (v + 0.55) * 0.9 * 0.0 + (0.55 + v) * 0.95: white = 1.0
            if 0.0 < v <= 0.55 and abs(u) <= 0.16: white = 1.0
            # floating dots (anti-gravity)
            for cx, cy, rr in ((-0.62, 0.62, 0.09), (0.62, 0.45, 0.07), (0.0, 0.85, 0.06)):
                if math.hypot(u - cx, v - cy) <= rr: white = 1.0
            if white:
                r, g, b = 255, 255, 255
            px += bytes((int(r), int(g), int(b), int(255 * inside)))
    return bytes(px)

def png(size, data):
    def chunk(tag, body):
        c = struct.pack(">I", len(body)) + tag + body
        return c + struct.pack(">I", zlib.crc32(tag + body) & 0xFFFFFFFF)
    ihdr = struct.pack(">IIBBBBB", size, size, 8, 6, 0, 0, 0)
    return b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", ihdr) + chunk(b"IDAT", zlib.compress(data, 9)) + chunk(b"IEND", b"")

for name, size, mask in (("icon-192.png", 192, False), ("icon-512.png", 512, False), ("icon-maskable-512.png", 512, True)):
    (OUT / name).write_bytes(png(size, render(size, mask)))
    print("wrote", name)

(OUT / "icon.svg").write_text(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">'
    '<stop offset="0" stop-color="#4f46e5"/><stop offset="1" stop-color="#7c3aed"/></linearGradient></defs>'
    '<rect width="512" height="512" rx="113" fill="url(#g)"/>'
    '<path d="M256 88 L376 232 H300 V376 H212 V232 H136 Z" fill="#fff"/>'
    '<circle cx="132" cy="412" r="22" fill="#fff"/><circle cx="388" cy="388" r="16" fill="#fff"/><circle cx="256" cy="440" r="13" fill="#fff"/></svg>',
    encoding="utf-8")
print("wrote icon.svg")
