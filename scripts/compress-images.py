from PIL import Image
import os

base = os.path.dirname(os.path.abspath(__file__)) + "/../public/project-previews"

targets = [
    ("become-beyond.jpg",             800, 82),
    ("elem-adventures.jpg",           800, 82),
    ("masatu-tours.avif",             800, 82),
    ("bcb-suites.jpg",                800, 82),
    ("injili-ya-sayansi.jpg",         800, 82),
    ("divine-wonders-adventures.jpg", 800, 82),
    ("tulia-essence-tours.jpg",       800, 82),
]

for fname, max_w, quality in targets:
    src = os.path.join(base, fname)
    if not os.path.exists(src):
        print(f"SKIP (not found): {fname}")
        continue
    img = Image.open(src).convert("RGB")
    w, h = img.size
    if w > max_w:
        img = img.resize((max_w, int(h * max_w / w)), Image.LANCZOS)
    out_name = fname.rsplit(".", 1)[0] + ".webp"
    out_path = os.path.join(base, out_name)
    img.save(out_path, "WEBP", quality=quality, method=6)
    old_kb = os.path.getsize(src) // 1024
    new_kb = os.path.getsize(out_path) // 1024
    print(f"{fname}: {old_kb}KB  →  {out_name}: {new_kb}KB")
