import http from "http";
import fs from "fs";
import path from "path";
import puppeteer from "puppeteer-core";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, "../dist");
const screenshotsDir = path.resolve(__dirname, "../screenshots");

if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

const MIME_TYPES = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".json": "application/json",
};

// Static server for dist folder
const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, "http://127.0.0.1:4173");
  let pathname = parsedUrl.pathname;
  if (pathname === "/") pathname = "/index.html";

  const filePath = path.join(distDir, pathname);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    res.writeHead(200, { "Content-Type": MIME_TYPES[ext] || "application/octet-stream" });
    fs.createReadStream(filePath).pipe(res);
  } else {
    const indexPath = path.join(distDir, "index.html");
    res.writeHead(200, { "Content-Type": "text/html" });
    fs.createReadStream(indexPath).pipe(res);
  }
});

const PORT = 4173;

server.listen(PORT, "127.0.0.1", async () => {
  console.log(`Static server running at http://127.0.0.1:${PORT}`);

  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  console.log("Launching browser via puppeteer-core...");

  try {
    const browser = await puppeteer.launch({
      executablePath: chromePath,
      headless: "new",
      args: ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"],
    });

    const page = await browser.newPage();

    // 1. Desktop Viewport - Overview (1440x1000)
    console.log("Capturing desktop-1440.png (Overview)...");
    await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 2 });
    await page.goto(`http://127.0.0.1:${PORT}/#overview`, { waitUntil: "networkidle0" });
    await new Promise((r) => setTimeout(r, 400));
    await page.screenshot({ path: path.join(screenshotsDir, "desktop-1440.png") });

    // 2. Desktop Viewport - My tasks (#tasks)
    console.log("Capturing desktop-tasks.png...");
    await page.goto(`http://127.0.0.1:${PORT}/#tasks`, { waitUntil: "networkidle0" });
    await new Promise((r) => setTimeout(r, 400));
    await page.screenshot({ path: path.join(screenshotsDir, "desktop-tasks.png") });

    // 3. Tablet Viewport (768x1024)
    console.log("Capturing tablet-768.png...");
    await page.setViewport({ width: 768, height: 1024, deviceScaleFactor: 2 });
    await page.goto(`http://127.0.0.1:${PORT}/#overview`, { waitUntil: "networkidle0" });
    await new Promise((r) => setTimeout(r, 400));
    await page.screenshot({ path: path.join(screenshotsDir, "tablet-768.png") });

    // 4. Mobile Viewport (390x1128)
    console.log("Capturing mobile-390.png...");
    await page.setViewport({ width: 390, height: 1128, deviceScaleFactor: 2 });
    await page.goto(`http://127.0.0.1:${PORT}/#overview`, { waitUntil: "networkidle0" });
    await new Promise((r) => setTimeout(r, 400));
    await page.screenshot({ path: path.join(screenshotsDir, "mobile-390.png") });

    // 5. Create Task Modal
    console.log("Capturing create-task-modal.png...");
    await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 2 });
    await page.goto(`http://127.0.0.1:${PORT}/?modal=create`, { waitUntil: "networkidle0" });
    await new Promise((r) => setTimeout(r, 400));
    await page.screenshot({ path: path.join(screenshotsDir, "create-task-modal.png") });

    // 6. Edit Task Modal
    console.log("Capturing edit-task-modal.png...");
    await page.goto(`http://127.0.0.1:${PORT}/?modal=edit`, { waitUntil: "networkidle0" });
    await new Promise((r) => setTimeout(r, 400));
    await page.screenshot({ path: path.join(screenshotsDir, "edit-task-modal.png") });

    // 7. Delete Confirm Modal
    console.log("Capturing delete-confirm-modal.png...");
    await page.goto(`http://127.0.0.1:${PORT}/?modal=delete`, { waitUntil: "networkidle0" });
    await new Promise((r) => setTimeout(r, 400));
    await page.screenshot({ path: path.join(screenshotsDir, "delete-confirm-modal.png") });

    // 8. Focus Notes Carousel
    console.log("Capturing focus-notes-carousel.png...");
    await page.goto(`http://127.0.0.1:${PORT}/#overview`, { waitUntil: "networkidle0" });
    const carouselEl = await page.$(".focus-carousel-container");
    if (carouselEl) {
      await carouselEl.screenshot({
        path: path.join(screenshotsDir, "focus-notes-carousel.png"),
      });
    }

    // 9. Test Interactive Navigation via sidebar clicks
    console.log("Testing click navigation from Overview to My tasks...");
    await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: "networkidle0" });
    const navButtons = await page.$$('.sidebar-nav-item');
    for (const btn of navButtons) {
      const text = await page.evaluate(el => el.textContent, btn);
      if (text.includes("My tasks")) {
        console.log("Clicking My tasks button in sidebar...");
        await btn.click();
        await new Promise((r) => setTimeout(r, 300));
        const hash = await page.evaluate(() => window.location.hash);
        console.log(`Current URL hash after click: ${hash}`);
      }
    }

    await browser.close();
    console.log("All screenshots and interactive tests completed successfully!");
  } catch (error) {
    console.error("Error during screenshot generation:", error);
  } finally {
    server.close(() => {
      console.log("Static server stopped.");
    });
  }
});
