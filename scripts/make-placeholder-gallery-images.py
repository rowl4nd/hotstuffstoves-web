#!/usr/bin/env python3
"""
Generates placeholder photos for the Installations and Showroom galleries.

Same reason and same rules as make-placeholder-images.py: this build
environment cannot reach hotstuffstoves.com or take real photographs, so
these are on-brand generated illustrations standing in for real job and
showroom photography. Every file is flagged in the corner and referenced
as `isPlaceholder: true` in src/lib/content/gallery.ts.

DO NOT ship these to production. See README.md.

Run with: uv run --with pillow python3 scripts/make-placeholder-gallery-images.py
"""
import os
import random

from PIL import Image, ImageDraw, ImageFont, ImageFilter

BASE_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "images")
INSTALLATIONS_DIR = os.path.join(BASE_DIR, "installations")
SHOWROOM_DIR = os.path.join(BASE_DIR, "showroom")
os.makedirs(INSTALLATIONS_DIR, exist_ok=True)
os.makedirs(SHOWROOM_DIR, exist_ok=True)

W, H = 1200, 900

CHARCOAL_INK = (23, 19, 15)
CHARCOAL_INK_2 = (31, 26, 20)
EMBER_RED = (196, 67, 43)
EMBER_RED_BRIGHT = (218, 86, 56)
FLAME_GOLD = (216, 155, 60)
ASH_CREAM = (237, 230, 218)
SMOKE_GREY = (67, 57, 47)
OAK_BROWN = (107, 74, 50)
BRICK = (58, 38, 30)


def find_font(bold=False):
    candidates = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    ]
    for c in candidates:
        if os.path.exists(c):
            return c
    return None


def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def make_bg(glow_cx_frac=0.5, glow_cy_frac=0.78, glow_r_frac=0.5, glow_strength=0.32):
    img = Image.new("RGB", (W, H), CHARCOAL_INK)
    draw = ImageDraw.Draw(img)
    for y in range(H):
        t = y / H
        draw.line([(0, y), (W, y)], fill=lerp(CHARCOAL_INK, CHARCOAL_INK_2, t))

    glow = Image.new("L", (W, H), 0)
    gdraw = ImageDraw.Draw(glow)
    cx, cy, r = int(W * glow_cx_frac), int(H * glow_cy_frac), int(W * glow_r_frac)
    gdraw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=90)
    glow = glow.filter(ImageFilter.GaussianBlur(120))
    ember_layer = Image.new("RGB", (W, H), EMBER_RED)
    img = Image.composite(ember_layer, img, glow.point(lambda p: int(p * glow_strength)))
    return img


def add_noise_grain(img, amount=4):
    px = img.load()
    for _ in range(int(W * H * 0.02)):
        x = random.randint(0, W - 1)
        y = random.randint(0, H - 1)
        r, g, b = px[x, y]
        d = random.randint(-amount, amount)
        px[x, y] = (max(0, min(255, r + d)), max(0, min(255, g + d)), max(0, min(255, b + d)))
    return img


def draw_stove(draw, cx, base_y, scale=1.0):
    """A small abstracted stove silhouette, feet planted at (cx, base_y)."""
    body_w, body_h = int(200 * scale), int(250 * scale)
    x0 = cx - body_w // 2
    y0 = base_y - body_h
    draw.rounded_rectangle([x0, y0, x0 + body_w, y0 + body_h], radius=int(10 * scale), fill=SMOKE_GREY)

    pad = int(20 * scale)
    door_top = y0 + int(35 * scale)
    door_bottom = y0 + body_h - int(50 * scale)
    draw.rounded_rectangle(
        [x0 + pad, door_top, x0 + body_w - pad, door_bottom],
        radius=int(8 * scale),
        outline=OAK_BROWN,
        width=max(2, int(4 * scale)),
    )
    gw, gh = (body_w - pad * 2) - int(20 * scale), (door_bottom - door_top) - int(20 * scale)
    gx, gy = x0 + pad + int(10 * scale), door_top + int(10 * scale)
    draw.rounded_rectangle([gx, gy, gx + gw, gy + gh], radius=int(4 * scale), fill=(30, 15, 10))

    fcx, fcy = gx + gw // 2, gy + gh - int(12 * scale)
    for color, rad in [(EMBER_RED, 24 * scale), (EMBER_RED_BRIGHT, 16 * scale), (FLAME_GOLD, 8 * scale)]:
        draw.ellipse([fcx - rad, fcy - rad * 1.4, fcx + rad, fcy + rad * 0.6], fill=color)

    leg_w = int(8 * scale)
    draw.rectangle([x0 + int(14 * scale), y0 + body_h, x0 + int(14 * scale) + leg_w, base_y], fill=SMOKE_GREY)
    draw.rectangle(
        [x0 + body_w - int(14 * scale) - leg_w, y0 + body_h, x0 + body_w - int(14 * scale), base_y],
        fill=SMOKE_GREY,
    )
    draw.rectangle(
        [cx - int(11 * scale), y0 - int(70 * scale), cx + int(11 * scale), y0 + int(2 * scale)],
        fill=SMOKE_GREY,
    )


def draw_floor(draw, floor_y):
    draw.rectangle([0, floor_y, W, H], fill=lerp(CHARCOAL_INK_2, (0, 0, 0), 0.25))
    draw.line([(0, floor_y), (W, floor_y)], fill=(0, 0, 0), width=3)


def draw_chimney_breast(draw, cx, floor_y, width=460, top=140):
    draw.rectangle([cx - width // 2, top, cx + width // 2, floor_y], fill=BRICK)
    # mantel shelf
    draw.rectangle([cx - width // 2 - 20, top - 26, cx + width // 2 + 20, top], fill=OAK_BROWN)


def label(draw, tag):
    small_font_path = find_font(bold=False)
    small_font = ImageFont.truetype(small_font_path, 26) if small_font_path else ImageFont.load_default()
    bbox = draw.textbbox((0, 0), tag, font=small_font)
    tw = bbox[2] - bbox[0]
    draw.rectangle([0, H - 56, W, H], fill=(0, 0, 0))
    draw.text(((W - tw) / 2, H - 56 + 14), tag, font=small_font, fill=FLAME_GOLD)


INSTALLATION_TAG = "PLACEHOLDER INSTALLATION PHOTO — replace before launch"
SHOWROOM_TAG = "PLACEHOLDER SHOWROOM PHOTO — replace before launch"


def make_installation(seed, cx_frac, scale):
    random.seed(seed)
    floor_y = int(H * 0.82)
    img = make_bg(glow_cx_frac=cx_frac, glow_cy_frac=0.8, glow_r_frac=0.42, glow_strength=0.38)
    draw = ImageDraw.Draw(img)
    cx = int(W * cx_frac)
    draw_chimney_breast(draw, cx, floor_y, width=int(480 * scale), top=int(H * 0.14))
    draw_floor(draw, floor_y)
    draw_stove(draw, cx, floor_y, scale=scale)
    img = add_noise_grain(img)
    draw = ImageDraw.Draw(img)
    label(draw, INSTALLATION_TAG)
    return img


def make_showroom(seed, count):
    random.seed(seed)
    floor_y = int(H * 0.8)
    img = make_bg(glow_cx_frac=0.5, glow_cy_frac=0.82, glow_r_frac=0.6, glow_strength=0.28)
    draw = ImageDraw.Draw(img)
    draw_floor(draw, floor_y)
    # shelf line suggesting a showroom wall
    draw.rectangle([0, int(H * 0.18), W, int(H * 0.18) + 10], fill=OAK_BROWN)
    spacing = W // (count + 1)
    for i in range(count):
        cx = spacing * (i + 1)
        draw_stove(draw, cx, floor_y, scale=0.72)
    img = add_noise_grain(img)
    draw = ImageDraw.Draw(img)
    label(draw, SHOWROOM_TAG)
    return img


def main():
    installation_specs = [
        (1, 0.42, 1.0),
        (2, 0.55, 0.9),
        (3, 0.48, 1.05),
        (4, 0.5, 0.85),
    ]
    for i, (seed, cx_frac, scale) in enumerate(installation_specs, start=1):
        img = make_installation(seed, cx_frac, scale)
        out_path = os.path.join(INSTALLATIONS_DIR, f"installation-{i}.jpg")
        img.save(out_path, quality=88)
        print("wrote", out_path)

    showroom_specs = [(11, 3), (12, 2), (13, 4)]
    for i, (seed, count) in enumerate(showroom_specs, start=1):
        img = make_showroom(seed, count)
        out_path = os.path.join(SHOWROOM_DIR, f"showroom-{i}.jpg")
        img.save(out_path, quality=88)
        print("wrote", out_path)


if __name__ == "__main__":
    main()
