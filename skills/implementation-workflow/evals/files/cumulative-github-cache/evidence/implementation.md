# Captured implementation facts

This is a source-review excerpt from completed work, not a runnable application or a record of checks performed in this replay.

- The shared GitHub App ID is `123456`, and the server requires `GITHUB_APP_PRIVATE_KEY`. Installation discovery calls the organization installation API, validates the organization and App, requires selected repositories, and saves the discovered installation ID in D1. It uses no per-user OAuth.
- Inventory reads use a shared D1 cache with a five-minute lifetime. Refresh has a shared 30-second cooldown across managers. GitHub retry limits can extend the wait. The UI shows cached repositories while another refresh is running and disables competing refresh actions.
- Connecting bypasses cache freshness and the ordinary Refresh cooldown to verify current GitHub access before saving. It still respects an active check or upstream retry limit. If verification is unavailable, nothing is connected and the user is asked to retry. Disconnecting does not need a live GitHub request.
- Cache updates use a lease and a fenced D1 transaction. The API exposes `refreshInMs` and `refreshing`; the UI displays the wait. These details are present in the implementation.
- Captured staging and PR Preview secret-name listings both contain `GITHUB_APP_PRIVATE_KEY`. They do not show its value or prove configuration in other environments.
