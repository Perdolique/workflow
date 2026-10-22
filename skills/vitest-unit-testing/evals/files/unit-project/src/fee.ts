import { countSavedAdults } from './guests'

export function extraGuestFee(includedAdults: number, feeCents: number): number {
  const adults = countSavedAdults()
  const extraAdults = Math.max(0, adults - includedAdults)

  return extraAdults * feeCents
}
