import { expect, test } from '@playwright/test'

test('switches the password icon', async ({ page }) => {
  const iconUrl = new URL('./icon.html', import.meta.url).href

  await page.goto(iconUrl)

  const button = page.getByRole('button', { name: 'Show password' })

  await expect(button.locator('svg')).toBeVisible()
  await button.click()
  await expect(page.getByRole('button', { name: 'Hide password' }).locator('svg')).toBeVisible()
})
