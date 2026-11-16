---
title: From prototype to real iOS and Android apps
description: How to start thinking about building native apps from a design system and prototypes. One token source for SwiftUI and Jetpack Compose, component parity, and where a person still has to check.
series: Design systems in practice
pubDate: 2026-11-16
draft: false
related: [glint, pocket-films]
products: [design-system-health-check]
keywords: [native apps, SwiftUI, Jetpack Compose, design tokens, iOS and Android design system, AI coding tools]
---

A web prototype can feel so close to a finished product that the native apps seem like a formality. They aren't. iOS and Android have their own languages, their own conventions and their own gatekeepers, and a team that treats them as a port of the web version usually ends up with apps that feel slightly foreign on both.

What a design system and a good prototype can do is remove most of the guesswork. This article is about how to set that up, and where the limits are.

## Start from one source of tokens

Native iOS apps are commonly built with SwiftUI and native Android apps with Jetpack Compose. Neither reads CSS. If your colours, type and spacing only exist as web styles, each app team will retype them by hand, and they'll drift from that day on.

The fix is to keep tokens in a neutral format, such as a JSON file, and generate what each platform needs from it: CSS variables for web, Swift for iOS, Kotlin for Android. This is an established practice, and there are well-known open source tools for it.

Nobody changes a colour inside an app. They change it at the source and every platform updates.

At Glint, the head of engineering asked for a single design system the app, the web and the brand could all draw on, and part of our work was bringing Glint's app design system into code from Figma, alongside its brand guidelines. At Pocket Films, a single token foundation meant colour, type, spacing and components were defined once and cascaded to the iOS app, the provider platform and the admin, with light, dark and brand themes.

## Aim for component parity, not identical components

Once tokens are shared, the next layer is components. The goal is parity: each platform has a button, a text field, a card and a list row, with the same names, the same variants and the same meaning.

It doesn't mean the same pixels. A SwiftUI button and a Compose button are built differently and should behave the way buttons do on their own platform. What they share is the contract. `primary` means the main action. `destructive` means the dangerous one. A designer can say "a secondary button" and all three teams know exactly what that is.

A simple parity table is worth keeping: components down the side, platforms across the top, and the status of each. It shows at a glance where one platform is behind.

Some things should differ on purpose. Navigation, system controls such as date pickers and share sheets, and gestures such as Android's system back are better left to each platform. We covered what to share and what to let diverge in [one token foundation, three platforms](/articles/one-token-foundation-three-platforms).

## What to prototype on web first

Web prototypes are quick to make, easy to share with a link and cheap to change. That makes them the right place to settle anything that isn't specific to a phone.

- **The flow.** Which steps, in what order, with what branching. At Glint, business onboarding was a step-by-step flow built from the compliance spec, branching on business type to meet US and UK ownership rules. That logic is the same on any platform, and it is far cheaper to get right in a prototype.
- **The content.** Wording, labels, error messages, what information appears where.
- **The data.** How real values look in the layout. Glint's portal prototype used public market data behind every price and chart. There's more on that in [real data in prototypes](/articles/real-data-in-prototypes).
- **The awkward cases.** Empty, error, loading, too much, too little.

## What needs to be built natively to judge

Some things a web prototype can only approximate. For these, build a small native version early instead of waiting for the full app.

- **Navigation and gestures.** How moving between screens feels, including swipes and back behaviour.
- **The keyboard.** How forms behave when the keyboard is up, which keyboard type appears, how fields move.
- **System features.** Biometric sign-in, notifications, camera, the permission prompts that come with them.
- **Performance.** Long lists, charts, animation on a real mid-range phone.
- **Text size and screen readers.** How the layout copes with the user's own settings.
- **Being offline.** What the app does on a train with no signal.

## Where AI coding tools help

AI coding tools are useful here, within limits.

- **Generating platform code from tokens.** Turning a token file into Swift and Kotlin is mechanical work they do well.
- **First drafts of components.** Given a clear specification and an existing web component to follow, a tool can produce a reasonable SwiftUI or Compose version to refine.
- **Translating screens.** A web prototype made from real components is a detailed specification. A tool can draft the native screen from it, using your native components.

The condition is the same as on the web. The tool needs the design system: token names, component names and written guidance. Without them it will invent its own. We wrote about that in [why AI prototyping needs a design system](/articles/why-ai-prototyping-needs-a-design-system).

## Where a person must check

Some things shouldn't be taken on trust from generated code.

**Accessibility.** Turn on VoiceOver on iOS and TalkBack on Android and use the app with them. Check labels, reading order and focus. Set the text size to its largest and see what breaks. Check touch target sizes and contrast. Tools can add accessibility labels. They can't tell you whether the experience makes sense to someone who relies on them.

**Platform conventions.** Apple and Google each publish guidance on how apps should behave on their platforms. Generated code often carries web habits across, or mixes one platform's patterns into the other. Someone who knows each platform should use the app and note everything that feels out of place.

**Store review.** Both app stores review apps before they're published, and both have rules on things like privacy disclosures, permissions, payments and account deletion. The rules change, so read the current ones. Don't rely on what a tool remembers, and allow time for a rejection and a second submission.

**Regulated content.** Glint's business onboarding was built from the compliance officer's specification. A generated screen in a flow like that has to be checked against the specification by a person.

**Real devices.** Simulators are useful but generous. Test on real phones, including an older, smaller, slower one.

## A sensible order of work

1. Put tokens in one neutral source and generate each platform's output from it.
2. Agree the component list and names across platforms.
3. Prototype flows, content and data on the web.
4. Build a small native slice early: one real flow, on a real device.
5. Build out native components, with AI tools for drafts and people for review.
6. Check accessibility and platform conventions on every screen, and read the store rules early.

## What to take from this

A design system and a prototype won't build your apps for you. They do mean that when the native work starts, the questions left are native ones, and the colours, the components, the flow and the words are already settled.
