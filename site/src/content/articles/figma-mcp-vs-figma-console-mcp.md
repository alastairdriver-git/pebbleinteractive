---
title: "Official Figma MCP vs Figma Console MCP: what we use each for"
description: Figma's own MCP server and Southleft's open-source Figma Console MCP overlap more than they used to, but they're built for different jobs. What each is good at, what they cost, and how we use them together in design system work.
series: AI in the design process
pubDate: 2026-11-16
draft: false
products: [design-system-mcp-guide, mcp-for-designers]
keywords: [Figma MCP, Figma MCP server, Figma Console MCP, Southleft, MCP, design tokens, Figma variables, Code Connect, design system audit, AI in design]
---

We use both, for different jobs. Figma's official MCP server is how we give an AI tool design context from a Figma file: the layout, the variables a frame uses, and the code components it maps to. Southleft's Figma Console MCP is how we manage variables and audit a design system file. They now overlap, since both can write to Figma, but each is stronger at its own end of the work.

Both tools change quickly. Everything below was checked against Figma's documentation and Southleft's repository and docs on 16 November 2026. If something doesn't match what you see, their docs win.

## Figma's official MCP server

Figma's server gives AI tools structured context from Figma files. Figma recommends the remote server, at `https://mcp.figma.com/mcp`, which doesn't need the desktop app and has the broadest set of tools. A desktop server, running through the Figma desktop app, exists for specific organisation and enterprise needs, and needs a Dev or Full seat on a paid plan.

The tools we reach for in design system work:

- `get_design_context` returns design context and code for a selection.
- `get_variable_defs` lists the variables and styles a selection uses.
- `get_screenshot` and `get_metadata` let the agent see a frame and its structure.
- `search_design_system` searches connected libraries for components, variables and styles.
- `get_code_connect_map` and `add_code_connect_map` connect Figma components to your code components through Code Connect.
- `create_design_system_rules` is a prompt that drafts a rules file for your repository.

Writing to the canvas is newer. The remote-only `use_figma` tool runs Plugin API code in your file, so an agent can create frames, components, variants, variables and auto layout using the libraries you already have. Figma describes it as beta, free during the beta, and a usage-based paid feature later. Its own docs say the output "may need manual review and cleanup", and suggest trying it on a duplicate file first.

https://developers.figma.com/docs/figma-mcp-server/

## Figma Console MCP

[Figma Console MCP](https://github.com/southleft/figma-console-mcp) is an open-source server by Southleft, under the MIT licence, and not affiliated with Figma. It's built around design system operations. It talks to Figma through a Desktop Bridge plugin running inside Figma Desktop, over a WebSocket, alongside Figma's REST API.

It runs in a few modes. Local mode, through `npx`, is the full set: 130 tools in version 1.46.0, including live console logs and extracting a design system from a codebase. It needs Node.js, Figma Desktop and a Figma personal access token. Cloud mode works with web-based AI tools once the plugin is paired, with 105 tools and no real-time monitoring. A hosted remote mode is read-only until the plugin is paired.

The parts we use most:

- **Variables.** `figma_setup_design_tokens` creates a collection, its modes and its variables in one call. `figma_batch_create_variables` and `figma_batch_update_variables` handle up to 100 at a time. `figma_export_tokens` and `figma_import_tokens` move tokens between Figma and code.
- **Audits.** `figma_audit_design_system_report` gives a scored health check of a file. `figma_audit_component_accessibility` and `figma_lint_design` check components and frames.
- **Parity.** `figma_check_design_parity` compares a Figma component with its code.
- **Documentation.** `figma_generate_component_doc` drafts a component page.
- **Anything else.** `figma_execute` runs Plugin API code, the same idea as `use_figma`.

One practical difference: Southleft notes that Figma's Variables REST API needs an Enterprise plan. Console MCP reads and writes variables through the plugin instead, so its variable tools work on any plan.

https://github.com/southleft/figma-console-mcp

## Where they overlap, and where they don't

![What each server is best at: the official Figma MCP for design context, Code Connect and library search; Figma Console MCP for managing variables in bulk, design system health audits and design and code parity.](/figures/figma-mcp-vs-figma-console-mcp/what-each-is-for.png "wide: What each server is best at.")

Both can read file structure, take screenshots, read variables and search a library. Both can now write to a file by running Plugin API code. [Southleft's own comparison](https://docs.figma-console-mcp.southleft.com/figma-mcp-vs-figma-console-mcp), dated September 2026, calls them complementary and says both can run in the same AI tool. We agree, with the caveat that it's written by one of the two parties.

The difference is focus. Figma's server is built around getting from a design to code that uses your components: design context, Code Connect, library search. Console MCP is built around looking after the system itself: tokens, audits, parity and documentation. It also has things the official server doesn't describe, such as capturing console logs while you develop a Figma plugin.

## How we use them together

![Four steps: set up and tidy variables with Console MCP, read design context with the official server, map components with Code Connect, then audit and check parity with Console MCP.](/figures/figma-mcp-vs-figma-console-mcp/how-we-use-them.png "wide: How the two servers fit into our design system work.")

1. **Set up the foundations with Console MCP.** Create or tidy variable collections and modes from the token source, in batches, and export them back to check nothing drifted.
2. **Read design context with the official server.** When an agent builds a screen or a component from a Figma frame, `get_design_context` and `get_variable_defs` give it the structure and the tokens in use.
3. **Map components with Code Connect.** So the agent reaches for your real components rather than writing new ones.
4. **Audit and check with Console MCP.** A health report on the file, accessibility checks on components and a parity check between Figma and code. We fix what it finds by hand or with either server.

Neither replaces the written guidance an agent needs about when to use what. That still lives in your docs, as we describe in [design system docs for people and AI agents](/articles/design-system-docs-for-people-and-ai-agents).

## Limits and costs

**The official server is limited by plan and seat.** Figma's page currently lists up to 20 tool calls a month for View and Collab seats, and daily and per-minute limits for Dev and Full seats that rise with the plan, for example up to 200 a day on Professional. Tools that write to files don't count towards those limits. Code Connect needs a Full or Dev seat on a Professional plan or above. Writing to the canvas needs a paid plan and edit access to the file, and a Full seat to write outside your drafts. These figures change, so check before you plan around them.

**Console MCP is free, but not free of setup.** You run it yourself, with your own personal access token, so Figma's REST API rate limits apply. Local mode needs Figma Desktop open with the plugin running. Keep the token out of shared config files.

**Both can change your files.** Treat either as a power tool. Try writes on a branch or a copy, and review what changed.

## What to take from this

- Use Figma's official server to give agents design context, with Code Connect pointing them at your real components.
- Use Figma Console MCP to manage variables in bulk, sync tokens and audit the system.
- Both can write to Figma now. Check the output, and start on a copy.
- Check plan, seat and rate limits before a team relies on the official server.
- Neither will fix a design system that isn't ready. That work comes first, as we argued in [why AI prototyping needs a design system](/articles/why-ai-prototyping-needs-a-design-system).
