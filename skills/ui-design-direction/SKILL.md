---
name: ui-design-direction
description: Use when the user asks for help choosing an app’s layout or visual direction, UI sketches or mockups, or a UI design brief for web, mobile, or desktop.
license: Unlicense
---

# UI design direction

- For advice, give a recommendation and its main trade-off in chat.
- Write a brief only when the user asks for one or agrees to it.

## Clarify the design

1. Understand the task.
   - Identify the user, task, screen or flow, and platform.
   - Read the supplied examples, project guidance, and existing screens.
   - Build on approved styles, components, and decisions.
   - Ask about missing facts that would change the design. Wait before giving advice or drawing sketches that depend on the answer.
   - Explore open preferences and make the choices the user leaves to you.
2. For sketches or mockups, choose a tool that can deliver the result.
   - Check the available tools and follow the relevant skills and instructions.
   - Follow the user’s tool and format choices. Pick a suitable tool yourself when they leave it open.
   - If you cannot meet a tool, format, or editing requirement, explain the limit and agree on an alternative first.
3. When the user wants options, make them easy to compare.
   - Use the product’s content and the user’s task to shape each option.
   - Show two or three sketches of the same screen with the same content.
   - Use the [design direction catalog](references/design-directions.md) for ideas.
   - If previews are unavailable and the user only wants advice, describe each option in chat.
   - For layouts, keep the chosen style. Vary emphasis, density, or how users find the main action.
   - For palettes, keep the layout fixed. Show the background, text, main action, and a relevant state.
   - Check palette contrast and preserve existing color meanings.
   - Explain each option’s trade-off and recommend one for the user’s task.
4. Inspect the finished sketches or mockup before sharing.
   - Check that each option shows the difference you describe.
   - For an editable mockup, verify that text and layers can be edited in the delivered design.
   - Give the user the preview, file, or link they need to see or edit it.
5. Refine the choice.
   - Ask only about choices that affect the design, in chat or with a clarification tool.
   - Turn feedback like “calmer” into changes to type, spacing, or color in the chosen sketch.
   - Combine the traits the user picks.
   - Wait for required answers before writing the brief.
   - Record decisions the user leaves to you as assumptions.

## Write the handoff

1. Choose where to put `ui-brief.md`.
   - Use the requested location or default to the project working directory.
   - Read any existing file before updating it. Keep unrelated content in the same brief.
   - If the file covers a different design, ask where to save the new brief.
   - If file writing is unavailable, give the complete Markdown in chat.
2. Use these sections as a guide. Match the detail to the task.
   - **Goal and scope.** Name the user, task, screen or flow, target platforms, and requested design output.
   - **Interface and states.** Set the information order, main action, and relevant states and responses.
     - Use approved content or clearly label sample content.
   - **Visual direction.** Describe the hierarchy, density, and chosen traits a designer can apply.
     - Link approved sources. Name the components and design rules to reuse.
   - **Responsive and platform behavior.** Cover changes for screen space, input method, and platform where relevant.
     - Include applicable accessibility needs.
   - **Acceptance checks.** Give observable checks for the user’s task and design decisions.
   - In each relevant section, distinguish requirements, assumptions, and choices left to the designer.
3. Check and deliver the brief.
   - Read it as the design agent’s first message. Check that its decisions and sources can guide the work.
   - Return the brief’s location and note assumptions that affect the result.
