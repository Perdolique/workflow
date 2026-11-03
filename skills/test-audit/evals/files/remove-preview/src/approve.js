export function approve(actor, request, { preview = false } = {}) {
  if (preview) {
    return { status: 'preview' }
  }

  if (!actor.active) {
    throw new Error('inactive actor blocked')
  }

  if (actor.orgId !== request.orgId) {
    throw new Error('other team blocked')
  }

  return { status: 'approved' }
}
