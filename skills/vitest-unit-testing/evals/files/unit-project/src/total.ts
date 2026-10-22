export function calculateTotal(unitPriceCents: number, quantity: number, discountCents: number): number {
  const subtotal = unitPriceCents * quantity

  return Math.max(0, subtotal - discountCents)
}
