---
name: web-to-native-adaptation
description: Use when adapting changes from an existing web app to a native mobile app (Flutter, Swift, Kotlin, etc.) based on it.
---

- Before you start, read the affected web journey, including its API data mapping, and inspect it in a browser with matching data. If the source code and live version differ, agree which one is the reference.
- Create a matrix of all in-scope states, variants, entry points, actions and return paths. Use it during implementation and final checks, including server updates and restart recovery where state is saved.
- During implementation, check the logic and visuals of each part. They should closely match the web app.
- After implementation, check all logic and visuals again. Fix any issues and repeat these checks until the result fully meets all criteria and contains no logic or visuals absent from the web app, except for the native improvements described below.

Preserve native differences allowed by project rules or agreed with the user. Ask before adding other differences.
