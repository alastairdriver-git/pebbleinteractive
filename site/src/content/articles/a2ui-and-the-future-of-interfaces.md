---
title: A2UI and the future of interfaces
description: Interfaces are moving from fixed screens to UI composed by an agent at the moment of need, from a catalogue of your own components. What A2UI is, now it has reached 1.0, and why it makes the design system matter more.
series: AI in the design process
pubDate: 2026-11-16
draft: false
related: [brightlocal]
products: [a2ui-catalogue-guide, a2ui-starter-guide]
keywords: [A2UI, generative UI, AI agents, design systems, component catalogue, agent interfaces]
---

Almost every interface in use today was decided in advance. A team worked out which screens the product needed, designed each one and shipped them. When you open the app, you get the screens they chose, in the order they chose.

AI agents don't fit that model well. An agent can help with a task nobody designed a screen for. At the moment it mostly does this in text: paragraphs, bullet points, perhaps a table. That's a poor way to pick a date, compare three options or fill in a form.

The obvious next step is for the agent to show an interface, not describe one. The question is how to let it do that without giving up control of your product.

## The idea: UI composed at the moment of need

Our argument is this. Interfaces are starting to move from fixed screens to UI that an agent composes when it's needed, for the task in hand. And the sensible way to do that is from a locked catalogue of your own design system components, not from whatever the model feels like drawing.

That second part matters. An agent that writes fresh HTML for every answer will give you the problems we described in [why AI prototyping needs a design system](/articles/why-ai-prototyping-needs-a-design-system): plausible output that is off brand, inconsistent and often inaccessible. Running code written on the spot by a model is also a security problem.

So the agent should choose and arrange. It shouldn't invent.

## What A2UI is

A2UI is an open-source generative UI framework built around that principle. This is how [its documentation](https://a2ui.org/concepts/overview/) describes it.

![Four steps: the agent decides a screen will help, composes it only from your catalogue, streams it as JSON data, and your app renders it with your own components.](/figures/a2ui-and-the-future-of-interfaces/how-a2ui-works.png "wide: How an agent builds a screen from your components.")

- **The agent describes, the client renders.** An agent describes an interactive UI as a stream of JSON messages. The client renders that description using its own native widgets.
- **There is a catalogue.** The client registers a component catalogue, a file called [`catalog.json`](https://a2ui.org/concepts/catalogs/). The agent may only place components from it.
- **It's data, not code.** A2UI sends declarative data, never executable code. The agent says "a card containing a date picker and a button". It doesn't send a script.
- **It updates as it goes.** Messages include [`updateComponents`](https://a2ui.org/concepts/messages/), which changes what is on screen, and [`updateDataModel`](https://a2ui.org/concepts/data-binding/), which changes the data behind it. User [actions](https://a2ui.org/concepts/actions-and-functions/) are sent back to the agent.
- **It works across platforms.** [Renderers](https://a2ui.org/ecosystem/renderers/) exist for React, Lit, Angular, Flutter, SwiftUI and Jetpack Compose.
- **It isn't tied to one transport.** Messages can travel over AG-UI, A2A, MCP and WebSockets. An A2UI surface can also [run inside an MCP App](https://a2ui.org/guides/a2ui-in-mcp-apps/), in hosts that support MCP Apps.

In short, the agent sends a description, and your app builds it from parts you've already made.

https://a2ui.org/

## The catalogue is the design system

Here is the part that matters to anyone who looks after a design system. That catalogue of components the agent is allowed to use is, in effect, your design system.

Here's one of ours. This is a live surface rendered by Pebble's own A2UI catalogue, built on [Grade](https://gradeui.com), our design system. It shows the kind of screen we use to plan our own content. Switch to **Messages** to see the JSON behind it, and use the surface to see what gets sent back to the agent.

{{a2ui schedule}}

If the catalogue contains your button, your card, your form field and your table, then everything an agent composes is made from them. It inherits your tokens, your themes, your accessibility work and your platform behaviour, because the client is rendering its own native widgets. The agent can't produce a button that isn't yours, because it can't produce a button at all. It can only ask for one.

That changes what a design system is for. Until now it has been a tool for teams: a way for designers and developers to build screens consistently. In this model it also becomes the material agents build with. Its quality sets the ceiling on what they can produce.

A thin, inconsistent or poorly described system gives an agent little to work with. A well-made one, with clear components and clear rules, gives it a great deal.

The same catalogue handles input too. The date and the choice below are bound to the surface's data model, so whatever you pick travels back with the action.

{{a2ui product}}

## What this asks of your system

If you want to be ready for this, the work is familiar. It's the same work that helps AI tools prototype well today.

![Checklist of what A2UI asks of a design system: a limited set of components, self-describing components, purpose-named tokens, built-in states, platform parity, written guidance.](/figures/a2ui-and-the-future-of-interfaces/what-a2ui-asks.png "wide: What A2UI asks of your design system.")

- **A clear, limited set of components.** A catalogue is a list. Three slightly different cards make an agent's choice harder and the result less consistent.
- **Components that describe themselves.** The agent chooses from the catalogue based on names, properties and descriptions. "Use for a single choice from two to five options" helps it choose well.
- **Purpose-named tokens and themes.** The agent doesn't pick colours. Your renderer does. That only works if components take their appearance from tokens.
- **Every state handled inside the component.** Loading, empty, error, disabled. The agent won't design these. The component has to bring them.
- **Parity across platforms.** If the same description is to render on web, iOS and Android, each platform needs the same components under the same names.
- **Written guidance.** How components combine, and which combinations to avoid.

In our work with BrightLocal, one strand is improving how product and design teams use AI, by making design system documentation work for people and AI agents alike. That work is aimed at how teams design and prototype today. But documentation that an agent can read and follow is the same foundation an approach like A2UI depends on.

## What stays the designer's job

A composed interface still has to be designed. The work moves to different places.

- **Deciding what's in the catalogue.** What an agent can and can't show is a product decision.
- **Designing the components to work in combinations nobody planned.** A card has to look right next to things you didn't anticipate.
- **Setting the rules.** What needs confirmation? What should never be shown together? When should the agent hand over to a fixed, carefully designed screen?
- **Reviewing what gets composed.** Someone still has to look at real output and judge it.

Some things probably shouldn't be composed on the fly at all. Regulated flows, payments, consent and anything where the exact wording and order matter are better as fixed screens that an agent can open but not rearrange.

## It's ready to use

A2UI has moved from version 0.9 to 1.0. The protocol is stable, there are renderers for the web, iOS and Android, and it runs over the transports agents already use, MCP included. That's the point at which it stops being an experiment to watch and becomes something to build on.

The open questions now are about craft rather than plumbing. How do you test an interface when no two screens are quite the same? How is accessibility checked across every combination an agent might compose? How do people feel about a screen that's shaped around what they just asked for? Those are design questions, and they're the reason design systems teams should be involved from the start.

The direction is clear: agents arranging trusted components, with your app in charge of how they look and behave.

## What to do now

You don't need to adopt anything yet. The useful preparation is work that pays off anyway.

- Tidy the component set. Fewer, clearer components.
- Write down what each one is for.
- Move every colour, size and space onto tokens.
- Build the states into the components.
- Read the A2UI documentation, and try describing one of your own screens as a list of your own components. The gaps show up quickly.

A good design system has always been a set of decisions made once and reused. If agents become one of the things reusing them, those decisions matter more.
