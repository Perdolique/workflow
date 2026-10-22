interface GuestState {
  savedAges: number[];
  draftAges: number[];
}

export const guestState: GuestState = {
  savedAges: [],
  draftAges: []
}

export function countSavedAdults(): number {
  const adults = guestState.savedAges.filter(age => age >= 18)

  return adults.length
}
