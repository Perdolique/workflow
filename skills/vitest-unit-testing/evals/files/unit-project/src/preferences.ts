import { preferenceStorage } from './browser-storage'

export function readLocale(): string {
  return preferenceStorage.getItem('locale') ?? 'en'
}
