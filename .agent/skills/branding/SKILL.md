---
name: branding
description: >-
  Apply BRAC IED brand colours and typography to an existing LMS interface.
  Use when updating an LMS UI's visual theme to align with the BRAC IED brand
  guidelines, while preserving its existing layout and functionality.
---

# BRAC IED LMS Branding Skill

## Purpose

Update the colour scheme and typography of an **already-built LMS** to
align with BRAC Institute of Educational Development (BRAC IED) brand
guidelines.

This is a visual branding task only. Do not redesign the LMS or change
its functionality.

## Scope and constraints

- Inspect the existing project and identify its styling system, theme
  configuration, font-loading approach, and reusable UI components.
- Preserve the current layout, page structure, navigation, user flows,
  component behavior, backend logic, routes, and application
  architecture.
- Do not introduce new features or perform unrelated refactoring.
- Apply the brand consistently through shared design tokens or the
  project's existing theme mechanism.
- Reuse existing components; avoid one-off styling where a shared
  token or component style is appropriate.
- Do not recreate, modify, or approximate the BRAC IED logo. Use
  approved master artwork if it is already available in the project.

## Brand colour palette

### Primary colours

| Colour              | RGB           | HEX       | CMYK          |
| :------------------ | :------------ | :-------- | :------------ |
| Pantone Orange 021  | 255, 81, 0    | `#FF5100` | 0, 80, 100, 0 |
| Pantone Cool Gray 7 | 173, 175, 178 | `#ADAFB2` | 0, 0, 0, 37   |
| Pantone 432         | 69, 85, 96    | `#455560` | 23, 2, 0, 77  |

### Secondary colours

| Colour | RGB           | HEX       | CMYK          |
| :----- | :------------ | :-------- | :------------ |
| Pink   | 202, 72, 154  | `#CA489A` | 18, 86, 0, 0  |
| Green  | 141, 198, 63  | `#8DC63F` | 50, 0, 100, 0 |
| Yellow | 253, 185, 19  | `#FDB913` | 0, 30, 100, 0 |
| Purple | 109, 104, 175 | `#6D68AF` | 65, 65, 0, 0  |
| Blue   | 68, 200, 245  | `#44C8F5` | 60, 0, 0, 0   |

The HEX values are conversions from the RGB values in the brand guide.

### Colour application

- Let the primary colours dominate the interface.
- Use BRAC IED orange (`#FF5100`) for primary actions, active
  navigation indicators, selected tabs, and key highlights.
- Use Pantone 432 (`#455560`) for headings, body text, and dark
  navigation surfaces where appropriate.
- Use Cool Gray 7 (`#ADAFB2`) for secondary text, muted labels,
  dividers, and subtle borders.
- Prefer white or very light neutral backgrounds to maintain a clean,
  readable LMS.
- Use secondary colours selectively for course or program category
  coding; do not use all secondary colours as competing interface
  accents.
- When program/pillar categories are present, use the relevant brand
  association:
  - Early Childhood and Play — Yellow (`#FDB913`)
  - Teaching and Learning — Purple (`#6D68AF`)
  - Mental Health — Green (`#8DC63F`)
  - Care and Compassion — Pink (`#CA489A`)
  - Climate Change — Blue (`#44C8F5`)
- Maintain sufficient contrast for text, controls, and interactive
  states. Do not use a brand colour where it makes content difficult
  to read.

Suggested neutral interface values (implementation suggestions, not
specified brand colours):
- Page background: `#F8F8F8`
- Border: `#E8E8E8`
- Muted text: `#777777`

## Typography

### Latin text

Use **Quicksand** as the primary typeface for digital communications.

Use these weights:
- Light: 300
- Regular: 400
- Medium: 500
- Bold: 700

Recommended role mapping:
- Headings and page titles: Quicksand Bold (700)
- Body copy and general interface text: Quicksand Regular (400)
- Labels and emphasis: Quicksand Medium (500)
- Use Light (300) sparingly, only where readability remains strong.

### Bengali text

Use the appropriate Bengali typeface based on the input method:
- **Sutonny MJ** — Regular and Bold; recommended with the Bijoy Bangla keyboard.
- **Kohinoor Bangla** — Regular and Bold; recommended for Unicode keyboard input and email.

Use fonts already available and licensed in the project or institution.
If a required font is not available, do not silently substitute an
unrelated font; identify the missing font and use a reasonable
Bengali-capable fallback while documenting the limitation.

## Implementation workflow

1. Inspect the codebase to locate global styles, theme tokens,
   typography definitions, component libraries, and existing font
   assets.
2. Determine the current theme architecture (for example, CSS
   variables, Sass variables, MUI theme, Tailwind configuration, or
   another existing system).
3. Add or update centralized brand tokens using the exact palette
   above.
4. Load Quicksand and configure its supported weights. Configure
   Bengali font stacks for the relevant text/input contexts.
5. Update existing shared components and page styles to consume the
   theme tokens.
6. Apply orange to primary interactive states and use secondary colours
   only for meaningful category distinctions.
7. Check hover, focus, active, disabled, selected, error, and success
   states so the interface remains coherent and accessible.
8. Remove conflicting legacy colour and font declarations only where
   they interfere with this branding update.
9. Verify representative LMS screens, including login, dashboard,
   course page, navigation, forms, tables, and evaluation pages, as
   applicable.
10. Confirm that no routes, functionality, layout, data, permissions, or
    backend behavior have changed.

## Completion criteria

- The existing LMS retains its layout and functionality.
- BRAC IED primary colours are consistently applied.
- Secondary colours are used selectively and meaningfully.
- Quicksand is used for Latin text with the intended weight hierarchy.
- Bengali text uses the appropriate configured font stack.
- The theme is centralized and maintainable.
- Responsive layouts, readable contrast, and interactive states remain
  intact.
- Report any unavailable brand font or logo asset instead of inventing
  or recreating it.
