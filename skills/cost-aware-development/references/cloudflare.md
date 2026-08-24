# Cloudflare cost reference

Last verified: 2026-08-24.

The user has access to Cloudflare Workers Paid for projects that explicitly identify that plan. Confirm that the current project uses the same account and plan before applying these allowances; Cloudflare meters the listed included usage per account and billing month.

## Workers Paid

- Minimum subscription: $5 USD per account per month.
- Included monthly usage: 10 million Worker requests and 30 million CPU milliseconds.
- Overage: $0.30 per additional million requests and $0.02 per additional million CPU milliseconds.
- Static asset requests are free and unlimited when served as static assets. A request handled through Workers Cache still counts as a Worker request, although CPU runs only on a cache miss or bypass.
- Worker subrequests are not billed as additional inbound requests.
- Source: [Cloudflare Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/).

## Service Bindings

- On Workers Standard pricing, a call from one Worker to another through a Service Binding does not add a request fee.
- Billing counts the initial request and total CPU time across the calling and called Workers.
- This does not apply to deprecated Bundled or Unbound pricing, so confirm the usage model when a repository may be on a legacy plan.
- Source: [Cloudflare Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/#service-bindings).

## Images Paid

- The user pays for one Images Paid storage increment in projects that explicitly use the same hosted Images account. Treat this as an existing resource, but do not treat the $5 USD storage charge as an all-inclusive Images subscription.
- Unique transformations: the first 5,000 per calendar month are included, then $0.50 per 1,000. Repeating the same source image and parameter combination within the month does not add usage. Calls to the Images binding's `.info()` method are not billed.
- Hosted storage: $5 USD per 100,000 images stored per month. Storage is purchased in 100,000-image increments; only uploaded originals count, while predefined variants do not consume additional stored-image capacity.
- Hosted delivery: $1 USD per 100,000 images delivered per month. Every image requested by a browser counts as one delivery.
- Serving a hosted image through an Images delivery URL counts as Images Delivered, not Images Transformed. Optimizing hosted image bytes through the Images binding counts as Images Transformed instead.
- Images stored outside Images, such as in R2, incur transformation usage rather than hosted storage or delivery usage; the external storage provider's own storage and operation charges still apply.
- Source: [Cloudflare Images pricing](https://developers.cloudflare.com/images/pricing/).

## Email Sending

- Sending to arbitrary recipients requires Workers Paid.
- Included monthly usage: 3,000 outbound emails per account.
- Overage: $0.35 per 1,000 emails.
- Emails accepted by Email Service count even when they later hard-bounce. Sends rejected at the API boundary and sends to verified destination addresses do not count toward the allowance.
- Production and staging share the allowance only when they use the same Cloudflare account.
- Source: [Cloudflare Email Service pricing](https://developers.cloudflare.com/email-service/platform/pricing/).

## Workers Logs

- Included monthly usage on Workers Paid: 20 million written log events per account with seven-day retention.
- Overage: $0.60 per additional million log events.
- An invocation log and each emitted custom log are separate events. Estimate both event count and `head_sampling_rate`.
- A `head_sampling_rate` of `1` records every invocation selected by the observability configuration. Lowering sampling changes diagnostic visibility, so treat it as a user-visible operational trade-off rather than an automatic saving.
- Source: [Cloudflare Workers Logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/).

## Hyperdrive

- Hyperdrive is included in Workers Paid.
- Paid-plan database queries, connection pooling, query caching, and data transfer have no additional Hyperdrive charge.
- The underlying database provider remains independently metered. A cached query still counts as a Hyperdrive query, although paid-plan queries are unlimited.
- Source: [Cloudflare Hyperdrive pricing](https://developers.cloudflare.com/hyperdrive/platform/pricing/).

## Workers Rate Limiting

- The binding documentation does not publish a separate usage price.
- Code that invokes the binding still consumes the surrounding Worker's request and CPU usage. Do not describe the binding as entirely free; describe it as having no separately documented line item and verify current pricing when the distinction changes a decision.
- Source: [Cloudflare Workers Rate Limiting binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/).
