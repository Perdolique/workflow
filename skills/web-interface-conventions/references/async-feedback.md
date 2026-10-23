# Async feedback

## Model the lifecycle

- Cover every applicable idle, pending, success, empty, error, retry, cancel, stale-result, and uncertain-result state.
- Decide whether each operation ends with its view or must finish after navigation, closing, or component replacement. Keep required state and completion handling with an owner that lasts that long. Keep DOM work with the current view.
- Separate hiding a view from cancelling its operation. When an operation ends or becomes obsolete, cancel work where possible and detach its UI callbacks. A removed view must not discard completion that the task still requires.
- Before applying async data or showing its error, check that the request is still current and that its relevant inputs still match the current state.
- In cleanup, release only flags and locks still owned by the finishing operation. A result may be obsolete while that operation still owns its loading state.
- Make the newest valid user intent win. Account for both context changes and overlapping requests in the same context. Keep an older pending response from replacing a confirmed terminal result.
- Preserve useful content during refresh or retry when it is still valid. Do not replace stable content only to prove that work started.
- Keep recovery actions available through failure and retry.

## Handle input-driven work

- Do not act on unfinished IME composition. Start input-driven work only after the user commits the composed text.

## Control loading feedback

- Keep the action label stable when it helps preserve the user's intent.
- Keep temporary loading feedback from moving controls or nearby content. Reserve its space or show it inside a stable control when it would otherwise change the layout.
- Measure real response behavior before choosing a loading delay or minimum display time.
- Avoid a loading indicator that appears too briefly to understand. Do not copy one timing value to every feature.
- If work finishes before feedback becomes useful, show the result without flashing an intermediate state.

## Handle overlays and external UI

- Use an overlay only when the interaction needs its own temporary context. When used, define open, success, retry, cancel, dismissal, and stale-callback behavior.
- Continue the original action automatically after a successful prerequisite when no new confirmation is required.
- When third-party work can finish without user action and no disclosure is required, keep its UI from interrupting the primary task.
- When third-party interaction becomes necessary, present it without moving unrelated controls.
- Treat third-party UI as part of the interface lifecycle. Define the applicable ready, completion, expiry, failure, retry, cancellation, replacement, and stale-callback behavior.
