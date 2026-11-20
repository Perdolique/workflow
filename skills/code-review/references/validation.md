# Final finding validation

- Check only the supplied candidates. Evaluate their evidence independently under the shared review rules. Do not launch agents.
- Reuse completed reproduction results. Run the smallest new read-only reproduction once only if the available evidence cannot settle the claim.
- Preserve each ID and return exactly one decision per candidate.
  - `Confirmed` with supporting evidence.
  - `Rejected` with evidence that contradicts the claim.
  - `Unresolved` when missing evidence or an unknown requirement prevents a decision. State what is missing.
- Assign priority after validation.
