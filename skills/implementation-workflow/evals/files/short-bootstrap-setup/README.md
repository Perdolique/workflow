# Pantry API

API backend for Pantry, a planned recipe book app.

The goal is to help users save recipes they like and cook with the ingredients and steps ready at hand. The idea comes from trying existing apps and not finding one that feels right.

The backend is separate from its clients. Android is the first planned client; the API is also intended to support future web, iOS, and third-party clients. Client development is outside this repository's backend plan.

## Core idea

A recipe can contain several parts, such as pasta and sauce, with one shared sequence of steps. Preparation, cooking, and waiting follow the author's order. A recipe may start the sauce, prepare the pasta, and then return to the sauce. The API preserves that order instead of forcing all preparation to come first.

Backend v1 is planned to provide a private recipe book with manual editing, temporary ingredient scaling, combined shopping quantities, simple search, and one optional dish photo. Full recipe data and downloadable photos will let clients save recipes for offline reading. Clients handle step navigation and running timers.

## Status and planning

The E1 foundation is planned and split into implementation tasks; application implementation has not started. The [service stack](docs/decisions/0001-service-stack.md) records the accepted technologies and operating profile. The [shared API contract](docs/decisions/0002-api-contract.md) records the accepted [E1](https://github.com/example-maintainer/pantry-api/issues/201) profile. Authentication remains a later decision. Implemented features will be free at launch; no monetization model has been chosen.

- [Development guide](docs/development.md): GitHub roadmap, milestones, and workflow.
- [Initial plan](docs/initial-plan.md): product context, technical proposals, decisions, and acceptance scenarios.
- [Agent instructions](AGENTS.md): short rules for working in this repository.

Implementation tasks are planned when each epic is selected, using the current code and agreed decisions. Future ideas stay separate from the v1 milestones.
