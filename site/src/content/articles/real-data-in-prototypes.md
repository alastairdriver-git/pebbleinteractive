---
title: Real data in prototypes changes the conversation
description: People react differently to real numbers. Why we put public data into prototypes wherever we can, how to do it safely, and when sample data is the better choice.
series: AI in the design process
pubDate: 2026-11-16
draft: false
related: [glint, brightlocal]
products: [design-system-health-check]
keywords: [prototyping, real data, fintech design, user research, AI prototyping]
---

Show someone a prototype with "£1,234.56" in every balance and they'll talk about the layout. Show them the same screen with today's real price of gold, and they'll talk about whether they'd trust it with their money.

That second conversation is the one you want. It's also the one most prototypes never get to, because the data inside them is obviously fake.

## Fake data makes everything look fine

Placeholder content is designed to fit. Names are short, numbers are round, lists have exactly six items and nothing ever fails to load. Every screen looks balanced because the content was chosen to make it look balanced.

Real content isn't like that. Company names run to three lines. Prices have four decimal places in one currency and none in another. A wallet can be empty, or hold a tiny amount that rounds to zero. Charts have gaps on the days markets were closed.

You only find these things when real data arrives, and in most projects that happens after the design is signed off. That's the most expensive time to discover a problem.

## What we did at Glint

Glint is a gold and silver payments platform with its own Mastercard. When we designed and prototyped its business accounts for the UK and US, the portal needed to be good enough to show partners before anything was built.

So every price and chart in the prototype came from real, public market data. Wallets for gold, silver and US dollars were valued at real prices, and the buying and selling flows were priced with the same data.

That changed the conversations around the prototype in three ways:

- **People believed it.** A portal showing real prices reads as a product, not a mock-up. That matters when the audience is a potential partner rather than the internal team.
- **The edge cases showed up early.** Real prices exposed formatting, rounding and currency questions while they were still cheap to answer.
- **Feedback got specific.** Instead of "this looks good", people asked how a price was calculated and when it updated. Those are the questions that shape a financial product.

## Doing it safely

Real data doesn't mean customer data. The rule we follow is simple: **public data, yes; personal or client-confidential data, never.**

Market prices, exchange rates, public company registers, open government datasets and map data are all fair game. Anything that identifies a real customer, or that a client hasn't explicitly cleared for use, stays out.

A few practical habits help:

- **Cache a snapshot.** Prototypes get shown in meetings with bad Wi-Fi. Keep the last good copy of the data so the demo works offline.
- **Show where the data comes from.** A small "prices from…" note avoids anyone mistaking a prototype for a live service.
- **Check the terms.** Some public data is free to view but not to republish. A prototype shown privately is usually fine; a public demo might not be.
- **Fail visibly.** If the feed is down, say so on screen rather than quietly falling back to fake numbers.

## When sample data is the right choice

Real data isn't always possible, or right. For BrightLocal, whose product manages businesses' listings and reviews across platforms, the prototypes use sample data. The real thing would mean real businesses' details, and the value of the prototype lies in the workflow rather than in any particular business.

Good sample data borrows the awkwardness of the real thing: long names, missing fields, odd characters, a location with no reviews and one with thousands. If you have to make it up, make it up badly, on purpose.

## Where AI helps

This used to be a lot of work. Wiring a prototype to a live feed meant a developer, and a developer's time was the thing the prototype was meant to save.

AI tools have made it routine. Connecting a public API, shaping the response and handling the failure cases is now a short job, and generating realistic, messy sample data for the cases where real data isn't possible is even shorter.

Combined with a design system, which keeps the interface consistent while the data changes ([more on that here](/articles/why-ai-prototyping-needs-a-design-system)), it means a prototype can behave much more like the finished product, earlier, for very little extra effort.

The payoff is better conversations. People stop reviewing a picture and start reacting to a product, and that's when you find out whether you've built the right thing.
