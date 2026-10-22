# Browser harness

Playwright 1.64.1 runs this fixture in Chromium and WebKit. Feature tests register scenario API routes after the shared fixture starts. Unknown external requests and application errors must fail a test. Local assets and local blob URLs belong to the application.

Profiling shows that the catch-all route sends interception messages to the test process for every script, image, and stylesheet. Failures sometimes include a console payload read after the page closes. The failure report's serialized console argument values are needed for diagnosis. The suite also contains tests that change localStorage and cookies, and a modal test that checks the actual intermediate and final heights of an animation.

The fixture is the editable input. The full application and browser suite are not included in this snapshot.
