---
title: Design tokens, properly
summary: Set up or fix a token system that scales across web, iOS and Android and works with AI tools. A 20-page guide, a tested starter that builds CSS, SwiftUI and Compose, and a token migration skill.
price: 29
priceGbp: 24
status: soon
format: Guide, starter and Claude skill
image: /products/design-tokens-guide/preview.png
heroImage: /products/design-tokens-guide/hero.png
imageAlt: Design tokens, properly, the guide and starter
headline: Tokens that work on every platform, in every theme
problem: Most token systems start well and drift. Names describe colours instead of jobs, dark mode is bolted on, and the iOS and Android apps quietly fork. Then AI tools copy whatever they find.
outcomes:
  - Name tokens so people and AI tools know when to use them
  - Ship light, dark and high-contrast themes from one source
  - Build CSS, SwiftUI and Jetpack Compose from the same files
  - Find and replace hard-coded values across your codebase
highlights:
  - { icon: Layers, title: Three tiers, explained, body: "Primitive, semantic and component tokens, with naming rules and good and bad examples." }
  - { icon: Contrast, title: Themes that hold up, body: "Light, dark, high contrast and density, with contrast checks built into the starter's tests." }
  - { icon: Code, title: One source, three platforms, body: "A Style Dictionary build that outputs CSS variables, SwiftUI and Compose, with the unit bugs fixed." }
  - { icon: Sparkles, title: A migration skill, body: "A Claude skill that scans your code for raw values, maps them to tokens and writes a migration report." }
inside:
  - { icon: BookOpen, title: 20-page guide, body: "From tiers and naming to modes, platforms, migration and governance." }
  - { icon: Code, title: Tested starter, body: "Design tokens in the W3C format with 12 automated checks, including contrast." }
  - { icon: Sparkles, title: Token migration skill, body: "For Claude, plus plain instructions for any AI tool." }
  - { icon: FileText, title: Start here guide, body: "How to use the guide, starter and skill." }
includes:
  - "A 20-page guide to tiers, naming, modes, platforms, migration, governance and AI readiness"
  - "A starter token set in the W3C design tokens format: light, dark and high-contrast colour, spacing, type, radius and motion"
  - "A Style Dictionary build for CSS custom properties, SwiftUI and Jetpack Compose, with tests"
  - "A token migration skill for Claude, and instructions for any AI tool"
  - "A one-page takeaway sheet"
forWho: Design system leads, product designers and front-end and mobile engineers setting up tokens or fixing ones that have drifted.
previews:
  - { src: /products/design-tokens-guide/page-1.png, alt: "The guide's opening page and contents" }
  - { src: /products/design-tokens-guide/page-5.png, alt: "Naming tokens by purpose" }
  - { src: /products/design-tokens-guide/page-9.png, alt: "Building tokens for several platforms" }
faqs:
  - { q: "Do I need Style Dictionary?", a: "The starter uses it because it's the most widely used token build tool. The naming, tiers and themes advice applies whatever you use." }
  - { q: "Does it work with Figma variables?", a: "Yes. The guide covers importing and exporting design tokens with Figma variables and modes, including the current limits." }
  - { q: "What's the skill?", a: "A set of instructions Claude follows to audit your codebase for hard-coded values and propose tokens. There's a plain version for other AI tools too." }
order: 2
keywords: [design tokens, token naming, Style Dictionary, dark mode, high contrast, SwiftUI, Jetpack Compose, W3C design tokens]
---

The complete guide to design tokens, drawn from setting them up across web, iOS and admin platforms for real products. Start with the free token naming cheat sheet if you want a taste.
