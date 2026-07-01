import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";
import { createServer } from "node:http";
import type { IncomingMessage, ServerResponse } from "node:http";

const repoRoot = resolve(process.cwd(), "..");
const buildDir = resolve(repoRoot, "build");
const port = Number(process.env.PORT ?? 10000);

const contentTypes: Record<string, string> = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
};

function sendFile(filePath: string, response: ServerResponse<IncomingMessage>) {
  const contentType = contentTypes[extname(filePath)] ?? "application/octet-stream";
  response.writeHead(200, { "Content-Type": contentType });
  createReadStream(filePath).pipe(response);
}

createServer((request, response) => {
  const requestUrl = new URL(request.url ?? "/", `http://${request.headers.host ?? "localhost"}`);
  const requestPath = decodeURIComponent(requestUrl.pathname);
  const safePath = normalize(requestPath).replace(/^([.]{2}[\/\\])+/, "");
  const filePath = join(buildDir, safePath);

  if (existsSync(filePath) && statSync(filePath).isFile()) {
    sendFile(filePath, response);
    return;
  }

  const indexPath = join(buildDir, "index.html");
  if (existsSync(indexPath)) {
    sendFile(indexPath, response);
    return;
  }

  response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  response.end("Build output not found. Run pnpm run build first.");
}).listen(port, "0.0.0.0", () => {
  console.log(`Serving ${buildDir} on http://0.0.0.0:${port}`);
});