// This is a simple script to create placeholder screenshots
// Run with: node public/screenshots/create-screenshots.js

const fs = require("fs");
const path = require("path");
const { createCanvas } = require("canvas");

// Define screenshot dimensions
const screenshots = [
  { name: "desktop-home.png", width: 1280, height: 800 },
  { name: "desktop-post.png", width: 1280, height: 800 },
  { name: "mobile-home.png", width: 390, height: 844 },
  { name: "mobile-post.png", width: 390, height: 844 },
];

// Create the screenshots directory if it doesn't exist
const screenshotsDir = path.join(__dirname);
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

// Create each screenshot
screenshots.forEach(({ name, width, height }) => {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // Fill background
  ctx.fillStyle = "#f5f5f5";
  ctx.fillRect(0, 0, width, height);

  // Draw border
  ctx.strokeStyle = "#e0e0e0";
  ctx.lineWidth = 4;
  ctx.strokeRect(2, 2, width - 4, height - 4);

  // Add text
  ctx.fillStyle = "#333333";
  ctx.font = "bold 32px Arial";
  ctx.textAlign = "center";
  ctx.fillText(`${name}`, width / 2, height / 2 - 20);
  ctx.font = "24px Arial";
  ctx.fillText(`${width} × ${height}`, width / 2, height / 2 + 20);

  // Save the image
  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync(path.join(screenshotsDir, name), buffer);

  console.log(`Created ${name}`);
});

console.log("All screenshots created successfully!");
