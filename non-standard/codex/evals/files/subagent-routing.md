# Next assignments

Prepare a delegation call for each situation. These are separate situations, not steps in one run. Delegation is authorized. Agents share the workspace, and both `spawn_agent` and `followup_task` are available.

## Breakfast implementation

The idle agent `breakfast_research` finished researching checkout analytics for APP-42. The user has approved implementation for the same ticket. Another developer handles the UI. Delegate the order model and recovery work.

Available context:

- The accepted plan is `/tmp/APP-42-plan.md`: preserve the selected items, product IDs, dates, quantity, price, currency, purchase ID, and status through restart. Save an attempt before POST and avoid another POST when the result is unknown.
- The research conclusion is that checkout does not need a visible cart. Analytics implementation is a later task.
- The researcher read 17 sources about Segment, Shopify, Wix, and Stripe. Its history contains the full page extracts and search results.
- The code is in `lib/data/orders.dart`, `lib/data/order_attempt_store.dart`, and `lib/state/orders_controller.dart`. The focused tests are in `test/orders_test.dart` and `test/orders_storage_test.dart`.
- Changes are limited to those files. Return the changes and test results. Do not edit UI files, add analytics, commit, or push.

## Breakfast clarification

The agent `breakfast_model` is implementing the order model and recovery work above. It asked whether selected dates should be stored as server timestamps or property-local dates. The API contract confirms that the original server timestamps must be preserved. Pass this answer to the agent so it can finish its assignment.

## Parking label

The idle agent `breakfast_cache` finished implementing a breakfast cache fix for APP-41. The user now asks for a parking label fix in APP-43: trim outer whitespace while preserving spaces inside the label. Delegate `lib/parking/label.dart` and its existing focused test. Return the changes and test results. Do not change breakfast code, commit, or push.

## Implementation with requirements in chat

The idle agent `cancellation_research` finished researching cancellation libraries for APP-44. The parent chat also contains a detailed requirements discussion with annotated examples and decisions that refer to earlier messages. There is no saved plan or specification. The current summary is incomplete, and the next developer needs that full discussion to implement the agreed cancellation behavior. Delegate implementation to a new developer. Return the changes and relevant test results; publication is outside the task.

## Final review validation

The agent `order_reviewer` finished reviewing the APP-42 order changes and returned candidate finding `order-1`. The next assignment is internal final finding validation under `skills/code-review/SKILL.md`.

The candidate says that `restore()` loses `purchaseId`, which may allow a duplicate POST after restart. The supplied evidence includes the exact diff, the stored JSON with a purchase ID, and a completed reproduction showing the restored value is null. Give the validator the review target, requirement to preserve purchase IDs, candidate, evidence, and relevant guidance. The full review history also contains unrelated dismissed candidates and UI screenshots.
