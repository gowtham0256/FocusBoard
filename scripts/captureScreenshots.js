import http from "http";
import fs from "fs";
import path from "path";
import { execFileSync } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, "../dist");
const screenshotsDir = path.resolve(__dirname, "../screenshots");

if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

// MIME types dictionary
const MIME_TYPES = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".json": "application/json",
};

// Simple static file server
const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, "http://127.0.0.1:4173");
  let pathname = parsedUrl.pathname;
  if (pathname === "/") pathname = "/index.html";

  const filePath = path.join(distDir, pathname);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    const contentType = MIME_TYPES[ext] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": contentType });
    fs.createReadStream(filePath).pipe(res);
  } else {
    // SPA fallback to index.html
    const indexPath = path.join(distDir, "index.html");
    res.writeHead(200, { "Content-Type": "text/html" });
    fs.createReadStream(indexPath).pipe(res);
  }
});

const PORT = 4173;
server.listen(PORT, "127.0.0.1", () => {
  console.log(`Static server running at http://127.0.0.1:${PORT}`);

  // Find Chrome or Edge executable
  const chromePaths = [
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  ];
  let browserExe = chromePaths.find((p) => fs.existsSync(p));

  if (!browserExe) {
    console.error("No suitable browser found for capturing screenshots.");
    server.close();
    process.exit(1);
  }

  console.log(`Using browser: ${browserExe}`);

  const targets = [
    {
      name: "desktop-1440.png",
      url: `http://127.0.0.1:${PORT}/`,
      width: 1440,
      height: 1000,
    },
    {
      name: "tablet-768.png",
      url: `http://127.0.0.1:${PORT}/`,
      width: 768,
      height: 1024,
    },
    {
      name: "mobile-390.png",
      url: `http://127.0.0.1:${PORT}/`,
      width: 390,
      height: 1128,
    },
    {
      name: "create-task-modal.png",
      url: `http://127.0.0.1:${PORT}/?modal=create`,
      width: 1440,
      height: 1000,
    },
    {
      name: "edit-task-modal.png",
      url: `http://127.0.0.1:${PORT}/?modal=edit`,
      width: 1440,
      height: 1000,
    },
    {
      name: "delete-confirm-modal.png",
      url: `http://127.0.0.1:${PORT}/?modal=delete`,
      width: 1440,
      height: 1000,
    },
    {
      name: "focus-notes-carousel.png",
      url: `http://127.0.0.1:${PORT}/`,
      width: 1440,
      height: 1000,
    },
  ];

  for (const target of targets) {
    const outPath = path.join(screenshotsDir, target.name);
    console.log(`Capturing ${target.name} (${target.width}x${target.height})...`);

    const args = [
      "--headless",
      "--no-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--hide-scrollbars",
      `--window-size=${target.width},${target.height}`,
      `--screenshot=${outPath}`,
      "--virtual-time-budget=2000",
      target.url,
    ];

    try {
      execFileSync(browserExe, args, { stdio: "ignore" });
      console.log(`Saved: ${outPath} (${fs.statSync(outPath).size} bytes)`);
    } catch (err) {
      console.error(`Failed to capture ${target.name}:`, err.message);
    }
  }

  server.close(() => {
    console.log("Screenshot capture complete. Server closed.");
  });
});
