#!/usr/bin/env python3
"""
Generates placeholder product images for the Esse stove range.

These exist ONLY because this build environment cannot reach
hotstuffstoves.com to pull the real product photography (outbound network
here is limited to an allowlist of package registries). They are saved
under the EXACT filenames used on the current live site's
/assets/cards/ directory, so a real photo can be dropped straight into
public/images/stoves/<filename> later with zero code changes.

DO NOT ship these to production. See README.md.
"""
import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import random

OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "images", "stoves")
os.makedirs(OUT_DIR, exist_ok=True)

W, H = 1200, 900

CHARCOAL_INK = (23, 19, 15)
CHARCOAL_INK_2 = (31, 26, 20)
EMBER_RED = (196, 67, 43)
EMBER_RED_BRIGHT = (218, 86, 56)
FLAME_GOLD = (216, 155, 60)
ASH_CREAM = (237, 230, 218)
SMOKE_GREY = (67, 57, 47)
OAK_BROWN = (107, 74, 50)

PRODUCTS = [
    {"filename": "esseonesemultifuel-one.jpg", "name": "Esse One SE\nMulti Fuel"},
    {"filename": "esse500vistase-one.jpg", "name": "Esse 500\nVista SE"},
    {"filename": "esse525se-one.jpg", "name": "Esse 525 SE"},
    {"filename": "esse700-one.jpg", "name": "Esse 700\nVista SE"},
]

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

def make_bg():
    img = Image.new("RGB", (W, H), CHARCOAL_INK)
    draw = ImageDraw.Draw(img)
    # vertical gradient charcoal -> charcoal-2
    for y in range(H):
        t = y / H
        color = lerp(CHARCOAL_INK, CHARCOAL_INK_2, t)
        draw.line([(0, y), (W, y)], fill=color)
    # soft radial ember glow bottom-left
    glow = Image.new("L", (W, H), 0)
    gdraw = ImageDraw.Draw(glow)
    cx, cy, r = int(W * 0.28), int(H * 0.85), int(W * 0.55)
    gdraw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=90)
    glow = glow.filter(ImageFilter.GaussianBlur(120))
    ember_layer = Image.new("RGB", (W, H), EMBER_RED)
    img = Image.composite(ember_layer, img, glow.point(lambda p: int(p * 0.35)))
    # hairline border
    draw = ImageDraw.Draw(img)
    draw.rectangle([0, 0, W - 1, H - 1], outline=(*ASH_CREAM, ), width=0)
    return img

def add_noise_grain(img, amount=6):
    px = img.load()
    for _ in range(int(W * H * 0.02)):
        x = random.randint(0, W - 1)
        y = random.randint(0, H - 1)
        r, g, b = px[x, y]
        d = random.randint(-amount, amount)
        px[x, y] = (max(0, min(255, r + d)), max(0, min(255, g + d)), max(0, min(255, b + d)))
    return img

def draw_stove_silhouette(draw):
    # simple abstracted stove silhouette so the placeholder reads as a
    # product shot rather than a blank gradient
    body_w, body_h = 340, 420
    x0 = (W - body_w) // 2
    y0 = int(H * 0.62) - body_h
    # body
    draw.rounded_rectangle([x0, y0, x0 + body_w, y0 + body_h], radius=18, fill=SMOKE_GREY)
    # door
    door_pad = 34
    draw.rounded_rectangle(
        [x0 + door_pad, y0 + 60, x0 + body_w - door_pad, y0 + body_h - 90],
        radius=14,
        outline=OAK_BROWN,
        width=6,
    )
    # glass glow
    gw, gh = body_w - door_pad * 2 - 40, body_h - 60 - 90 - 40
    gx, gy = x0 + door_pad + 20, y0 + 60 + 20
    draw.rounded_rectangle([gx, gy, gx + gw, gy + gh], radius=8, fill=(30, 15, 10))
    # flame flicker suggestion
    flame_cx = gx + gw // 2
    flame_cy = gy + gh - 30
    for i, (color, rad) in enumerate([(EMBER_RED, 46), (EMBER_RED_BRIGHT, 32), (FLAME_GOLD, 18)]):
        draw.ellipse(
            [flame_cx - rad, flame_cy - rad * 1.4, flame_cx + rad, flame_cy + rad * 0.6],
            fill=color,
        )
    # legs
    leg_w = 16
    draw.rectangle([x0 + 30, y0 + body_h, x0 + 30 + leg_w, y0 + body_h + 40], fill=SMOKE_GREY)
    draw.rectangle([x0 + body_w - 30 - leg_w, y0 + body_h, x0 + body_w - 30, y0 + body_h + 40], fill=SMOKE_GREY)
    # flue pipe
    draw.rectangle([x0 + body_w // 2 - 22, y0 - 140, x0 + body_w // 2 + 22, y0 + 4], fill=SMOKE_GREY)

def make_placeholder(name):
    img = make_bg()
    draw = ImageDraw.Draw(img)
    draw_stove_silhouette(draw)
    img = add_noise_grain(img, amount=4)
    draw = ImageDraw.Draw(img)

    label_font_path = find_font(bold=True)
    small_font_path = find_font(bold=False)
    label_font = ImageFont.truetype(label_font_path, 54) if label_font_path else ImageFont.load_default()
    small_font = ImageFont.truetype(small_font_path, 26) if small_font_path else ImageFont.load_default()

    lines = name.split("\n")
    y = 60
    for line in lines:
        bbox = draw.textbbox((0, 0), line, font=label_font)
        tw = bbox[2] - bbox[0]
        draw.text(((W - tw) / 2, y), line, font=label_font, fill=ASH_CREAM)
        y += (bbox[3] - bbox[1]) + 14

    tag = "PLACEHOLDER PRODUCT IMAGE — replace before launch"
    bbox = draw.textbbox((0, 0), tag, font=small_font)
    tw = bbox[2] - bbox[0]
    draw.rectangle([0, H - 56, W, H], fill=(0, 0, 0))
    draw.text(((W - tw) / 2, H - 56 + 14), tag, font=small_font, fill=FLAME_GOLD)

    return img

def main():
    for p in PRODUCTS:
        img = make_placeholder(p["name"])
        out_path = os.path.join(OUT_DIR, p["filename"])
        img.save(out_path, quality=88)
        print("wrote", out_path)

if __name__ == "__main__":
    main()
