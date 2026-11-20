# Subagent model selection

- Launch the orchestrator with `model="gpt-6.2-sol"` and `reasoning_effort="high"`. Leave the main agent's settings unchanged.
- For ordinary planning, review, child work, validation, and resolution, explicitly pass `model="gpt-6.2-sol"` and `reasoning_effort="xhigh"`. This includes routine cross-file tracing, asynchronous UI states, and fixture or guard checks.
- Before escalating, gather the available context. Split independent work when helpful and keep interacting contracts together. Choose the needed tier directly.

  | Model | Effort | Use when |
  | --- | --- | --- |
  | `gpt-6.2-sol` | `max` | A focused assignment needs a long, well-defined chain of reasoning across files or states. |
  | `gpt-6.2-astra` | `high` | Evidence supports competing explanations that are hard to separate across interacting contracts, or a focused Sol review leaves an uncertainty that stronger reasoning can settle with the available evidence. |

- Pass both settings explicitly for each escalation. Keep the settings and reason outside the scope packet. Return escalation records so the orchestrator can account for nested launches.
