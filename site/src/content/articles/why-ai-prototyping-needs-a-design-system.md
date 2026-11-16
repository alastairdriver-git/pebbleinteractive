---
title: Why AI prototyping needs a design system
description: AI can make a screen in seconds. A design system is what makes that screen on brand, accessible and buildable, rather than plausible and wrong.
series: AI in the design process
pubDate: 2026-11-16
draft: false
related: [brightlocal, glint]
products: [design-system-health-check]
keywords: [AI prototyping, design systems, design tokens, generative UI, prototyping]
---

Ask an AI tool for a settings page and you'll have one in seconds. It will have a sidebar, some toggles, a save button and a pleasant grey palette. It will look like a settings page.

It won't look like *your* settings page. The spacing will be close to yours but not the same. The buttons will be a slightly different shape. There'll be a component you don't have, a colour that isn't in your palette and a toggle with no visible label. Every one of those is small. Together they make something that looks finished and can't be used.

That's the core problem with AI prototyping without a design system: you get plausible output, fast, and the plausibility hides how much of it is wrong.

## Fast is not the bottleneck any more

For most of the history of product design, making the thing was the slow part. A prototype took days, so teams tested fewer ideas and argued more about the ones they had.

AI has largely removed that constraint. In our work with BrightLocal, we prototype across the product, from listings to reviews, and the cost of trying another direction is now close to zero. That changes where the effort goes. The question isn't "can we make this?" but "is this right, and could we actually ship it?"

A design system answers the second half of that question before you've asked it.

## What a design system gives an AI tool

A design system is a set of decisions written down: which colours, which type sizes, which spacing steps, which components and how each one should be used. Hand those decisions to an AI tool and it stops guessing.

**Tokens limit the choices.** If the only spacing values available are your spacing scale, generated layouts land on your rhythm. If colour comes from named tokens such as `surface`, `muted` and `accent` rather than raw values, generated screens inherit your contrast and your dark mode for free.

**Components replace invention.** Without a component library, an AI tool will happily write a new button for every screen. With one, it composes screens from parts you've already designed, tested and built. The output is a different arrangement of known pieces, not a new set of unknowns.

**Usage guidance carries judgement.** Components alone aren't enough. The tool also needs to know that destructive actions use the secondary button style, that tables over a certain width scroll rather than wrap, and that form errors appear under the field. That's the part of a design system most teams never write down, and it's the part AI tools need most.

## Prototypes you can review like code

When a prototype is made from real components and real tokens, it's no longer a picture of an interface. It's an early version of one.

At BrightLocal, prototypes sit in the design system repository and go through the same pull request review as production code, with usage guidance written into Storybook. That does two useful things. Developers can see exactly which components a design uses and spot anything new before it's built. And designers get feedback on feasibility while the idea is still cheap to change.

Neither would be possible if the prototype were AI output with its own invented styles.

## Real data, too

The same principle applies to the content inside the prototype. In a business portal we designed for Glint, every price and chart used real market data, which made it credible to show to partners. A design system keeps the interface honest; real data keeps the content honest. AI tools are good at both, given the right inputs. There's more on this in the [next article](/articles/real-data-in-prototypes).

## What to fix first if your system isn't ready

Most design systems were written for people, not tools. If you want AI prototypes that hold up, these are the gaps that matter most:

- **Name tokens by purpose, not appearance.** `accent` tells a tool when to use it; `teal-500` doesn't.
- **Document when to use each component, not just how.** A sentence of guidance prevents a hundred wrong choices.
- **Keep design and code in step.** If Figma and the component library disagree, the tool will pick one and you won't know which.
- **Write examples.** One good composed screen teaches more than a page of rules.
- **Make the docs readable by machines.** Plain Markdown in the repository beats a PDF or a slide deck.

## The designer's job changes, it doesn't shrink

None of this makes the designer less important. When options are cheap, judgement is what's scarce: deciding which of ten generated layouts is right, noticing what's missing, and knowing when the system itself needs to change.

A design system is how that judgement scales. Write it down once, and every screen a person or a tool makes afterwards starts from your decisions instead of a guess.
