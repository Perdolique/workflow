export function normalizeId(value) {
  const normalized = value.trim().toLowerCase()

  return normalized === '' ? null : normalized
}
