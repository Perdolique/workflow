# Neon cost reference

Last verified: 2026-08-24.

The user uses Neon Free for projects that explicitly identify that plan. Neon applies the main Free allowances per project, so confirm which branches and compute endpoints belong to the same project.

## Free plan

- Price: $0 with no billed overage; usage is limited until reset or plan upgrade.
- Account allowance: up to 100 projects.
- Per-project monthly compute allowance: 100 CU-hours.
- Per-project storage allowance: 0.5 GB.
- Per-project branch allowance: 10 branches.
- Maximum compute size: 2 CU.
- Public network transfer: 5 GB included.
- Compute scales to zero after five minutes of inactivity and consumes no CU-hours while suspended.
- Source: [Neon pricing](https://neon.com/pricing).

## Cost drivers

- Calculate CU-hours as average CU size multiplied by active compute hours. Multiple active branch compute endpoints consume the same project's allowance independently.
- Production and staging branches share compute and storage allowances only when they belong to the same Neon project.
- A connection pattern that prevents scale-to-zero can consume the allowance even at low query volume.
- Storage includes the database's root and child branches; branch creation alone is not a reason to duplicate all logical data, but active branch compute still consumes CU-hours.
- When the Free plan limit is the relevant boundary, describe the service interruption or upgrade requirement rather than inventing an overage price.
