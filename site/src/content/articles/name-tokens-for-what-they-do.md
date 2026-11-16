---
title: Name tokens for what they do, not how they look
description: A token called blue-500 tells people what a colour is, not when to use it. Purpose names like color.text.subtle carry the decision, survive themes and help AI tools pick the right one. Tiers, a naming pattern, examples, and how to rename safely.
series: Design systems in practice
pubDate: 2026-11-16
draft: false
related: [pocket-films]
products: [design-tokens-guide, token-naming-cheat-sheet]
keywords: [design token naming, semantic tokens, token naming convention, design tokens, DTCG, primitive tokens, component tokens, dark mode, high contrast, design systems]
---

Name design tokens for the job they do, not the value they hold. A name like `blue-500` or `grey-light` describes a colour, so every designer and developer who uses it has to decide whether it's the right colour for the job, and the name stops being true the moment a theme changes the value. A name like `color.text.subtle` or `color.action.primary` makes that decision once, in the token, and stays true in light, dark and high-contrast modes. Keep appearance names for your raw palette, and give product code only purpose names.

## The problem with appearance names

An appearance name answers "what is this?" Product work needs an answer to "which one do I use here?"

If the only choices are `grey-400`, `grey-500` and `grey-600`, every person building a screen picks one for secondary text. Some pick 500, some pick 600, and one picks 400 because it looked nicer on their monitor. Nobody is wrong, because the system never said. Multiply that by every colour and spacing value and you get drift that no review can keep up with.

Themes make it worse. In dark mode, the text that was `grey-600` needs to be a light grey. Either the token called `grey-600` now holds a light value, and the name is a lie, or every component needs a condition to swap it, and the theme is a project.

## Purpose names carry the decision

A purpose name answers the question people actually have. `color.text.subtle` is for hints, captions and metadata. `color.border.control` is the outline of an input. `color.focus.ring` is the keyboard focus outline. Whoever chose the value checked its contrast once, and everyone who uses the name gets that work for free.

![Comparison: appearance names like blue-500, grey-light and dark-background against purpose names like color.action.primary, color.text.subtle and color.surface.page.](/figures/name-tokens-for-what-they-do/appearance-or-purpose.png "wide: The same decisions, named two ways.")

## Three tiers

Most token systems that work have three tiers. Each has a different kind of name.

![Three tiers of tokens: primitive, named for the value; semantic, named for the job; component, named for the part.](/figures/name-tokens-for-what-they-do/three-tiers.png "wide: Appearance names belong in the primitive tier only.")

- **Primitive.** The palette and scales: `color.teal.600`, `space.4`. Named for the value, and that is the one place a value-based name is right. Product code never uses them.
- **Semantic.** Named for purpose: `color.surface.page`, `color.text.subtle`, `color.action.primary`. Each points at a primitive, and the value can change per mode. This is the tier product code uses.
- **Component.** Optional: `button.background`, `card.padding`. Each points at a semantic token. Add one only when a component needs to change on its own without changing everything else.

## A naming pattern

We use `category.purpose.variant.state`, leaving out the parts a token doesn't need.

- **Category:** color, space, radius, text, motion.
- **Purpose:** surface, text, border, action, focus, inset, stack.
- **Variant:** primary, subtle, danger, control, raised.
- **State:** hover, pressed, disabled.

So `color.action.primary-hover`, `color.text.danger`, `space.inset.card`. Lower case, with hyphens inside a part. In the Design Tokens Community Group (DTCG) format, the dot is the path separator, so `color.text.subtle` is three nested groups. Names must not start with `$` or contain `{`, `}` or `.`.

| Instead of | Use | Why |
| --- | --- | --- |
| `blue-500` in product code | `color.action.primary` | Says when to use it, survives a rebrand |
| `grey-light` | `color.text.subtle` | "Light" is wrong as soon as dark mode arrives |
| `dark-background` | `color.surface.page` | The mode is a value, never part of the name |
| `red` for errors | `color.text.danger` | Separates error text from other reds |
| `space-12` in product code | `space.inset.control` | Ties the value to where it's used |
| `btn-bg-1` | `button.background` | Readable, and says which part |

Here is a primitive and a semantic token in the DTCG 2025.10 format. The semantic token refers to the primitive with curly braces and says what it is for.

```json
{
  "color": {
    "$type": "color",
    "teal": {
      "600": {
        "$value": { "colorSpace": "srgb", "components": [0.0588, 0.4314, 0.4196], "hex": "#0f6e6b" }
      }
    },
    "action": {
      "primary": {
        "$value": "{color.teal.600}",
        "$description": "Background of the main action in a view. Use once per view."
      }
    }
  }
}
```

https://www.designtokens.org/TR/2025.10/format/

## Purpose names make themes cheap

A mode is a different value for the same name. With purpose names, dark mode is a second file where `color.surface.page` points at a dark neutral and `color.text.subtle` at a lighter grey. High contrast is a third file with stronger text, solid control borders and a heavier focus ring. No component changes, and no component needs to know which mode it's in.

That is how it worked at Pocket Films. We built a single token foundation that the iOS app, the provider platform and the admin all inherited from, with light, dark and brand themes. We wrote about that in [one token foundation, three platforms](/articles/one-token-foundation-three-platforms). Themes only stay cheap if nothing in the components refers to a specific colour, which is what purpose names make possible.

Never put the mode in the name. `color.dark.background` means a second set of names for every mode, and the component has to choose between them. We cover what each mode needs, and what to test, in [light, dark and high contrast](/articles/light-dark-and-high-contrast).

## Purpose names help AI tools choose

An AI tool asked for "the colour for error text" can find `color.text.danger` by its name. It can't find `red-600` by meaning. It has to guess, and it will often guess from whatever it saw last in the codebase.

Three things help. Purpose names. A one-line `$description` on every semantic and component token, which the format supports and most build tools can carry into the output. And keeping primitives out of reach: if `--color-teal-600` exists in your CSS, a tool will use it. There's more on this in [why AI prototyping needs a design system](/articles/why-ai-prototyping-needs-a-design-system) and [design system docs for people and AI agents](/articles/design-system-docs-for-people-and-ai-agents).

## How to rename without breaking things

Token names are an API. Teams depend on them, and removing one breaks their build. So rename in stages.

1. **Agree the new names first.** Settle them before anyone migrates code. Arguing about values can come later.
2. **Add the new name and alias the old one to it.** The old token keeps working and points at the new one, so nothing changes on the day.
3. **Mark the old name deprecated.** DTCG 2025.10 has `$deprecated`, which can be `true` or a message saying what to use instead.
4. **Make the warning visible.** A build can turn the flag into a compiler warning on iOS and Android and a note in the docs, so people see it where they work.
5. **Migrate by component, then remove.** Remove the old name in a later release, never the one that adds the new name.

```json
{
  "color": {
    "text": {
      "secondary": {
        "$type": "color",
        "$value": "{color.text.subtle}",
        "$description": "Old name for color.text.subtle, kept so existing code still builds.",
        "$deprecated": "Use color.text.subtle. Removed in 2.0.0."
      }
    }
  }
}
```

## What to take from this

- Appearance names belong in the primitive tier and nowhere else.
- Product code uses purpose names, so the decision is made once.
- The mode is a value, never part of the name.
- Write a one-line description for every token people use.
- Rename with an alias and a deprecation, and remove later.

Good names are the cheapest part of a token system to get right and the most expensive to change later. They are worth an afternoon before anyone writes a line of code.
