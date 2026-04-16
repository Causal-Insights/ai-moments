# MagicLens — Master Brand Standards

**Date:** 2026-04-15
**Scope:** Master brand identity for MagicLens and all sub-products (Santa Visit, Tooth Fairy, Easter Bunny, Toys Alive, future products)
**Web demo:** `web_palette_demo.html` (validated reference implementation)

---

## 1. Color Palette

### 1.1 Logo Palette (3 colors only)

The logo family uses exactly three colors. No outlines, no fills — flowing line work with gradient transitions between these colors along the strokes.

| Role | Name | Hex | Usage in Logos |
|---|---|---|---|
| Primary | Soft Periwinkle | #8B8FBE | Dominant stroke colour across all sub-brand marks. The brand's signature. |
| Secondary | Lavender Mist | #C4B8D4 | Secondary stroke colour. Blends with periwinkle along gradients. Adds warmth and softness. |
| Accent | Warm Gold | #D9B455 | Restricted accent. Appears only in specific details per sub-brand (see Section 3). Never dominant. |

**Logo colour rules:**
- Strokes gradient between Periwinkle and Lavender freely
- Gold appears only where specified per sub-brand — never as a primary stroke colour
- No black, no dark blue, no ivory IN the logo marks themselves
- Logo marks work on both light and dark backgrounds

### 1.2 Brand Palette (Extended — for UI, web, print)

These additional colours support the logo palette in applications like the website, marketing materials, and packaging.

| Role | Name | Hex | Usage |
|---|---|---|---|
| Dark Background | Night Blue | #3D4A5C | Website dark sections, dark-mode backgrounds, footer. Never pure black. |
| Deepest Dark | Night Deep | #2C3646 | Hero sections, immersive backgrounds |
| Light Background | Ivory Glow | #F5F0E3 | Website light sections, card backgrounds, light-mode base. Never pure white. |
| Body Text (on light) | Night Blue | #3D4A5C | Primary body text colour on light backgrounds |
| Body Text (on dark) | Ivory Glow | #F5F0E3 | Primary text colour on dark backgrounds |
| Muted Text | Slate | #7A8494 | Secondary text, captions, metadata |
| Gold Highlight | Gold Light | #E8D48A | Hover states, interactive highlights, button hover |
| CTA / Interactive | Warm Gold | #D9B455 | Buttons, links, interactive accents |

### 1.3 Background Rules

| Context | Colour | Notes |
|---|---|---|
| Light mode base | Ivory Glow #F5F0E3 | Never pure white #FFFFFF for branded surfaces |
| Dark mode base | Night Blue #3D4A5C or Night Deep #2C3646 | Never pure black #000000 for branded surfaces |
| Logo presentation (light) | Ivory Glow #F5F0E3 or white #FFFFFF | White acceptable for logo on non-branded contexts (app stores, third-party) |
| Logo presentation (dark) | Black #000000 or Night Deep #2C3646 | Black acceptable for high-contrast logo contexts |

---

## 2. Typography

### 2.1 Wordmark / Logo Lockup

The "MagicLens" wordmark typeface balances whimsy and premium quality — storybook, not toy store. It has visible personality without being childish and pairs naturally with the flowing, organic line-art logo marks.

**Selected font:** **Silver Northern** (Adobe Fonts) — Elegant display face with vintage warmth. Locked for pilot and product launch.

**Risk note:** Silver Northern has visual similarity to Disney-style lettering. If this proves problematic for brand differentiation, the following backup candidates were tested and are viable alternatives:

| # | Font | Source | Notes |
|---|---|---|---|
| 1 | Philosopher | Google Fonts | Humanist serif, distinctive without excess |
| 2 | Oaks Medium | Adobe Fonts | Clean, confident, modern |
| 3 | Coffee Service | Adobe Fonts | Hand-crafted feel |
| 4 | Eds Market Regular | Adobe Fonts | Artisan lettering, approachable |
| 5 | Rumba Large | Adobe Fonts | Expressive serif, calligraphic energy |
| 6 | Bodega Sans Light | Adobe Fonts | Geometric sans, art-deco character |
| 7 | FF Market | Adobe Fonts | Strong visual identity |
| 8 | Playfair Display | Google Fonts | High-contrast editorial serif |

**Lockup sizing (Golden Ratio):** Icon visual height = 1.618x wordmark cap-height. Horizontal spacing between mark and wordmark = 0.5-1x cap-height.

### 2.2 Body / UI Typography

| Role | Font | Weight | Notes |
|---|---|---|---|
| Headlines | Silver Northern | — | Same as wordmark for brand consistency |
| Body | Nunito | 300–700 | Clean, rounded, friendly at any size. Validated. |
| UI / Captions | Nunito | 300–400 | Lighter weights for secondary text |

### 2.3 Typography Rules

- **Wordmark** is always set in the approved display font — never in body font
- **"Magic"** and **"Lens"** are styled as one word "MagicLens" with a colour split: "Magic" in Soft Periwinkle, "Lens" in Warm Gold (per final namemark render)
- Headlines use sentence case, not ALL CAPS (warmth over authority)
- Minimum body font size: 16px web, 10pt print

---

## 3. Sub-Brand Products

### 3.1 Product Names

| Product | Consumer Name | Mark |
|---|---|---|
| MagicLens (master) | MagicLens | Double-circle lens |
| Santa Visit | Santa Visit | Santa hat |
| Tooth Fairy | Tooth Fairy | Butterfly wing |
| Easter Bunny | Easter Bunny | Flowing bunny ears |
| Toys Alive | Toys Alive | Teddy bear |

### 3.2 Logo Colour Application

Each sub-brand mark uses the same 3-colour palette but restricts gold to a specific detail:

| Product | Gold (#D9B455) Restricted To |
|---|---|
| MagicLens (master) | Inner ring gradient |
| Tooth Fairy | Lower wing veins/detail strokes |
| Easter Bunny | Inner ear accent, base convergence |
| Santa Visit | Pompom ball only |
| Toys Alive | Inner ears, nose, mouth |
| *Future products* | *Gold restricted to one identifying detail* |

**Rule:** Gold marks the "magical detail" — the element that makes each character special. It should never exceed ~20% of the mark's visual weight.

---

## 4. Logo Assets

### 4.1 Final Logo Files

All final assets in `Masterbrand_Logo_V2/`:

| File | Description |
|---|---|
| `01_Masterbrand_Logo_Namelock.png` | Horizontal lockup: lens + "MagicLens" wordmark (Silver Northern) — primary |
| `01_Masterbrand_Logo_Namelock_b.png` | Horizontal lockup alternate variant |
| `02_MagicLens_Logo_Final_Transparent_V2.png` | Master lens mark, transparent background |
| `03_MagicLens_Alt_Test_Only.png` | Alternate test mark (not for production) |
| `04_Lens_Alt_Add.png` | Alternate lens addition |
| `05_Logo_Bck.jpg` | Master lens mark on background |
| `Fairy_1k.png` / `Fairy_2k.png` | Tooth Fairy wing mark (1k and 2k) |
| `Fairy_Bck.jpg` | Tooth Fairy mark on background |
| `Bunny.png` / `Bunny_Bck.png` | Easter Bunny ears mark + on background |
| `Santa_1k.png` / `Santa_2k.png` | Santa Visit hat mark (1k and 2k) |
| `Santa_Bck.png` | Santa Visit mark on background |
| `Toy.png` / `Toy_Bck.png` | Toys Alive bear mark + on background |
| `z_Master_Logo.png` | Archived master logo (superseded) |

### 4.2 Lockup Formats

| Format | File | Description |
|---|---|---|
| Icon only | `02_MagicLens_Logo_Final_Transparent_V2.png` | App icon, favicon, social avatar |
| Horizontal lockup | `01_Masterbrand_Logo_Namelock.png` | Nav bar, email header, letterhead |
| Sub-brand lockup | *To be produced* | Product icon + product name + "by MagicLens" |
| Stacked lockup | *To be produced* | Lens above, wordmark below |

---

## 5. Website Colour Application

### 5.1 Light / Dark Mode

| Element | Light Mode | Dark Mode |
|---|---|---|
| Background | Ivory Glow #F5F0E3 | Night Deep #2C3646 |
| Card/surface | White #FFFFFF | Night Blue #3D4A5C |
| Primary text | Night Blue #3D4A5C | Ivory Glow #F5F0E3 |
| Secondary text | Slate #7A8494 | Slate #7A8494 |
| Links / CTA | Warm Gold #D9B455 | Gold Light #E8D48A |
| CTA hover | Gold Light #E8D48A | Warm Gold #D9B455 |
| Accent borders | Soft Periwinkle #8B8FBE | Soft Periwinkle #8B8FBE |
| Hero/immersive sections | Night Deep #2C3646 | Night Deep #2C3646 |

### 5.2 Section Treatments (validated in web demo)

| Section | Background | Text | Accent |
|---|---|---|---|
| Nav bar | White | Night Blue | Gold CTA button |
| Hero | Full-bleed image | — | — |
| Product grid | Ivory Glow | Night Blue headings, Slate descriptions | White cards |
| Feature section | Background image + Night Blue overlay (75% opacity) | Ivory heading, Lavender body | Gold links, Periwinkle circle frame |
| Testimonial | Ivory Glow | Night Blue quote, Slate citation | Gold stars |
| CTA band | Soft Periwinkle | White | White button, lens logo watermark at 15% opacity |
| Footer | Night Deep | Ivory headings, Slate links | Gold hover states |

### 5.3 WCAG Contrast

| Combination | Ratio | Pass? |
|---|---|---|
| Night Blue on Ivory | 5.2:1 | AA |
| Ivory on Night Blue | 5.2:1 | AA |
| Warm Gold on Night Deep | 4.8:1 | AA |
| Periwinkle on Night Deep | 3.4:1 | AA Large |

---

## 6. Brand Voice Notes

- **Tone:** Warm, intimate, wonder-first. Speaks to parents, not children.
- **Key phrase:** "Something extraordinary visited last night."
- **Positioning:** Premium AI video memories — "a well-designed children's book cover that an adult would buy for the shelf, not the toy box."
- **Magic lives in the ordinary:** Real homes, real rooms, warm lighting. Never fantasy overload.

---

## 7. Remaining Items

- [ ] Lock wordmark typography from shortlist (Section 2.1)
- [ ] Produce stacked lockup format
- [ ] Produce sub-brand lockups (product icon + name + "by MagicLens")
- [ ] Test lockups at key sizes (favicon 16px, social 400px, hero 1200px)