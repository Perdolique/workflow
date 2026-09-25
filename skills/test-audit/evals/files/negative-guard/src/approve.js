export function approve(actor, request) {
  if (!actor.active) {
    throw new Error('inactive actor blocked')
  }

  if (actor.orgId !== request.orgId) {
    throw new Error('other team blocked')
  }

  return { status: 'approved' }
}
