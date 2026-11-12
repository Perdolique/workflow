# Checkout agreement

The current tenant opens hosted checkout with its existing checkout reference. The server accepts payment state from the provider and exposes it through Stay. A payment can remain processing for up to 90 seconds after bank approval. A processing checkout must be resumed or checked, not replaced with a new charge request.

The provider's return URL documentation supplied to the team describes sign-in, not this tenant's hosted checkout. Hosted-checkout custom return support has not been confirmed. The app cannot edit the provider-hosted bank result page. A website association file by itself does not establish delivery back to this app.

Bank approval may return to the still-open hosted checkout before the guest closes it. Foregrounding the app is not a documented end-of-checkout signal. The native bridge currently keeps open() pending until its browser closes.
