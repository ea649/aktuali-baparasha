// שרת מקומי לבדיקת האתר: node tools/serve.mjs  ← http://localhost:8080
import http from "node:http"; import fs from "node:fs"; import path from "node:path";
const T = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".png": "image/png", ".webp": "image/webp", ".otf": "font/otf", ".pdf": "application/pdf" };
http.createServer((q, s) => {
  let p = decodeURIComponent(q.url.split("?")[0]); if (p.endsWith("/")) p += "index.html";
  const f = path.join(process.cwd(), p);
  fs.readFile(f, (e, d) => { if (e) { s.writeHead(404); return s.end("404"); } s.writeHead(200, { "Content-Type": T[path.extname(f)] || "application/octet-stream", "Cache-Control": "no-store" }); s.end(d); });
}).listen(8080);
