import { normalizeId } from './normalize-id.js'

export function getRecord(rawId, records) {
  const id = normalizeId(rawId)
  const record = records.find((candidate) => candidate.id === id)

  if (!record) {
    return {
      status: 404,
      body: { error: 'not_found' }
    }
  }

  return {
    status: 200,
    body: { record_id: record.id }
  }
}
