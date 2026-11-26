# Final finding validation

- Check only the supplied candidates under the shared review rules. Independently look for evidence for and against each claim, including guards that block the reported path and exceptions to applicable rules. Do not launch agents.
- Reuse completed reproduction results. Run the smallest new read-only reproduction once only if the available evidence cannot settle the claim.
- Preserve each ID and return exactly one finding decision per candidate.
  - `Confirmed` with supporting evidence.
  - `Rejected` with evidence that contradicts the claim.
  - `Unresolved` when missing evidence or an unknown requirement prevents a decision. State what is missing.
- For each confirmed finding, assess each proposed fix separately. Check whether it addresses the cause and preserves required behavior and conventions. Give evidence or say what you could not verify.
- Assign priority after validation.
