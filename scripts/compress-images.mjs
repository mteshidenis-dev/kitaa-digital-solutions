import sharp from "sharp";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const base = path.join(__dirname, "../public/project-previews");

const targets = [
  "become-beyond.jpg",
  "elem-adventures.jpg",
  "masatu-tours.avif",
  "bcb-suites.jpg",
  "injili-ya-sayansi.jpg",
  "divine-wonders-adventures.jpg",
  "tulia-essence-tours.jpg",
];

for (const fname of targets) {
  const src = path.join(base, fname);
  if (!fs.existsSync(src)) { console.log(`SKIP: ${fname}`); continue; }

  const outName = fname.replace(/\.(jpg|jpeg|avif|png)$/i, ".webp");
  const outPath = path.join(base, outName);
  const oldKb = Math.round(fs.statSync(src).size / 1024);

  await sharp(src)
    .resize({ width: 800, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(outPath);

  const newKb = Math.round(fs.statSync(outPath).size / 1024);
  console.log(`${fname}: ${oldKb}KB  →  ${outName}: ${newKb}KB`);
}
