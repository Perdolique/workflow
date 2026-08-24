# GitHub Actions cost reference

Last verified: 2026-08-24.

Confirm whether the repository is public or private, which account owns it, and which GitHub plan applies before estimating cost.

## Runners

- Standard GitHub-hosted runners are free for public repositories.
- Larger runners are charged even for public repositories.
- Private repositories receive plan-specific included minutes. GitHub Free includes 2,000 minutes per month and GitHub Pro includes 3,000 minutes per month.
- Baseline hosted-runner rates are $0.002 per minute for one-core Linux x64, $0.006 for two-core Linux x64, $0.005 for two-core Linux arm64, $0.010 for two-core Windows, and $0.062 for three- or four-core macOS. Verify the selected runner SKU before calculating.

## Storage

- Artifact storage allowance: 500 MB on GitHub Free and 1 GB on GitHub Pro. Artifact storage shares its allowance with GitHub Packages.
- Actions cache allowance: 10 GB per repository, separate from artifact storage.
- Overage: $0.25 per GB-month for shared artifact and Packages storage and $0.07 per GB-month for Actions cache storage.
- Storage accrues hourly. Deleting an artifact stops future accrual but does not erase usage already accrued in the billing period.

Source: [GitHub Actions billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions).
