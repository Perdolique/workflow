// The partner API reads these exact JSON keys.
export function serializeOrder(order) {
  return JSON.stringify({
    order_id: order.id,
    total_cents: order.totalCents
  })
}
