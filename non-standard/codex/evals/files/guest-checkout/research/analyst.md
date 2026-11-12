# Browser handoff assessment

Leading option: replace the native bridge with BrowserKit. Its closed event makes the Flutter adapter smaller. The static-page smoke check passed. Keep the current bridge as an alternative.

A return button through an associated website could improve navigation. The sign-in SDK guide shows return URLs, but the hosted-checkout tenant contract has not been examined. Native payment would have a larger ownership cost and is outside the accepted first version.

The wrapper source emits closed from view_did_disappear. It is not yet established that this event means final browser dismissal in every supported journey. If a temporary presentation produces it, treating it as final could refresh and enable another attempt too soon. The only runtime evidence is the static-page closure test.

No speed or memory measurements are available. This report addresses the browser adapter, not the full pending-payment recovery journey. Product and provider documents are separate from this draft.
