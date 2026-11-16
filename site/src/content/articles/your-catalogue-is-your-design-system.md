---
title: "Your catalogue is your design system: choosing what agents can use"
description: With A2UI 1.0, an agent can only place components from your catalogue. Deciding what goes in it is a product decision. How we choose components, shape their properties, version the catalogue and decide who owns it.
series: AI in the design process
pubDate: 2026-11-16
draft: false
products: [a2ui-catalogue-guide, a2ui-starter-guide]
keywords: [A2UI, A2UI catalogue, component catalogue, generative UI, AI agents, design systems, catalog.json, agent interfaces]
---

With A2UI 1.0, an agent can only place components that your app has listed in its catalogue. So the catalogue sets the limits of every screen an agent will ever compose for you. Choosing what goes in it, what each component is called and what its properties allow is a product decision, and it belongs with the people who look after the design system.

We covered what A2UI is in [A2UI and the future of interfaces](/articles/a2ui-and-the-future-of-interfaces). This piece is about the catalogue itself: how we chose ours, and what we'd tell a team starting theirs.

## What the catalogue does

In A2UI, the agent sends JSON that names components and fills in their properties. The client draws them with its own code. The [A2UI documentation](https://a2ui.org/concepts/catalogs/) calls the catalogue "a contract between an agent and a renderer": the agent sends only component types the renderer knows how to build, never HTML, CSS or scripts. The agent's tooling also adds your component descriptions to the model's prompt, so the catalogue is both the limit and the vocabulary.

https://a2ui.org/concepts/catalogs/

A2UI publishes a basic catalogue of 18 general components, from Row and Card to Slider and DateTimeInput. The docs are clear that you don't have to use it. You can restyle it, mix it with your own, or replace it. If you replace it with your own components, everything an agent composes is made of your design system.

## Our catalogue, as an example

Pebble's catalogue has 15 components, built on [Grade](https://gradeui.com), our design system, and themed with Pebble's tokens. Five are layout and structure: Card, Column, Row, Section and Heading. Four show content: Text, Link, Badge and Stat. Four take input or send actions: Button, TextField, DateField and Choice. Two are specific to us: ContentItem, one piece of planned content with its kind, date and status, and ProductCard, one of our digital products with its price.

This is a live surface rendered from that catalogue. Switch to **Messages** to see the JSON the agent sent, and use the surface to see what goes back.

{{a2ui schedule}}

Everything on it is one of those 15 components. The agent asked for a Card, a Row of three Stats, a list of ContentItems and two Buttons. It didn't choose a colour, a font or a spacing value, because the catalogue gives it no way to.

## How to choose

![Four steps to a first catalogue: list the screens agents should build, sketch each as a tree of your components, keep what recurs, and describe each component in a sentence an agent can follow.](/figures/your-catalogue-is-your-design-system/choosing-the-catalogue.png "wide: How we choose what goes in a catalogue.")

**Start from screens, not from the library.** List the five screens you most want an agent to produce. Sketch each as a tree of your existing components. The components that keep appearing are your first catalogue. Anything that appears once is a candidate to leave out.

**Keep it small.** Every component and property ends up in the agent's prompt, and each one is another way to get it wrong. Eight to fifteen components covers a lot of ground. Add more when a real surface needs them.

**Name things for their purpose.** A ContentItem with a title, date and status is easier to use correctly than a generic box with a dozen properties. Domain components are fine. Ours exist because content and products are what our screens are made of.

**Build the states in.** The agent shouldn't assemble hover styles, focus rings or disabled states. Your components already handle those. In ours, a ContentItem receives a status such as "needs review" and decides for itself which badge tone that gets. The agent says what something means. The component decides how it looks.

**Write descriptions for an agent.** The description is the documentation the agent reads. "A button" tells it nothing. Ours says the Button "sends an action back to the agent. Use one primary button per surface." Choice says to "pick one option from a short list". Write each one as usage guidance, the way we suggest in [design system docs for people and AI agents](/articles/design-system-docs-for-people-and-ai-agents). Version 1.0 also lets a catalogue carry top-level `instructions`, Markdown guidance that the agent SDK adds to the prompt.

## What to leave out

Ours has no Image, Video, Modal, Tabs or Slider. The basic catalogue has all of them. None of the surfaces we've built so far needed them, so they aren't there. That's the point of starting from screens.

We'd also leave out anything you wouldn't want composed on the fly. Payment, consent and other flows where the exact wording and order matter are better as fixed screens that an agent can open but not rearrange.

## How to shape properties

![Comparison: keep colours, pixel sizes, fonts, interaction states and status colours inside the component; expose text, variants, statuses, labels and actions as properties.](/figures/your-catalogue-is-your-design-system/props-carry-meaning.png "wide: Properties carry meaning. Components carry the look.")

- **Text can be bound to data.** Anything the agent might fill from data is a `DynamicString`, which takes either a literal value or a binding such as `{"@path": "/counts/out"}`. That lets the agent send the layout once and change only the data.
- **No styling properties.** No colours, pixel sizes, fonts or class names. If a different look is needed, that's a variant your design system should own.
- **Fixed choices stay short.** Spacing and button variants are small fixed lists. One catch we found by running the code: a property defined as a fixed list rejects a binding, so a status that comes from data, inside a list, has to be a `DynamicString`. We list the allowed values in its description and check them in the component.
- **Actions are properties too.** A Button's `action` names an event, such as `open_item`, with a context that can bind to the row's data. The agent receives what was on screen when the user clicked.
- **Generic inputs need labels.** A TextField's purpose changes each time, so it takes a `label`. The A2UI guide on [defining a catalog](https://a2ui.org/guides/defining-a-catalog/) suggests leaving the label off domain components with a fixed purpose. It saves tokens and keeps the wording consistent.

## Versioning the catalogue

Every catalogue has an id, conventionally a URL. Ours is `https://www.pebbleinteractive.com/a2ui/catalog/v1.json`. When a session starts, the renderer tells the agent which catalogue ids it supports, and the agent picks from that list or sends no UI at all.

The A2UI guide's advice is to version the path, `v1/` then `v2/`, when you make breaking changes. Adding a component or an optional property doesn't break anything an agent already sends. Renaming a component, removing one or adding a required property does, so treat those as a new version and keep the old one working while agents move over.

## Who owns it

The design system team should own the catalogue, because it is a published slice of the design system. Product owns the decision about which screens an agent should be able to build, and so which components are worth adding. Engineering owns the renderer and the tests.

In practice that means catalogue changes go through the same review as component changes. A new component needs a reason (a real surface that needs it), a description written for an agent, and an example surface that passes validation. A2UI's validation checks the shape of each message against the catalogue. It won't tell you a surface makes sense, so someone still needs to look at it.

## What to take from this

- The catalogue limits what an agent can show, so choosing it is a product decision.
- Start from the screens you want, and keep the components that recur.
- Name components for their purpose, build the states in, and write descriptions an agent can follow.
- Let properties carry meaning, never styling, and make text bindable.
- Version the catalogue id when you break something.
- Give it an owner, and review changes like any other part of the design system.

The work is familiar. It's the same work that helps any AI tool use your system well, as we argued in [why AI prototyping needs a design system](/articles/why-ai-prototyping-needs-a-design-system). A2UI just makes the boundary explicit.
