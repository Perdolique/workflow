# Browser harness

Playwright 1.64.1 runs this fixture in Chromium and WebKit. Feature tests register scenario API routes after the shared fixture starts. Unknown external requests and unexpected application diagnostics must fail a test, including page exceptions, console errors, hydration warnings, and unresolved components. Local assets and local blob URLs belong to the application.

Profiling shows that the catch-all route sends interception messages to the test process for every script, image, and stylesheet. Failures sometimes include a console payload read after the page closes. The failure report's serialized console argument values are needed for diagnosis. The suite also contains tests that change localStorage and cookies, and a modal test that checks the actual intermediate and final heights of an animation.

A retry regression deliberately returns HTTP 503 for task-7. The application shows Could not load task and Retry, and logs `console.error('Task load failed', { taskId: 'task-7', status: 503 })` once. Retry then succeeds without another error. This diagnostic belongs to that scenario; a missing diagnostic, another task ID, a repeated diagnostic, or another application error must still fail. Browser-generated resource errors can also occur during error scenarios and need their own assertion.

The fixture is the editable input. The full application and browser suite are not included in this snapshot.
