# Async feedback

## Model the lifecycle

- Cover every applicable idle, pending, success, empty, error, retry, cancel, stale-result, and uncertain-result state.
- Make the newest user intent win. Cancel obsolete work when possible and ignore results or callbacks that no longer belong to the active attempt.
- Preserve useful content during refresh or retry when it is still valid. Do not replace stable content only to prove that work started.
- Keep recovery actions available through failure and retry.

## Handle input-driven work

- Do not act on unfinished IME composition. Start input-driven work only after the user commits the composed text.

## Control loading feedback

- Keep the action label stable when it helps preserve the user's intent.
- Measure real response behavior before choosing a loading delay or minimum display time.
- Avoid a loading indicator that appears too briefly to understand. Do not copy one timing value to every feature.
- If work finishes before feedback becomes useful, show the result without flashing an intermediate state.

## Handle overlays and external UI

- Use an overlay only when the interaction needs its own temporary context. When used, define open, success, retry, cancel, dismissal, and stale-callback behavior.
- Continue the original action automatically after a successful prerequisite when no new confirmation is required.
- When third-party work can finish without user action and no disclosure is required, keep its UI from interrupting the primary task.
- When third-party interaction becomes necessary, present it without moving unrelated controls.
- Treat third-party UI as part of the interface lifecycle. Define the applicable ready, completion, expiry, failure, retry, cancellation, replacement, and stale-callback behavior.
