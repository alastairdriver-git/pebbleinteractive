---
title: The designer as editor
description: AI makes options cheap, so judgement becomes the scarce skill. A practical checklist for reviewing AI-generated screens, copy and code before anyone else sees them.
series: Curating AI output
pubDate: 2026-11-16
draft: false
related: [brightlocal, glint]
products: [design-system-health-check]
keywords: [AI design review, design judgement, curating AI output, design systems, prototyping, design critique]
---

Ask an AI tool for a dashboard and you'll get one. Ask again and you'll get another. By the time you've finished your tea there are ten, and every one of them looks finished.

That's new. For most of the history of product design, the slow part was making the thing. Now the slow part is deciding which of the things is right, and what is wrong with it. The work has moved from the pen to the red pen.

We think the best description of that job is editor.

## What an editor does

A good editor doesn't write the book. They read it harder than anyone else will. They cut what isn't earning its place, check the facts, hold the piece to a house style and send it back when it isn't good enough. Most of all, they represent the reader, who isn't in the room.

That maps closely onto reviewing AI output. The tool produces a draft. The designer's job is to read it properly, on behalf of the person who will use it, and to be willing to say no.

The difficulty is that AI drafts are fluent. A wireframe with rough edges invites criticism. A polished screen with a pleasant palette invites a nod. The polish is the same whether the thinking behind it is sound or not, so you can't use it as a signal. You have to check.

## Start with something to edit against

An editor without a brief or a house style is only giving opinions. The same is true here. Before you review anything, you need two things written down: what the screen is for, and what your system allows.

In our work with BrightLocal, prototypes start from requirement documents, an expert UX audit and BrightLocal's own design system. When a generated screen comes back, there is something to hold it up against. Does it meet the requirement? Does it deal with the problem the audit found? Is it made from the system's components, or has it invented its own?

At Glint, the onboarding flow for business accounts was built from the compliance officer's data-capture specification, and it branches on business type to meet US and UK ownership rules. No amount of taste tells you whether that flow is right. The specification does. A tool can draft a tidy, plausible onboarding form in seconds. Only a person reading it line by line against the spec can say that it asks the right questions of the right kind of business.

## A checklist for screens

Run through these before you show a generated screen to anyone.

- **Purpose.** Can you say in one sentence what the person is here to do? Is that the most obvious thing on the screen?
- **Inventions.** Is every component one you already have? AI tools like to add a new card style, a new badge, a new kind of button. Each one is a decision nobody made.
- **Tokens.** Do colour, type and spacing come from your tokens, or are they close but not the same? Near misses are the hardest to spot and the most expensive later.
- **States.** What does it look like empty, loading, failed, and with far too much content? Generated screens almost always show the happy middle.
- **Accessibility.** Does every control have a visible label? Is the contrast enough? Does the keyboard order make sense? Does anything rely on colour alone?
- **Content.** Is the data realistic? Short names and round numbers hide layout problems. We wrote more about this in [real data in prototypes](/articles/real-data-in-prototypes).
- **What's missing.** This is the editor's hardest question. The tool shows you what it made, not what it left out. Go back to the requirement and look for the thing that isn't there.

## A checklist for copy

AI copy is fluent in the same way AI screens are polished. It reads well and may say very little.

- **Is it true?** Check every claim, number and promise against something you trust. A tool will happily write "takes two minutes" about a form nobody has timed.
- **Is it plain?** Cut the warm-up sentence. Cut the adjectives. If a button says "Get started on your journey", it should probably say "Create account".
- **Is it consistent?** The same thing should have the same name on every screen. Generated copy drifts between "location", "business" and "listing" without noticing.
- **Does it help when things go wrong?** Error messages should say what happened and what to do next. Generated ones tend to apologise instead.
- **Is it yours?** Read it aloud next to copy you've already shipped. If it sounds like a different company, it is.

## A checklist for code

Designers don't need to be engineers to review prototype code, but they do need to look at it.

- **Does it use the real components?** Check the imports. A screen that looks like your design system but is built from its own markup and styles will have to be redone.
- **Are values hard-coded?** Raw hex colours and pixel values are a sign the tool has stepped outside the system.
- **Is it the right size?** A small change shouldn't arrive with a new dependency or five hundred lines nobody asked for.
- **Does it work without a mouse?** Tab through it. Try it at phone width. Try it with the text size turned up.
- **Could someone else follow it?** If you can't explain what a file does, a developer reviewing it will have the same problem.

At BrightLocal, prototypes are reviewed like code in the design system repository, which makes this kind of check routine rather than optional. There's more on why that matters in [why AI prototyping needs a design system](/articles/why-ai-prototyping-needs-a-design-system).

## Edit the system, not just the screen

When the same correction comes up three times, stop making it by hand. Write it down where the tool will read it: a line of usage guidance, a clearer token name, a worked example. Good editors keep a style guide for the same reason. It saves them from having the same argument every week.

This is where judgement compounds. A correction made on one screen fixes one screen. A correction made in the design system fixes every screen that comes after it, whoever or whatever makes it.

## What to take from this

- Generating is cheap. Reviewing is the work. Plan your time that way round.
- Never review against taste alone. Have the requirement and the system open beside the draft.
- Polish tells you nothing. Check states, labels, tokens and facts every time.
- Look for what's missing as well as what's wrong.
- Turn repeated corrections into written guidance.

The tools will keep getting better at producing drafts. That makes the person who can tell a good one from a plausible one more valuable, not less.
