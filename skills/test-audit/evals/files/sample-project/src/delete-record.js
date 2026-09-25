export function deleteRecord(actor, record, store) {
  store.delete(record.id)

  if (actor.orgId !== record.orgId) {
    throw new Error('Forbidden')
  }
}
