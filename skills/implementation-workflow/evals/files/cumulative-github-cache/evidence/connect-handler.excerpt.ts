// Inside the connection handler, before recording selected repositories:
const result = await readInventory({
  database,
  configuration,
  mode: 'connect'
})

        const inventory = result.cached?.inventory

        if (!result.verified || inventory === null || inventory === undefined) {
          const deadline = Math.max(result.cached?.retryAfter ?? 0, result.cached?.leaseUntil ?? 0)
          const retrySeconds = Math.max(1, Math.ceil((deadline - Date.now()) / 1000))

          context.header('Retry-After', String(retrySeconds))

          const status = result.cached?.failure ? 503 : 429

          return context.json({ error: 'GitHub verification is temporarily unavailable. Try again shortly.' }, status)
        }

