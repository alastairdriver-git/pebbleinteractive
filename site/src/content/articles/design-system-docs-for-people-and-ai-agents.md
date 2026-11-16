---
title: Design system docs for people and AI agents
description: Your design system documentation now has a second reader. What AI tools get wrong without it, what to write down, and why the same changes help people too.
series: AI in the design process
pubDate: 2027-02-09
draft: true
related: [brightlocal]
products: [design-system-health-check]
keywords: [design system documentation, AI agents, Storybook, usage guidance, design tokens, AI in design]
---

Design system documentation used to have one kind of reader: a designer or developer with a question. Now it has two. AI tools read it as well, every time someone asks them to build a screen.

The two readers behave differently. A person skims, looks at the pictures and asks a colleague when something is unclear. An AI agent reads every word it's given, takes it literally and never asks. If the answer isn't written down, it makes one up, and it does so confidently.

That changes what good documentation looks like.

## What agents get wrong without it

Give an AI tool your component library with no guidance and the results are predictable. These are general failings, and we see them often.

- **It invents components.** If the tool doesn't know you have an empty state component, it writes a new one. Then another on the next screen.
- **It uses raw values.** Without token names and their purposes, you get hex colours and pixel values that are close to yours but not the same.
- **It picks the wrong variant.** A primary button for a destructive action. Three primary buttons on one screen. The component exists, but nothing told the tool which one fits.
- **It guesses the API.** Property names that seem reasonable but aren't yours, or that belonged to an older version.
- **It skips the quiet parts.** Labels, focus order, error messages and loading states get left out unless something says they're required.
- **It copies whatever it finds.** If the repository contains old patterns, the tool treats them as examples to follow.

None of this is the tool being careless. It is filling gaps. The gaps are in the documentation.

## Most of what matters was never written down

Every design system has two layers of knowledge. The first is what exists: components, properties, tokens. Most teams document that reasonably well, often automatically.

The second layer is judgement. When to use a modal and when a new page. Why there's only one primary action per view. What to do when a table has too many columns. This layer mostly lives in people's heads and in old chat threads. New starters pick it up by asking around.

An AI agent can't ask around. So the work is to move the second layer into writing.

In our work with BrightLocal, one strand is exactly this: improving how product and design teams use AI, by making design system documentation work for people and AI agents alike. It sits next to another strand, where prototypes are reviewed like code in the design system repository with usage guidance written into Storybook. The two support each other. Review is where missing guidance gets noticed, and Storybook is where it gets written down.

<!-- ALI: add a specific before and after from BrightLocal: a piece of guidance that was added, and what the AI tools did differently once it was there -->

## What to write

For each component, a short page that answers the same questions in the same order.

- **What it's for.** One sentence.
- **When to use it.** The situations it was designed for.
- **When not to, and what to use instead.** This is the most useful line on the page for an AI tool. "Don't use a modal for forms with more than a few fields. Use a page."
- **Variants and what each means.** Not only that `secondary` exists, but when to choose it.
- **Content rules.** Label length, tone, capitalisation, what an error message should contain.
- **Accessibility requirements.** What must always be present: a label, a text alternative, a focus state.
- **A correct example.** Real code, using real property names, that someone could copy.
- **A common mistake.** Show the wrong way and say why it's wrong.

Beyond individual components, three more things earn their place.

- **Token purposes.** A table of each token and what it's for. `surface` is the page background; `muted` is for secondary text. Names by purpose do half this work for you.
- **Composition patterns.** How components fit together into a form, a list page, a settings screen. One good composed example teaches more than a page of rules.
- **A short set of always and never rules.** Always use tokens for colour. Never write a new component without checking the library. Keep it to a page.

## How to write it

**Use plain text, in the repository.** Markdown next to the code is easy for people and for tools to read, and it gets updated in the same pull request as the component. A slide deck or PDF is neither easy to read nor likely to be kept up to date.

**Be literal.** "Use sparingly" means nothing to a machine and little to a person. "No more than one per screen" can be followed and checked.

**Put the rule first.** Lead with the instruction, then the reason. Both readers get what they need in the first line.

**Keep it short.** AI tools can only take in so much at once, and people take in less. A focused page for each component beats one enormous guide.

**Remove or mark anything out of date.** If an old pattern has to stay in the codebase, label it clearly as deprecated and say what replaced it.

**Don't describe things only in pictures.** A screenshot of a good layout helps a person. An agent needs the same thing in words or code.

## Test it like a new starter would

There's a simple way to find out whether your documentation is good enough. Give an AI tool the docs and a realistic task, such as "build a page that lists a business's reviews with filters", and read what comes back.

Every mistake points to a gap. If the tool used the wrong button variant, the guidance on variants isn't clear. If it invented a filter bar, the composition pattern is missing. Fix the documentation, not the output, and run the task again.

This is the same loop as reviewing a new colleague's first piece of work, only faster. There's more on what a design system gives an AI tool in [why AI prototyping needs a design system](/articles/why-ai-prototyping-needs-a-design-system).

## One set of docs, not two

It's tempting to keep one set of documentation for people and a separate file of instructions for AI tools. We'd avoid that. Two sources drift apart, and soon nobody knows which is right.

Write one set, clearly enough for the more literal reader. Everything in the list above, covering when to use something, what to use instead, real examples and plain rules, is what human readers have always wanted from design system docs and rarely got. AI tools have given teams a practical reason to finally write it.

## What to take from this

- Assume your documentation will be read literally by something that can't ask questions.
- Write down judgement, not just inventory: when, when not, and what instead.
- Keep it in plain text, beside the code, in a consistent shape.
- Test it by giving a tool a real task and treating each mistake as a documentation bug.
- Keep one source for both readers.
