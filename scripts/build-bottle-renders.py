"""
Builds the transparent bottle renders in public/bottles/ from the studio shots in public/.

What it does for each bottle:
  1. Estimates the studio background and traces the bottle silhouette.
  2. Pulls a true glass matte, so the bottle stays see-through on any page colour.
  3. Replaces the placeholder label with a Vaari label, shaded to sit on the bottle.

Requires: pip install numpy scipy pillow
Run from the project root: python scripts/build-bottle-renders.py
"""
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont
from scipy import ndimage as ndi

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
OUT = PUBLIC / "bottles"
FONTS = Path("C:/Windows/Fonts")

SS = 3  # label supersampling
MAX_HEIGHT = 1240
LOGO_HEIGHT = 765
LOGO_WORDMARK_TOP = 502

COPPER_DARK = (112, 58, 30)
COPPER = (184, 107, 61)
COPPER_LIGHT = (232, 176, 128)
INK = (11, 42, 58)
OCEAN = (31, 114, 153)
AQUA = (122, 215, 232)
DEEP = (15, 63, 110)

# y ranges and label boxes were read off the source photos.
BOTTLES = [
    dict(
        out="vaari-classic-200ml", src="Vaari bottle s 200ml final.png", style="classic", qty="200 ml",
        top=568, bottom=1645, cap=662, x_range=(300, 790),
        label=(980, 1510), label_half=176,
    ),
    dict(
        out="vaari-classic-500ml", src="Vaari bottle s 500ml final.png", style="classic", qty="500 ml",
        top=438, bottom=1728, cap=528, x_range=(300, 770),
        label=(824, 1586), label_half=134,
    ),
    dict(
        out="vaari-classic-1l", src="Vaari bottle s 1ltr 2 final.png", style="classic", qty="1 L",
        top=198, bottom=1862, cap=312, x_range=(280, 800),
        label=(852, 1246), label_half=240, wrap=True, edge=0.009, cap_edge=0.014,
    ),
    dict(
        out="vaari-premium-1l", src="Vaari bottle p 1ltr final.png", style="premium", qty="1 L",
        top=198, bottom=1798, cap=306, x_range=(280, 800),
        label=(718, 1586), label_half=154, edge=0.009, cap_edge=0.014,
    ),
    dict(
        out="vaari-custom-1l", src="Vaari bottle p 1ltr final.png", style="custom", qty="1 L",
        top=198, bottom=1798, cap=306, x_range=(280, 800),
        label=(718, 1586), label_half=154, edge=0.009, cap_edge=0.014,
    ),
]


def font(name, size):
    return ImageFont.truetype(str(FONTS / name), int(size))


def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def tracked(draw, center_x, y, text, fnt, fill, tracking):
    """Draws centred text with letter spacing."""
    widths = [draw.textlength(c, font=fnt) for c in text]
    total = sum(widths) + tracking * (len(text) - 1)
    x = center_x - total / 2
    for c, w in zip(text, widths):
        draw.text((x, y), c, font=fnt, fill=fill)
        x += w + tracking


def fit_tracked(draw, center_x, y, text, font_name, size, fill, tracking_em, max_width):
    """Tracked text that shrinks until it fits the label."""
    while size > 8:
        f = font(font_name, size)
        tr = size * tracking_em
        w = sum(draw.textlength(c, font=f) for c in text) + tr * (len(text) - 1)
        if w <= max_width:
            break
        size *= 0.95
    tracked(draw, center_x, y, text, f, fill, tr)
    return size


def load_logo():
    """The logo without its old tagline, which sat below LOGO_HEIGHT."""
    logo = Image.open(PUBLIC / "logo_vaari.png").convert("RGBA")
    logo = logo.crop((0, 0, logo.width, LOGO_HEIGHT))
    return logo


def tinted(logo, color):
    """Single-colour logo; the wave keeps its internal layers while the wordmark stays solid."""
    arr = np.asarray(logo, dtype=np.float32)
    lum = arr[:, :, :3].mean(axis=2) / 255.0
    shade = 0.56 + 0.44 * np.clip(lum * 1.35, 0, 1)
    split = LOGO_WORDMARK_TOP
    shade[split:] = 1.0
    rgb = np.stack([np.full(lum.shape, c) * shade for c in color], axis=2)
    return Image.fromarray(np.dstack([rgb, arr[:, :, 3]]).astype(np.uint8), "RGBA")


def vertical_gradient(w, h, stops):
    arr = np.zeros((h, w, 3), dtype=np.float32)
    ys = np.linspace(0, 1, h)
    pos = [s[0] for s in stops]
    for c in range(3):
        arr[:, :, c] = np.interp(ys, pos, [s[1][c] for s in stops])[:, None]
    return arr


def wave_band(w, h, top_frac, color_top, color_bottom, amp, freq, phase):
    """A filled sine-wave shape from top_frac down to the label bottom."""
    xs = np.arange(w)
    edge = top_frac * h + amp * np.sin(xs / w * np.pi * 2 * freq + phase)
    yy = np.arange(h)[:, None]
    mask = np.clip((yy - edge[None, :]) / 1.5, 0, 1)
    grad = vertical_gradient(w, h, [(0, color_top), (1, color_bottom)])
    rgba = np.dstack([grad, mask * 255]).astype(np.uint8)
    return Image.fromarray(rgba, "RGBA")


def build_label(style, qty, w, h):
    W, H = w * SS, h * SS
    tall = H > W * 1.2
    logo = load_logo()
    cx = W / 2

    if style == "premium":
        # Brushed copper with a soft sheen across the middle.
        base = vertical_gradient(W, H, [(0, COPPER_DARK), (0.3, COPPER), (0.52, COPPER_LIGHT), (0.74, COPPER), (1, COPPER_DARK)])
        rng = np.random.default_rng(7)
        brush = ndi.gaussian_filter1d(rng.normal(0, 1, (H, W)), 40, axis=1) * 26
        base = np.clip(base + brush[:, :, None], 0, 255)
        img = Image.fromarray(base.astype(np.uint8), "RGB").convert("RGBA")
    else:
        img = Image.new("RGBA", (W, H), (255, 255, 255, 255))

    d = ImageDraw.Draw(img)
    margin = W * 0.09

    if style == "premium":
        cream = (252, 240, 226)
        inset = W * 0.045
        d.rounded_rectangle((inset, inset, W - inset, H - inset), radius=W * 0.03, outline=cream + (210,), width=max(2, int(W * 0.006)))

        lw = W * 0.66
        lg = tinted(logo, cream).resize((int(lw), int(lw * logo.height / logo.width)), Image.LANCZOS)
        ly = int(H * 0.09)
        img.alpha_composite(lg, (int(cx - lg.width / 2), ly))
        d = ImageDraw.Draw(img)

        y = ly + lg.height + H * 0.055
        d.line((cx - W * 0.14, y, cx + W * 0.14, y), fill=cream + (180,), width=max(2, int(W * 0.005)))
        y += H * 0.03
        fit_tracked(d, cx, y, "PREMIUM", "georgia.ttf", W * 0.108, cream + (255,), 0.2, W - margin * 2.4)
        y += W * 0.15
        fit_tracked(d, cx, y, "PACKAGED DRINKING WATER", "seguisb.ttf", W * 0.05, cream + (235,), 0.12, W - margin * 2.4)
        y += W * 0.125
        fit_tracked(d, cx, y, "RO PURIFIED", "segoeui.ttf", W * 0.045, cream + (215,), 0.14, W - margin * 2.4)

        q = font("georgia.ttf", W * 0.15)
        qw = d.textlength(qty, font=q)
        d.text((cx - qw / 2, H - inset - W * 0.3), qty, font=q, fill=cream + (255,))
        fit_tracked(d, cx, H - inset - W * 0.105, "NET QUANTITY", "segoeui.ttf", W * 0.036, cream + (205,), 0.2, W - margin * 3)

    elif style == "custom":
        # Blank panel for the live "your brand here" preview on the white-label section.
        lw = W * 0.52
        lg = logo.resize((int(lw), int(lw * logo.height / logo.width)), Image.LANCZOS)
        img.alpha_composite(lg, (int(cx - lg.width / 2), int(H * 0.055)))
        band = wave_band(W, H, 0.84, AQUA, DEEP, H * 0.012, 1.3, 0.6)
        img.alpha_composite(band)

    else:
        # Logo and copy flow from the top, then ocean waves fill the space down to the quantity.
        if tall:
            q_size = min(W * 0.17, H * 0.078)
            net_size = q_size * 0.25
            band_top = H - q_size * 1.3 - net_size * 3.6

            logo_h = min(W * 0.72 * logo.height / logo.width, H * 0.44)
            lg = logo.resize((int(logo_h * logo.width / logo.height), int(logo_h)), Image.LANCZOS)
            ly = int(H * 0.04)
            img.alpha_composite(lg, (int(cx - lg.width / 2), ly))
            d = ImageDraw.Draw(img)
            y = ly + lg.height + H * 0.022
            size = min(W * 0.052, H * 0.024)
            fit_tracked(d, cx, y, "PACKAGED DRINKING WATER", "seguisb.ttf", size, INK + (255,), 0.1, W - margin * 2)
            y += size * 1.9
            fit_tracked(d, cx, y, "RO PURIFIED", "segoeui.ttf", size * 0.88, OCEAN + (255,), 0.12, W - margin * 2)
            y += size * 4.2

            step = (band_top - y) / 3
            layers = [(y, AQUA, OCEAN, 0.2, 1.2, 0.4), (y + step, (64, 170, 205), OCEAN, 0.17, 1.5, 2.2), (band_top - step * 0.1, OCEAN, DEEP, 0.15, 1.1, 4.1)]
            for top, c1, c2, amp, freq, ph in layers:
                img.alpha_composite(wave_band(W, H, top / H, c1, c2, step * amp, freq, ph))
            d = ImageDraw.Draw(img)
            q = font("georgia.ttf", q_size)
            qw = d.textlength(qty, font=q)
            d.text((cx - qw / 2, band_top + q_size * 0.1), qty, font=q, fill=(255, 255, 255, 255))
            fit_tracked(d, cx, H - net_size * 2.5, "NET QUANTITY", "seguisb.ttf", net_size, (235, 248, 252, 255), 0.2, W - margin * 3)
        else:
            for top, c1, c2, amp, freq, ph in [(0.60, AQUA, OCEAN, 0.024, 1.6, 0.4), (0.67, (64, 170, 205), OCEAN, 0.02, 2.0, 2.2), (0.74, OCEAN, DEEP, 0.018, 1.4, 4.1)]:
                img.alpha_composite(wave_band(W, H, top, c1, c2, H * amp, freq, ph))
            lh = H * 0.46
            lg = logo.resize((int(lh * logo.width / logo.height), int(lh)), Image.LANCZOS)
            img.alpha_composite(lg, (int(cx - lg.width / 2), int(H * 0.035)))
            d = ImageDraw.Draw(img)
            fit_tracked(d, cx, H * 0.525, "PACKAGED DRINKING WATER", "seguisb.ttf", H * 0.036, INK + (255,), 0.1, W * 0.5)
            q = font("georgia.ttf", H * 0.115)
            qw = d.textlength(qty, font=q)
            d.text((cx - qw / 2, H * 0.745), qty, font=q, fill=(255, 255, 255, 255))
            fit_tracked(d, cx, H * 0.89, "RO PURIFIED  ·  NET QUANTITY", "seguisb.ttf", H * 0.028, (235, 248, 252, 255), 0.14, W * 0.6)

    return img.resize((w, h), Image.LANCZOS)


def estimate_background(rgb, x_range):
    """Per-row studio background, interpolated between the empty strips either side of the bottle."""
    h, w, _ = rgb.shape
    left = rgb[:, 40:220].mean(axis=1)
    right = rgb[:, w - 220 : w - 40].mean(axis=1)
    left = ndi.gaussian_filter1d(left, 3, axis=0)
    right = ndi.gaussian_filter1d(right, 3, axis=0)
    t = (np.arange(w) - 130) / (w - 260)
    t = np.clip(t, 0, 1)[None, :, None]
    return left[:, None, :] * (1 - t) + right[:, None, :] * t


def trace_silhouette(rgb, bg, cfg):
    """Finds the bottle's edges from strong horizontal gradients, which ignore the soft studio vignette."""
    h, w, _ = rgb.shape
    top, bottom = cfg["top"], cfg["bottom"]
    x0, x1 = cfg["x_range"]
    grey = rgb.mean(axis=2)
    edge = np.abs(ndi.gaussian_filter(grey, sigma=(1.5, 1.2), order=(0, 1)))
    threshold = cfg.get("edge", 0.0035)

    lefts = np.full(h, np.nan)
    rights = np.full(h, np.nan)
    for y in range(top, bottom):
        # The cap is high contrast, so a stricter threshold there ignores faint background banding.
        row_threshold = cfg.get("cap_edge", threshold) if y < cfg["cap"] else threshold
        hits = np.where(edge[y, x0:x1] > row_threshold)[0]
        if len(hits) > 1:
            lefts[y] = x0 + hits[0]
            rights[y] = x0 + hits[-1]

    # The axis comes from the upper body, which never has a floor shadow.
    body = np.arange(top, top + int((bottom - top) * 0.55))
    good = body[~np.isnan(lefts[body]) & ~np.isnan(rights[body])]
    axis = float(np.median((lefts[good] + rights[good]) / 2))

    # The narrower side wins on each row, which rejects cast shadows and stray marks on either side.
    half = np.fmin(axis - lefts, rights - axis)
    idx = np.arange(h)
    span = (idx >= top) & (idx < bottom)
    if cfg.get("wrap"):
        # The old wrap label flares past the bottle, so bridge its rows from the glass either side.
        y0, y1 = cfg["label"]
        half[y0 - 14 : y1 + 14] = np.nan
    valid = span & ~np.isnan(half)
    half[span] = np.interp(idx[span], idx[valid], half[valid])
    half[~span] = 0
    # Below the neck: a wide median drops spikes and notches alike. The cap and neck ring stay crisp.
    smooth_from = cfg["cap"] + 70
    profile = half[span]
    start = smooth_from - top
    body_profile = ndi.median_filter(profile, size=31, mode="nearest")
    body_profile = ndi.gaussian_filter1d(body_profile, 3.5, mode="nearest")
    head_profile = ndi.gaussian_filter1d(ndi.median_filter(profile, size=7, mode="nearest"), 1.2, mode="nearest")
    blend = np.clip((np.arange(len(profile)) - start) / 20.0, 0, 1)
    half[span] = head_profile * (1 - blend) + body_profile * blend

    xs = np.arange(w)[None, :]
    dist = half[:, None] - np.abs(xs - axis)
    mask = np.clip(dist / 1.6 + 0.5, 0, 1)
    ys = np.arange(h)[:, None]
    mask *= np.clip((ys - top) / 2.0, 0, 1) * np.clip((bottom - ys) / 5.0, 0, 1)
    return mask, axis


def glass_matte(rgb, bg):
    """Smallest alpha that reproduces each pixel over the background, so glass stays see-through."""
    eps = 1e-3
    lighter = (rgb - bg) / np.maximum(1 - bg, eps)
    darker = (bg - rgb) / np.maximum(bg, eps)
    alpha = np.clip(np.maximum(lighter, darker).max(axis=2), 0, 1)
    return alpha


def process(cfg):
    src = Image.open(PUBLIC / cfg["src"]).convert("RGB")
    rgb = np.asarray(src, dtype=np.float32) / 255.0
    h, w, _ = rgb.shape

    bg = estimate_background(rgb, cfg["x_range"])
    mask, axis = trace_silhouette(rgb, bg, cfg)

    alpha = glass_matte(rgb, bg)
    # The bright water would matte to nothing, so a light body tone keeps the bottle visible on any colour.
    alpha = np.clip(alpha * 1.25, 0, 1)
    body_floor = 0.17
    a = np.maximum(alpha, body_floor)

    safe = np.maximum(a[:, :, None], 1e-3)
    fg = np.clip((rgb - (1 - safe) * bg) / safe, 0, 1)
    # Where only the body tone applies, use a cool white instead of the recovered colour.
    tint = np.array([0.86, 0.95, 0.98], dtype=np.float32)
    weight = np.clip((alpha - body_floor * 0.4) / (body_floor * 0.6), 0, 1)[:, :, None]
    fg = fg * weight + tint * (1 - weight)

    # The cap is solid plastic rather than glass.
    cap_y = cfg["cap"]
    ramp = np.clip((cap_y + 6 - np.arange(h)) / 12.0, 0, 1)[:, None]
    a = a * (1 - ramp) + ramp
    fg = fg * (1 - ramp[:, :, None]) + rgb * ramp[:, :, None]

    # New label.
    y0, y1 = cfg["label"]
    half = cfg["label_half"]
    if cfg.get("wrap"):
        half = 260  # clipped to the silhouette below
    x0, x1 = int(round(axis - half)), int(round(axis + half))
    lw, lh = x1 - x0, y1 - y0
    label = np.asarray(build_label(cfg["style"], cfg["qty"], lw, lh).convert("RGBA"), dtype=np.float32) / 255.0

    # Cylinder lighting: falloff at the sides, a soft streak of window light left of centre.
    t = np.linspace(-1, 1, lw)
    falloff = 0.74 + 0.26 * np.sqrt(np.clip(1 - np.abs(t) ** 2.6, 0, 1))
    streak = 0.10 * np.exp(-(((t + 0.52) / 0.15) ** 2)) + 0.04 * np.exp(-(((t - 0.68) / 0.08) ** 2))
    lit = label[:, :, :3] * falloff[None, :, None] + streak[None, :, None]
    lit = np.clip(lit, 0, 1)

    label_mask = np.zeros((h, w), dtype=np.float32)
    label_mask[y0:y1, x0:x1] = 1
    label_mask = ndi.gaussian_filter(label_mask, 0.7)

    fg_full = np.zeros_like(rgb)
    fg_full[y0:y1, x0:x1] = lit
    fg = fg * (1 - label_mask[:, :, None]) + fg_full * label_mask[:, :, None]
    a = a * (1 - label_mask) + label_mask

    final_alpha = a * mask
    out = np.dstack([fg, final_alpha])
    out = (np.clip(out, 0, 1) * 255).astype(np.uint8)
    img = Image.fromarray(out, "RGBA")

    bbox = img.getchannel("A").point(lambda v: 255 if v > 8 else 0).getbbox()
    pad = 6
    bbox = (max(bbox[0] - pad, 0), max(bbox[1] - pad, 0), min(bbox[2] + pad, w), min(bbox[3] + pad, h))
    img = img.crop(bbox)
    OUT.mkdir(exist_ok=True)
    crop_w, crop_h = img.size
    scale = min(1.0, MAX_HEIGHT / crop_h)
    img = img.resize((round(crop_w * scale), round(crop_h * scale)), Image.LANCZOS)
    path = OUT / f"{cfg['out']}.webp"
    img.save(path, "WEBP", quality=86, alpha_quality=92, method=6)

    ix0, iy0 = x0 - bbox[0], y0 - bbox[1]
    print(
        f"{cfg['out']}: {img.size[0]}x{img.size[1]} {path.stat().st_size // 1024} KB, axis={axis:.1f}, "
        f"label % left={ix0 / crop_w * 100:.1f} top={iy0 / crop_h * 100:.1f} "
        f"w={lw / crop_w * 100:.1f} h={lh / crop_h * 100:.1f}"
    )
    return img


if __name__ == "__main__":
    imgs = {c["out"]: process(c) for c in BOTTLES}
    load_logo().save(PUBLIC / "brand" / "vaari-logo-stacked.webp", "WEBP", quality=92, alpha_quality=95, method=6)

    # Contact sheet on dark and light, for checking edges.
    import sys

    if len(sys.argv) > 1:
        sheet_h = 900
        tiles = list(imgs.values())
        sheet = Image.new("RGB", (340 * len(tiles), sheet_h * 2), (9, 44, 66))
        ImageDraw.Draw(sheet).rectangle((0, sheet_h, sheet.width, sheet_h * 2), fill=(236, 246, 249))
        for row in range(2):
            for i, t in enumerate(tiles):
                s = (sheet_h - 40) / t.height
                r = t.resize((int(t.width * s), sheet_h - 40), Image.LANCZOS)
                sheet.paste(r, (170 + 340 * i - r.width // 2, 20 + row * sheet_h), r)
        sheet.save(sys.argv[1])
