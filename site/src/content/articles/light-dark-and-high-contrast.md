---
title: "Light, dark and high contrast: test every theme, not just the default"
description: Most teams test the light theme and assume the rest. Dark mode, increased contrast and Windows forced colours break in predictable ways. What breaks, how to set up tokens for each mode, and what to check.
series: Design systems in practice
pubDate: 2026-11-16
draft: false
related: []
products: [advanced-design-system-audit, design-system-health-check]
keywords: [dark mode accessibility, high contrast mode, forced colors, prefers-contrast, Windows contrast themes, WCAG 2.2 contrast, focus indicators, design tokens, theming, accessibility testing]
---

Test every theme your product supports, not just the default. Most teams check contrast, focus and states in the light theme and assume dark mode and high-contrast modes will follow. They don't. Dark mode lowers the contrast of secondary text, increased-contrast settings expose faint borders, and Windows forced colours removes box shadows and background images, taking focus rings and selected states with them. Each mode needs its own token values and its own pass of checks.

The failures are predictable, so a few minutes per theme catches most of them.

## Three modes, three different requests

These are often lumped together, but the browser treats them differently.

- **Dark mode.** The person prefers light text on a dark background. `prefers-color-scheme: dark` tells you. Your colours still apply; you just choose different ones.
- **More contrast.** The person has asked for stronger contrast, for example with Increase contrast in macOS or iOS accessibility settings. `prefers-contrast: more` tells you. Your colours still apply, and you are expected to make them stronger.
- **Forced colours.** The person has chosen a limited palette, for example a Windows contrast theme, and the browser enforces it. `forced-colors: active` tells you. The browser replaces your text, background, border and outline colours with system colours, and sets `box-shadow`, `text-shadow` and non-image backgrounds such as gradients to none.

The first two are themes you design. The third is a palette you don't control, so the job is to make sure nothing important disappears when it takes over.

## What breaks, and why

![Grid of six things that break outside the default theme: contrast, focus rings, borders, colour-only states, box-shadow styles and images and icons.](/figures/light-dark-and-high-contrast/what-breaks.png "wide: The same six problems turn up in most audits.")

- **Contrast drops.** Secondary text that passes in light often fails in dark, because grey on near-black loses more than grey on white. WCAG 2.2 asks for 4.5:1 for normal text and 3:1 for large text (1.4.3 Contrast (Minimum), level AA) in every theme you ship, not only the first.
- **Focus rings vanish.** A focus style built from `box-shadow` is set to none in forced colours, so keyboard users lose their place. A ring tuned for a white page can also blend into a dark one. 2.4.7 Focus Visible (AA) needs a visible indicator in every mode.
- **Borders disappear.** Input outlines and card edges drawn in a pale tint fade in dark mode. Components that are only a filled shape, with no border at all, lose their edges in forced colours once the background is replaced. 1.4.11 Non-text Contrast (AA) asks for 3:1 for the boundaries people need to see.
- **States shown by colour only.** A selected tab that is only a different background, or an error that is only red text, can become identical to its neighbours when colours are forced. 1.4.1 Use of Color (A) already rules this out in every theme.
- **Images and icons.** A dark logo on a transparent background disappears on a dark surface. An SVG icon with a hard-coded fill may not match the text around it in forced colours.
- **Shadows as structure.** Elevation that relies on shadow alone does little on a dark background and nothing in forced colours.

Two focus criteria are easy to mix up. 2.4.11 Focus Not Obscured (Minimum) is level AA and is about sticky headers and panels hiding the focused item. 2.4.13 Focus Appearance is level AAA and sets a size and contrast for the indicator itself. We treat 2.4.13 as a good target for focus rings in every theme, even where AA is the requirement.

## How to set up tokens for each mode

The approach that holds up is the one we described in [one token foundation, three platforms](/articles/one-token-foundation-three-platforms): name tokens for their purpose, then give each mode its own value for the same name.

- **One name, a value per mode.** `color.text.subtle`, `color.border.control` and `color.focus.ring` exist once. Light, dark and high contrast each give them a value. Components never ask which theme they are in. There's more on naming in [name tokens for what they do, not how they look](/articles/name-tokens-for-what-they-do).
- **Choose dark values, don't calculate them.** Surfaces usually get lighter as they rise, saturated colours need a lighter step, and shadows do little. Inverting the light palette rarely works.
- **Make high contrast a real mode.** Stronger text, solid control borders instead of tints, no decorative transparency and a thicker, darker focus outline. Map it to `prefers-contrast: more`, and decide what happens when someone has dark mode and more contrast set at once.
- **Plan for forced colours, but don't theme it.** MDN advises against building a separate design for forced colours. Instead, make sure components have something the browser can colour: a real border (transparent is fine, the browser will colour it), an outline for focus, and `currentColor` for icons. Where a small fix is needed, use system colours such as `Canvas`, `CanvasText`, `ButtonText`, `Highlight` and `GrayText` so the result matches the person's palette.
- **Use `forced-color-adjust: none` sparingly.** It switches forced colours off for an element. Keep it for small things where the real colour is the content, such as a colour swatch, never a whole component.
- **Test contrast in the token build.** If every text and background pairing is checked per mode when tokens are built, most contrast failures never reach a screen.

https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/forced-colors

## Quick tests

You don't need special equipment. Two kinds of test cover most of it.

**Browser emulation.** In Chrome or Edge developer tools, the Rendering panel can emulate `prefers-color-scheme: dark`, `prefers-contrast: more` and `forced-colors: active`. It's quick enough to do on every pull request that touches a component.

**Real operating system settings.** Emulation can miss things, such as how native controls and scrollbars look. Once per release, use the product in Edge or Chrome with a Windows contrast theme on, and on a Mac or iPhone with Increase contrast on. Use the keyboard as well as the mouse.

In each mode, do the same short pass:

![Checklist for each theme: text contrast, control boundaries, focus ring on every step, states without colour, icons and images, and anything that has gone.](/figures/light-dark-and-high-contrast/every-theme.png "wide: The same six checks, once per theme.")

1. Measure body, secondary and coloured text against the surfaces it sits on.
2. Check input borders, checkboxes, toggles and chart lines against what's next to them.
3. Tab through a key flow and watch the focus ring the whole way.
4. Find a selected item, an error and a disabled control. Can you tell them apart without colour?
5. Look at logos, illustrations and icons on every surface.
6. Look for anything that has simply gone: a button with no edge, a divider that was a shadow.

If you use visual regression tests, render each component state in each theme. A light-only snapshot will tell you nothing when someone breaks dark mode.

## A checklist to take away

- Every semantic colour token has a value in every mode, with no silent fallbacks.
- Text meets 4.5:1 (3:1 for large text) and control boundaries meet 3:1, measured in each theme.
- A high-contrast mode is mapped to `prefers-contrast: more`.
- Focus uses `outline`, not `box-shadow` alone, and is visible in all modes.
- Components that rely on a background colour also have a border the browser can colour.
- No state relies on colour alone.
- Icons use `currentColor`; images are checked on dark surfaces.
- `forced-color-adjust: none` appears only on swatch-sized elements.
- Each theme is tested with emulation on every change and with real settings each release.

## What to take from this

If a theme is in the settings menu, someone is relying on it. The fixes are mostly small, and cheapest in the tokens, before every component has to be visited one by one.
