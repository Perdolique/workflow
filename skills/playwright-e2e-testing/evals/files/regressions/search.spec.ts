import { expect, test } from '@playwright/test'

declare global {
  interface Window {
    searchCatalog: (query: string) => Promise<string[]>;
  }
}

test('shows search results', async ({ page }) => {
  const searchUrl = new URL('./search.html', import.meta.url).href

  await page.addInitScript(() => {
    window.searchCatalog = async () => ['Matching result']
  })

  await page.goto(searchUrl)
  await page.getByLabel('Search').fill('match')
  await page.getByLabel('Search').dispatchEvent('change')
  await expect(page.getByText('Matching result')).toBeVisible()
})
