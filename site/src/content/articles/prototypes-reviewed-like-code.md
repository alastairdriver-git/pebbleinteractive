---
title: Prototypes reviewed like code
description: What happens when prototypes live in the design system repository and go through pull requests, with usage guidance in Storybook. What it changes for designers and for developers.
series: Design systems in practice
pubDate: 2026-11-16
draft: false
related: [brightlocal]
products: [advanced-design-system-audit, design-system-health-check]
keywords: [prototyping, pull requests, design to code, Storybook, design system repository, design handoff]
---

The traditional handoff works like this. A designer finishes a file and shares a link. Some time later a developer opens it, measures things, and builds what they think it shows. The questions that matter, such as "do we have that component?" and "what happens when this list is empty?", turn up weeks after the design was agreed.

By then the answers are expensive. Either the build bends to fit the design, or the design is quietly changed in code and the file stops being true.

There is a simpler arrangement. Put the prototype where the code lives and review it the way code is reviewed.

## What we do at BrightLocal

BrightLocal is a UK local SEO platform that is rebuilding its product. We're embedded in its Product Design team, building working prototypes across the product, from listings and Location Manager to reviews, so teams can test new directions before committing engineering time.

![BrightLocal Location Manager screen map showing every screen and the routes between them](/work/brightlocal/bl-screen-map.jpg "wide: A BrightLocal screen map: every screen and the routes between them, platform by platform.")

One strand of that work is about how design reaches code. Prototypes are reviewed like code in the design system repository, with usage guidance written into Storybook. It's a way of working the in-house team now shares.

The rest of this article is about what that arrangement involves and what it changes.

## What "reviewed like code" means

It comes down to three things.

**The prototype is made from the real system.** It uses the actual components and tokens, not drawings of them. That only works if the prototype sits in, or right next to, the design system itself.

**Changes arrive as pull requests.** A pull request is a proposal: here is what I changed, and here is why. Other people read it, comment on specific lines and approve it or ask for changes. Nothing is merged until someone else has looked.

**Guidance lives beside the components.** Storybook is a tool that shows each component on its own, in each of its states. Writing usage guidance there, covering when to use a component, when not to, and what to use instead, puts the advice in the place people look when they are building.

## What changes for designers

**Feedback comes earlier and is more specific.** A comment on a pull request points at a particular thing. "This table uses a custom header, can it use the standard one?" is more useful than a general reaction in a meeting, and it arrives while the idea is still cheap to change.

**You find out what's feasible while you can still act on it.** Developers reviewing the prototype can see exactly which components it uses and spot anything new before it's built.

**You write down why.** A pull request needs a description. Having to explain a change in a few plain sentences is a useful discipline. It also leaves a record, so in six months someone can find out why the filter moved.

**You don't need to be an engineer.** The prototype doesn't have to be production quality. It has to be made from the right parts. AI coding tools have made this much more practical for designers than it was a few years ago, as long as there is a design system to keep the output honest. We covered that in [why AI prototyping needs a design system](/articles/why-ai-prototyping-needs-a-design-system).

**There is one version.** No more "final_v3" files. The repository has a history, and the main branch is the truth.

## What changes for developers

**You see design before it's a ticket.** Reviewing a prototype is a chance to raise a concern when it costs a comment, not a sprint.

**New components are visible.** If a design needs something the system doesn't have, it shows up in the changes. That starts the right conversation: do we add it to the system, or can an existing component do the job?

**Less guessing.** A prototype built from real components answers most of the questions a static file leaves open. Spacing, states and responsive behaviour are there to inspect.

**The guidance is where you work.** Usage notes in Storybook sit next to the component and its code, so you don't have to hunt through a separate document that may be out of date.

## What it doesn't mean

It's worth being clear about the limits.

![Comparison of what pull request review catches (wrong components, missing states, values outside the tokens, accessibility basics) and what still needs design critique.](/figures/prototypes-reviewed-like-code/review-vs-critique.png "wide: Review catches the wrong parts. Critique asks if it's the right idea.")

- **Prototype code isn't production code.** It proves a direction. It usually still needs to be built properly, with real data, tests and error handling.
- **Review shouldn't slow exploration.** Early ideas can be rough and plentiful. The pull request is for the direction you want others to take seriously.
- **Code review isn't a design critique.** A pull request is good at catching wrong components and missing states. It's less good for asking whether this is the right idea at all. Keep doing research and critique as well. At BrightLocal the prototypes sit alongside ongoing research into usability and feasibility, not in place of it.
- **Developers aren't the only reviewers.** Designers should review each other's prototypes in the same place.

## How to start

You don't need to change everything at once.

![Six steps: pick one flow, give prototypes a home, write a pull request template, agree what review covers, add guidance as you go, make it easy to look.](/figures/prototypes-reviewed-like-code/how-to-start.png "wide: Six steps to start reviewing prototypes like code.")

1. **Pick one flow.** Choose something real but contained, and prototype it with your actual components.
2. **Give prototypes a home.** A clearly named folder in the design system repository, or a sibling repository that depends on it, kept apart from production code.
3. **Write a short pull request template.** What is this for? What changed? Which components are new or used in a new way? What should reviewers look at?
4. **Agree what review covers.** For prototypes: correct components and tokens, states, accessibility basics and anything that looks hard to build. Not code style.
5. **Add guidance as you go.** Every time a review comment explains how a component should be used, move that sentence into Storybook.
6. **Make it easy to look.** Reviewers should be able to open a running version of the prototype without setting anything up. A preview link on each pull request does this.

## Why it's worth it

The main benefit is that designers and developers are looking at the same thing, at the same time, in the same place. Disagreements show up early, in writing, next to the thing being discussed.

It also builds up. Each review leaves the system slightly better documented than before, and the next prototype starts from that. The outcome we care about is a client team that can carry on without us, with a shared prototype workflow and guidance to work from.

If your handoff still depends on someone reading a file and guessing, try one flow this way and see what the first review turns up.
