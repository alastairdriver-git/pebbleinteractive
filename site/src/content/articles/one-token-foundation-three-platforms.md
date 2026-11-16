---
title: One token foundation, three platforms
description: Define colour, type and spacing once and let iOS, web and admin inherit them. What we shared across platforms at Pocket Films, and what we let each one do its own way.
series: Design systems in practice
pubDate: 2026-11-16
draft: false
related: [pocket-films]
products: [design-tokens-guide, design-tokens-starter-guide, token-naming-cheat-sheet]
keywords: [design tokens, multi-platform design system, iOS design system, theming, dark mode, design systems]
---

Most products with more than one platform end up with more than one design system. Nobody chooses that. The app team needs a button on Monday, the web team needs one on Wednesday, and by the end of the quarter there are two blues, two type scales and two ideas of what "medium spacing" means.

Each difference is small. Together they make a product that feels like it was built by different companies, and they double the cost of every change afterwards.

The fix is to make the basic decisions once, in one place, and let every platform inherit them.

## What a token foundation is

A design token is a named decision. Instead of a hex value scattered through three codebases, there is one entry called something like `accent`, and every platform reads its value from the same source.

![Diagram: one token foundation feeding the iOS app, the provider platform and the admin.](/figures/one-token-foundation-three-platforms/one-foundation.png "wide: One foundation, inherited by every platform.")

A token foundation is the full set of those decisions: colour, type, spacing and the other raw materials every screen is made from. It sits underneath the components. Change a token and everything built on it changes with it.

That is the whole idea. The hard part is deciding what belongs in the foundation and what doesn't.

## What we did at Pocket Films

Pocket Films is an AI-powered marketplace that connects filmmakers with creative service providers. It serves two very different audiences: production teams sourcing locations, crew and equipment, and providers who want to be found. That meant three surfaces from the start: a mobile app, a provider web platform and a system admin.

![Pocket Films design system: type scale, colour tokens and components](/work/pocket-films/pocketfilms-design-systems.webp "wide: The Pocket Films design system. One set of tokens behind the app, the provider platform and the admin.")

We led design from the beginning, so we had the chance to do this properly before any drift set in. We built a single token foundation that every surface inherited from. Colour, type, spacing and components were defined once and cascaded to the iOS app, the provider platform and the admin, with light, dark and brand themes.

Three platforms came out of one design system, and Pocket Films launched on iOS.

## What to share

Some decisions should be the same everywhere, with no exceptions.

![Comparison of what to share across platforms (colour, type, spacing, shape, meaning and names) and what to let diverge (navigation, density, platform controls, input, text size settings).](/figures/one-token-foundation-three-platforms/share-or-diverge.png "wide: Share the foundations. Let the platform conventions differ.")

- **Colour, by purpose.** Name colours for what they do, such as `surface`, `text`, `accent` and `danger`, not for what they look like. A purpose name works in light mode, dark mode and a brand theme. `blue-500` works in one of them.
- **The type scale.** A small set of sizes and weights with clear roles: heading, body, caption. Platforms can render them with different technology, but the steps should match.
- **The spacing scale.** One set of steps, used for padding, gaps and margins everywhere. This does more for a consistent feel than almost anything else.
- **Shape.** Corner radii and border widths. Small, but people notice when they differ.
- **Meaning.** What counts as a primary action. What destructive looks like. Which colour means success. These are the decisions people learn once and expect to hold.
- **Names.** If a thing is called a "shortlist" in the app, it's a shortlist in the admin. Shared vocabulary is part of the system.

## What to let diverge

Sharing a foundation does not mean making every platform look identical. People use a phone, a web platform and an admin tool in different ways, and each platform has habits its users already know.

![Pocket Films iOS app screens: messages, map search and a studio profile](/work/pocket-films/pocketfilms-gallery01-image2.jpg "Same tokens, native patterns: the Pocket Films iOS app.")

- **Navigation.** A phone app and a wide web platform need different ways of getting around. Forcing one pattern onto both makes at least one of them worse.
- **Density.** An admin tool is used all day by people who want to see a lot at once. A consumer app wants more room. Use the same spacing scale, but pick different steps from it.
- **Platform controls.** Date pickers, share sheets, system alerts and the like are best left to the platform. People already know how they work, and they come with accessibility built in.
- **Input.** Touch targets need to be bigger than mouse targets. Hover doesn't exist on a phone. Components can share a name and a look while differing in size and behaviour.
- **Text size settings.** Each platform has its own way of letting people make text larger. Respect it, even if it means your type scale flexes.

A useful test: if a difference comes from how the platform is used, keep it. If it comes from two teams not talking, remove it.

## Themes come for free, if you set it up early

Pocket Films needed light, dark and brand themes. With purpose-named tokens, a theme is a second set of values for the same names. No component needs to know which theme it's in.

Without that structure, dark mode is a project. Every screen has to be visited and every colour reconsidered. With it, dark mode is mostly a table of values, plus a check of the places where it doesn't quite work.

The same goes for brand themes. If you think there is any chance the product will need a second brand, a partner version or a seasonal look, the cheapest time to prepare is at the start.

## How to tell it's working

You don't need a dashboard for this. A few plain questions will do.

- Can you change the accent colour in one place and see it change on every platform?
- Does a new screen on any platform use only values that are in the scale?
- Do designers and developers on different platforms use the same names for the same things?
- When someone needs a value that isn't in the foundation, is there a known way to ask for it?

If the answer to any of these is no, that's where the drift will start.

## Where to begin if you already have drift

Most teams aren't starting from scratch. If you have three platforms and three sets of values, don't try to fix everything at once.

1. **List what you have.** Pull the colours, type sizes and spacing values from each platform and put them side by side. The overlap is usually larger than people expect.
2. **Agree the names first.** Settle on purpose-based names before arguing about values. Names are what the platforms will share.
3. **Start with colour and spacing.** They give the biggest visible return and are the easiest to swap.
4. **Move one platform at a time.** Pick the one with the most active work and move it onto the shared tokens as screens are touched.
5. **Write down the allowed differences.** A short list of what each platform does its own way, and why, stops the same debate coming back.

## What to take from this

A token foundation is a small thing to build and a large thing to have. It keeps three platforms feeling like one product, makes themes cheap and gives everyone, including any AI tools you use, the same set of decisions to work from. We wrote about that last point in [why AI prototyping needs a design system](/articles/why-ai-prototyping-needs-a-design-system).

Share the decisions. Let the platforms differ where their users do.
