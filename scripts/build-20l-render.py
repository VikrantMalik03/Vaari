"""
Builds public/bottles/vaari-20l.webp from the 20 litre photo in public/.

Removes the black background and shifts the plastic slightly towards the ocean
blue of the Vaari logo, leaving the label's colours untouched.

Requires: pip install numpy scipy pillow
Run from the project root: python scripts/build-20l-render.py [preview.png]
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage as ndi

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "public" / "Vaari-20-litre.jpeg"
OUTPUT = ROOT / "public" / "bottles" / "vaari-20l.webp"

MAX_HEIGHT = 1240
LABEL = (252, 922, 773, 1268)  # left, top, right, bottom in the source photo
CAP_BOTTOM = 188
BODY_ALPHA = 0.88  # how solid the darker plastic is on the page
HUE_SHIFT = -10 / 360  # towards the logo's ocean blue
SATURATION = 0.86


def silhouette(rgb):
    """The largest bright shape, with holes filled, so dark areas inside the bottle stay part of it."""
    bright = rgb.max(axis=2) > 0.09
    bright = ndi.binary_closing(bright, iterations=4)
    labels, count = ndi.label(bright)
    sizes = ndi.sum(bright, labels, range(1, count + 1))
    shape = labels == (int(np.argmax(sizes)) + 1)
    shape = ndi.binary_fill_holes(shape)
    shape = ndi.binary_erosion(shape, iterations=2)  # drops the dark fringe left by the black background
    return np.clip(ndi.gaussian_filter(shape.astype(np.float32), 1.1), 0, 1)


def grade(rgb):
    """Rotates hue and trims saturation on the blue plastic only."""
    r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    mx, mn = rgb.max(axis=2), rgb.min(axis=2)
    delta = np.maximum(mx - mn, 1e-5)
    hue = np.where(mx == b, 4 + (r - g) / delta, np.where(mx == g, 2 + (b - r) / delta, ((g - b) / delta) % 6)) / 6
    sat = np.where(mx > 0, delta / np.maximum(mx, 1e-5), 0)
    hue = (hue + HUE_SHIFT) % 1
    sat = sat * SATURATION

    i = np.floor(hue * 6)
    f = hue * 6 - i
    p, q, t = mx * (1 - sat), mx * (1 - sat * f), mx * (1 - sat * (1 - f))
    i = i.astype(int) % 6
    red = np.choose(i, [mx, q, p, p, t, mx])
    green = np.choose(i, [t, mx, mx, q, p, p])
    blue = np.choose(i, [p, p, t, mx, mx, q])
    return np.dstack([red, green, blue])


def main():
    rgb = np.asarray(Image.open(SOURCE).convert("RGB"), dtype=np.float32) / 255.0
    h, w, _ = rgb.shape
    mask = silhouette(rgb)

    # Colour and solidity apply to the plastic. The label stays exactly as printed.
    label_mask = np.zeros((h, w), dtype=np.float32)
    l, t, r, b = LABEL
    label_mask[t:b, l:r] = 1
    label_mask = ndi.gaussian_filter(label_mask, 1.0)[..., None]
    colour = grade(rgb) * (1 - label_mask) + rgb * label_mask

    # Dark plastic turns slightly see-through, so the bottle picks up the page colour behind it.
    brightness = rgb.max(axis=2)
    alpha = np.clip(BODY_ALPHA + (brightness / 0.5) * (1 - BODY_ALPHA), 0, 1)
    solid = np.maximum(label_mask[..., 0], (np.arange(h)[:, None] < CAP_BOTTOM).astype(np.float32))
    alpha = np.maximum(alpha, solid) * mask

    out = (np.clip(np.dstack([colour, alpha]), 0, 1) * 255).astype(np.uint8)
    img = Image.fromarray(out, "RGBA")
    img = img.crop(img.getchannel("A").point(lambda v: 255 if v > 8 else 0).getbbox())
    scale = min(1.0, MAX_HEIGHT / img.height)
    img = img.resize((round(img.width * scale), round(img.height * scale)), Image.LANCZOS)
    img.save(OUTPUT, "WEBP", quality=88, alpha_quality=95, method=6)
    print(f"{OUTPUT.name}: {img.width}x{img.height}, {OUTPUT.stat().st_size // 1024} KB")

    if len(sys.argv) > 1:
        tile_w = img.width + 80
        sheet = Image.new("RGB", (tile_w * 3, img.height + 80), (10, 51, 80))
        sheet.paste((247, 251, 252), (tile_w, 0, tile_w * 2, sheet.height))
        sheet.paste((184, 223, 234), (tile_w * 2, 0, tile_w * 3, sheet.height))
        for i in range(3):
            sheet.paste(img, (tile_w * i + 40, 40), img)
        sheet.thumbnail((1500, 800))
        sheet.save(sys.argv[1])


if __name__ == "__main__":
    main()
