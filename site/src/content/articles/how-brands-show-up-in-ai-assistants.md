---
title: How brands show up in ChatGPT, Gemini, Claude and Perplexity
description: Where AI assistants get their answers about businesses, which ones now sell ads, the listings and data that feed them, who is measuring it, and what to do first. Checked against primary sources in November 2026.
series: AI in the design process
pubDate: 2026-11-16
draft: false
products: [design-system-mcp-guide, mcp-for-designers]
keywords: [AI visibility, generative engine optimisation, GEO, AEO, ChatGPT, Google AI Mode, AI Overviews, Gemini, Claude, Perplexity, Copilot, Google Business Profile, llms.txt, structured data]
---

When someone asks an AI assistant about a business, the answer mostly comes from a live web search run at that moment, not from what the model memorised in training. So the way into ChatGPT, Gemini, Claude, Perplexity and Copilot runs through the sources those searches read: business listings, review sites, merchant feeds and your own pages. Several assistants now sell ads. Every company that does says ads sit apart from the answer and can't buy a place in it.

This area changes month to month. Everything below was checked on 16 November 2026, each claim links to its source with a date, and where something is reported but not confirmed by the company, we say so.

## Training data and live search

An assistant has two ways of knowing about you. The first is training data: what the model absorbed from the web before its cut-off. That is slow to change, and you can't edit it. The second is retrieval: a search the assistant runs while it answers, with links to what it read.

The crawlers make the split visible. OpenAI runs [GPTBot for training and OAI-SearchBot for search](https://developers.openai.com/api/docs/bots), and says sites that block OAI-SearchBot won't be shown in ChatGPT search answers. Anthropic separates [ClaudeBot (training), Claude-User (fetching pages when a person asks) and Claude-SearchBot (search quality)](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler). Google uses Googlebot for Search, and a separate Google-Extended control for training some other AI systems.

For questions like "a good accountant near me" or "best running shoes for flat feet", retrieval does most of the work. That is the part a business can influence this year.

## How each assistant finds and chooses

### ChatGPT

OpenAI said at [the launch of ChatGPT search (October 2024)](https://openai.com/index/introducing-chatgpt-search/) that it draws on third-party search providers and content from partners. Its help pages name Bing only for Enterprise and Edu workspaces; for consumer ChatGPT it doesn't say which providers it uses, and commentators who say "it's Bing" are inferring.

Local answers now have a named source. In July 2026 [Yelp agreed to license reviews, ratings, photos and business details to OpenAI](https://searchengineland.com/openai-yelp-deal-483326) for ChatGPT's local answers, as first reported by Axios. The deal is non-exclusive. Many guides also say ChatGPT uses Foursquare for places data; we couldn't find OpenAI confirming that.

On 10 November 2026 OpenAI launched [Businesses in ChatGPT](https://openai.com/index/introducing-businesses-chatgpt/) in beta. A business claims its listing in Business Hub, verifies it ([by text or call to the main number, or by DNS](https://www.seroundtable.com/chatgpt-business-hub-42505.html)), edits its details, adds product feeds with prices and availability, and sees aggregated mentions, website clicks and topics. Business Agents, which let people chat with a brand, start with eligible US ecommerce and online service businesses. OpenAI hasn't said whether claiming a profile changes how often ChatGPT recommends you. Shops can also apply to send a product feed through [ChatGPT merchants](https://chatgpt.com/merchants).

### Google: AI Overviews, AI Mode and Gemini

Google is the clearest about its rules. Its [AI features guide (updated 10 December 2025)](https://developers.google.com/search/docs/appearance/ai-features) says AI Overviews and AI Mode use the normal Search index, with a "query fan-out" that runs several related searches. There are no extra requirements: a page needs to be indexed and eligible for a snippet.

Its [guide to generative AI features (updated 10 July 2026)](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) adds that Merchant Center feeds and Google Business Profile help products and services appear in AI responses, and that structured data isn't required, though it should match the visible page.

The Gemini app grounds answers in Google Search, and developers can ground Gemini in [Google Maps data covering more than 250 million places (October 2025)](https://blog.google/technology/developers/grounding-google-maps-gemini-api/). For a local business, that makes Google Business Profile the single most important listing for Google's assistants.

### Claude

Claude searches the web when it needs current information. Anthropic's product pages don't name a search provider, but its subprocessor list has included [Brave Search for web search since March 2025](https://simonwillison.net/2025/Mar/21/anthropic-use-brave/), and early tests matched Claude's citations to Brave's results. Anthropic also runs its own Claude-SearchBot crawler. We found no documented local business or merchant programme for Claude.

### Perplexity

Perplexity runs its own index. Its [research team described it in September 2025](https://research.perplexity.ai/articles/architecting-and-evaluating-an-ai-first-search-api) as tracking over 200 billion URLs, ranked at the level of passages rather than whole pages. For travel, it has a [Tripadvisor partnership (January 2025)](https://skift.com/2025/01/14/tripadvisor-exec-explains-partnership-with-chatgpt-competitor-perplexity/) that puts Tripadvisor ratings and review summaries into hotel results. For shopping it launched a free [Merchant Program (November 2024)](https://www.perplexity.ai/hub/blog/shop-like-a-pro) and [Instant Buy with PayPal](https://www.perplexity.ai/help-center/en/articles/12932923-instant-buy-buy-with-paypal) for US users. One blog says Perplexity also licenses Yelp data; we couldn't confirm it.

### Microsoft Copilot

Copilot is grounded in Bing. Local details come from [Bing Places](https://support.microsoft.com/en-us/topic/add-and-manage-your-business-listing-294b53b9-6132-4012-b37a-0bc3e40b794b), and products from Microsoft Merchant Center. In January 2026 Microsoft launched [Copilot Checkout and Brand Agents](https://about.ads.microsoft.com/en/blog/post/january-2026/conversations-that-convert-copilot-checkout-and-brand-agents), for US merchants first.

Microsoft was also the first to give site owners citation data for free. The [AI Performance report in Bing Webmaster Tools (February 2026)](https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/) shows how often your pages are cited in Copilot and Bing's AI summaries, and in [June 2026 it added intents, topics and citation share](https://blogs.bing.com/search/2026/6/New-AI-Visibility-Insights-in-Bing-Webmaster-Tools-Intents-Topics-Citation-Share-Compare/).

https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/

## At a glance

| Assistant | Where answers come from | Local and product data | Ads (November 2026) |
| --- | --- | --- | --- |
| ChatGPT | Model plus web search via third-party providers and OpenAI's own crawler | Yelp (licensed, July 2026); Business Hub profiles (beta); merchant product feeds | Yes, on Free and Go plans, labelled sponsored, below the answer |
| Google AI Overviews and AI Mode | Google's Search index, with query fan-out | Google Business Profile, Maps, Merchant Center | Yes, labelled "Sponsored"; not yet in the UK |
| Gemini app | Model plus Google Search | Google Search and Maps | None; Google hasn't ruled them out |
| Claude | Model plus web search (Brave listed as a subprocessor) | None documented | None; Anthropic has pledged to stay ad-free |
| Perplexity | Its own index | Tripadvisor (hotels), merchant feeds, PayPal | Sponsored questions ended; reportedly no ads now |
| Microsoft Copilot | Bing index | Bing Places, Microsoft Merchant Center | Yes, below the answer, labelled |

## Paid and organic

![Paid placements compared with organic answers across the main AI assistants.](/figures/how-brands-show-up-in-ai-assistants/paid-and-organic.png "wide: What money can and can't buy, according to the companies themselves.")

**ChatGPT.** OpenAI announced [its approach to advertising](https://openai.com/index/our-approach-to-advertising-and-expanding-access/) in January 2026, with "answer independence" as a principle: ads don't influence answers, are labelled and sit below the response. Ads appear for logged-in adults on the Free and Go plans, not on paid plans. Trade press reports a US launch in February 2026, a [self-serve Ads Manager](https://openai.com/index/new-ways-to-buy-chatgpt-ads/) from May, and [UK ads from mid-2026](https://ppc.land/chatgpt-ads-go-live-in-the-uk-as-openai-expands-pilot-beyond-us/). One analyst points out that OpenAI's promise covers the answer, and says nothing either way about which sources get cited.

**Google.** Ads in AI Overviews and AI Mode are labelled "Sponsored" and come from existing Search, Shopping and Performance Max campaigns. On [28 October 2026 Google expanded AI Mode ads to ten more countries](https://blog.google/products/ads-commerce/ads-in-ai-mode-global/), started ads in follow-up questions in the US, and said the UK would follow in Q4 2026. [AI Overviews ads reached 12 countries in December 2025](https://www.seroundtable.com/google-expands-ads-in-ai-overviews-40629.html), not including the UK. Google's long-standing position is that [buying ads has no effect on organic ranking](https://www.google.com/intl/en_uk/search/howsearchworks/our-approach/ads-on-search/). The Gemini app has no ads; Google said in April 2026 it was open to exploring them.

https://blog.google/products/ads-commerce/ads-in-ai-mode-global/

**Claude.** Anthropic said in [Claude is a space to think (February 2026)](https://www.anthropic.com/news/claude-is-a-space-to-think) that Claude won't carry ads or sponsored links, and that advertisers won't influence answers.

**Perplexity.** It ran sponsored follow-up questions from November 2024, stopped taking new advertisers in late 2025 and in February 2026 its executives told the Financial Times, as reported by trade press, that it was leaving advertising. We couldn't find a Perplexity statement confirming this.

**Copilot.** Microsoft places ads [below Copilot's organic response](https://about.ads.microsoft.com/en/blog/post/march-2025/transforming-the-future-of-audience-engagement) and says organic responses are never influenced by sponsored content.

All of these are the companies' own statements. Nobody outside them can audit it.

## The listings and data that feed AI answers

![Six sources that feed AI answers about businesses: Google Business Profile, Bing Places, Apple Business, Yelp and review sites, merchant feeds, your own website.](/figures/how-brands-show-up-in-ai-assistants/where-answers-come-from.png "wide: Where AI assistants get their facts about a business.")

- **Google Business Profile.** Feeds Search, Maps, AI Overviews, AI Mode and Gemini. In a [BrightLocal study of 200,000 local AI searches (September 2026)](https://www.brightlocal.com/research/local-ai-visibility-study/), Google Business Profile was the most-cited source, at 28.6% of citations, with Yelp second at 9.5%.
- **Bing Places.** Feeds Bing and Bing Maps. Microsoft's help pages don't spell out the Copilot link, but Copilot is grounded in Bing.
- **Apple Business** (formerly Business Connect). Controls your place card in Apple Maps, Siri and Safari.
- **Yelp.** Now licensed to OpenAI. Worth claiming even if you never look at it.
- **Tripadvisor.** Feeds Perplexity's hotel results; important for travel and hospitality.
- **Foursquare.** Often said to feed ChatGPT; unconfirmed by OpenAI. Cheap to keep accurate anyway.
- **Reddit and Wikipedia.** [Google](https://blog.google/inside-google/company-announcements/expanded-reddit-partnership/) and [OpenAI](https://openai.com/index/openai-and-reddit-partnership/) both signed Reddit data deals in 2024, and Wikipedia sits in most training sets. Neither can be bought. Being discussed accurately there comes from being worth discussing.
- **Merchant feeds.** Google Merchant Center, Microsoft Merchant Center, ChatGPT merchants and Perplexity's programme all take structured product data.
- **Structured data.** schema.org JSON-LD for your organisation, locations, products and reviews. Google says it isn't required for AI features but must match the page; it helps every system read facts without guessing.
- **llms.txt.** A proposed plain-text map of your site for language models. Google says [Search ignores it](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide), and [Ahrefs found that 97% of llms.txt files got no requests at all in May 2026](https://ahrefs.com/blog/llmstxt-study/). It's cheap and harmless, but don't expect it to move anything yet.

The [Google guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) is the clearest single statement from any of the companies, and worth reading in full.

https://developers.google.com/search/docs/fundamentals/ai-optimization-guide

## Who is working on measuring it

A category of tools now runs prompts through the assistants and reports where you appear. Most work the same way: you choose prompts, the tool runs them repeatedly and reports mentions, citations, position and share of voice against competitors. Each description below is from the company's own site, November 2026.

- **[Profound](https://www.tryprofound.com/)**: prompt volumes, citation analytics, visibility scores and AI crawler analytics, across ten or so engines, plus agents that draft content.
- **[Peec AI](https://peec.ai/)**: visibility, position and sentiment tracking for ChatGPT, Gemini, Perplexity and AI Mode, with source tracking and an API.
- **[Otterly.ai](https://otterly.ai/)**: brand and citation monitoring across seven engines including Copilot, with content audits.
- **[Scrunch](https://scrunch.com/)**: monitoring, plus an "Agent Experience Platform" that serves a simplified version of your site to AI crawlers.
- **[AthenaHQ](https://www.athenahq.ai/)**: monitoring, competitor tracking, hallucination detection and content recommendations.
- **[Semrush AI Visibility Toolkit](https://www.semrush.com/kb/1493-ai-visibility-toolkit)** and **[Ahrefs Brand Radar](https://ahrefs.com/brand-radar)**: AI visibility added to existing SEO suites, built on large prompt databases.
- **[Yext Scout](https://www.yext.com/platform/scout)** and **[BrightLocal Local AI Visibility](https://www.brightlocal.com/local-seo-tools/local-ai-visibility/)**: local, per-location tracking from listings platforms. BrightLocal's page says it currently covers Google AI Overviews, AI Mode and ChatGPT, up to 20 prompts per location.

Here is the kind of report these tools produce, drawn live from our own A2UI catalogue. The business and every figure in it are made up. Switch to **Messages** to see what an agent would send to draw it.

{{a2ui visibility}}

Two free sources are first-party: Bing's AI Performance report and OpenAI's Business Hub insights. Google counts AI Overviews and AI Mode traffic inside the normal Search Console totals, without a separate breakdown.

Treat every number with care. [SparkToro's January 2026 study](https://sparktoro.com/blog/new-research-ais-are-highly-inconsistent-when-recommending-brands-or-products-marketers-should-take-care-when-tracking-ai-visibility/) found ChatGPT and Google's AI returned the same list of brands less than once in a hundred runs, and BrightLocal's study found only 20 to 33% overlap between repeat local searches. Rand Fishkin's conclusion is that position in a list is close to meaningless, while how often you appear across many runs can be measured. For further reading, Mike King's [AI Search Manual](https://ipullrank.com/ai-search-manual) and Aleyda Solis's [AI search optimisation checklist](https://aleydasolis.com/en/ai-search/ai-search-optimization-checklist) are both thorough and free.

## What to do, in order

![A prioritised checklist for AI visibility, from claiming listings to measuring.](/figures/how-brands-show-up-in-ai-assistants/what-to-do.png "wide: The order we'd work in.")

1. **Claim and complete your listings.** Google Business Profile, Bing Places, Apple Business, Yelp, and Tripadvisor if you're in travel or hospitality. If you're eligible, claim your business in ChatGPT's Business Hub.
2. **Make the facts match everywhere.** Name, address, phone, hours, categories and prices, identical across listings and your site. Assistants combine sources, and conflicts turn into wrong answers.
3. **Earn reviews, and reply to them.** Reviews are a large share of what local answers cite.
4. **Send product feeds** if you sell online: Google and Microsoft Merchant Center first, then ChatGPT and Perplexity.
5. **Add structured data** that matches each page: Organization, LocalBusiness, Product, and FAQPage where you genuinely have questions and answers.
6. **Write answer-first pages.** Put the plain answer in the opening lines, in text rather than images, and keep prices and specifications on the page.
7. **Get cited by what AI reads.** Accurate coverage in trade press, comparison articles, directories and forums matters more than anything you publish about yourself.
8. **Don't block the search crawlers** (OAI-SearchBot, Claude-SearchBot, PerplexityBot, Bingbot, Googlebot) unless you mean to. You can block training separately.
9. **Measure across many runs.** Start with Bing Webmaster Tools and Search Console, add a tracking tool if the budget is there, and watch trends rather than single answers.

## Making design system and product docs readable by AI

The same principle applies to documentation. Coding assistants and agents read design system and product docs constantly, usually by fetching a page when someone asks. Heavy client-side pages, tabs and screenshots read badly. Plain text reads well.

The practical steps are small. Offer a Markdown version of each page. List those pages in an llms.txt file. Add JSON-LD so the facts are explicit. And for a design system, an MCP server gives an agent structured access to components and tokens rather than leaving it to scrape a website. We covered the writing side in [design system docs for people and AI agents](/articles/design-system-docs-for-people-and-ai-agents).

## What we did on our own site

We've just made these changes to pebbleinteractive.com:

- **Every article and product has a Markdown version.** Add `.md` to the address, for example [/articles/a2ui-and-the-future-of-interfaces.md](https://www.pebbleinteractive.com/articles/a2ui-and-the-future-of-interfaces.md). Each page links to its Markdown version in its `<head>`.
- **[/llms.txt](https://www.pebbleinteractive.com/llms.txt)** says what Pebble does and lists every case study, article and product with a one-line summary, pointing to the Markdown versions.
- **JSON-LD on every page**: the organisation, the website, breadcrumbs, and the page's own type, such as BlogPosting or Product.
- **FAQPage markup on product pages.** Google has shown [FAQ rich results only for well-known government and health sites since 2023](https://developers.google.com/search/blog/2023/08/howto-faq-changes), so this isn't for a search feature. It's there because a question and its answer, marked up as such, is about as unambiguous as data gets.
- **A sitemap**, linked from llms.txt.

It's too early to say whether any of this changes how often assistants mention us, and the llms.txt evidence suggests that file alone won't. We did it because it was a day's work, it helps the agents and coding tools that already fetch our pages, and it's the same thing we recommend to clients for their design system docs.

## Sources

All checked on 16 November 2026.

- OpenAI, [Introducing ChatGPT search](https://openai.com/index/introducing-chatgpt-search/), October 2024
- OpenAI, [Overview of OpenAI crawlers](https://developers.openai.com/api/docs/bots), undated, current
- OpenAI, [Our approach to advertising](https://openai.com/index/our-approach-to-advertising-and-expanding-access/), January 2026
- OpenAI, [New ways to buy ChatGPT ads](https://openai.com/index/new-ways-to-buy-chatgpt-ads/), May 2026
- OpenAI, [Introducing Businesses in ChatGPT](https://openai.com/index/introducing-businesses-chatgpt/), 10 November 2026
- Search Engine Land, [ChatGPT gains access to Yelp reviews](https://searchengineland.com/openai-yelp-deal-483326), July 2026
- Search Engine Roundtable, [Business Hub live with click data](https://www.seroundtable.com/chatgpt-business-hub-42505.html), 10 November 2026
- Google Search Central, [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features), updated 10 December 2025
- Google Search Central, [Optimizing for generative AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide), updated 10 July 2026
- Google, [Ads in AI Mode expand to 10 new countries](https://blog.google/products/ads-commerce/ads-in-ai-mode-global/), 28 October 2026
- Google, [Grounding with Google Maps in the Gemini API](https://blog.google/technology/developers/grounding-google-maps-gemini-api/), October 2025
- Anthropic, [Claude is a space to think](https://www.anthropic.com/news/claude-is-a-space-to-think), 4 February 2026
- Anthropic, [Does Anthropic crawl data from the web?](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler), current
- Simon Willison, [Anthropic uses Brave for web search](https://simonwillison.net/2025/Mar/21/anthropic-use-brave/), March 2025
- Perplexity, [Architecting an AI-first search API](https://research.perplexity.ai/articles/architecting-and-evaluating-an-ai-first-search-api), September 2025
- Perplexity, [Shop like a pro](https://www.perplexity.ai/hub/blog/shop-like-a-pro), November 2024
- Skift, [Tripadvisor's partnership with Perplexity](https://skift.com/2025/01/14/tripadvisor-exec-explains-partnership-with-chatgpt-competitor-perplexity/), January 2025
- Microsoft Advertising, [Copilot Checkout and Brand Agents](https://about.ads.microsoft.com/en/blog/post/january-2026/conversations-that-convert-copilot-checkout-and-brand-agents), January 2026
- Bing, [AI Performance in Bing Webmaster Tools](https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/), February 2026
- BrightLocal, [Local AI visibility study](https://www.brightlocal.com/research/local-ai-visibility-study/), September 2026
- SparkToro, [AIs are highly inconsistent when recommending brands](https://sparktoro.com/blog/new-research-ais-are-highly-inconsistent-when-recommending-brands-or-products-marketers-should-take-care-when-tracking-ai-visibility/), January 2026
- Ahrefs, [97% of llms.txt files never get read](https://ahrefs.com/blog/llmstxt-study/), June 2026
