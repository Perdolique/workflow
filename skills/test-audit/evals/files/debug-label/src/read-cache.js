import { traceCacheHit } from './trace-cache.js'

export function readCache(cache, key, development) {
  const value = cache.get(key)

  if (value !== undefined && development) {
    traceCacheHit(key)
  }

  return value
}
