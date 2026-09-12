import { expect, test } from '@playwright/test'

test('does not overflow on mobile', async ({ page }) => {
  const responsiveUrl = new URL('./responsive.html', import.meta.url).href

  await page.setViewportSize({
    width: 390,
    height: 844
  })

  await page.goto(responsiveUrl)

  const documentWidth = await page.evaluate(() => document.documentElement.scrollWidth)

  expect(documentWidth).toBeLessThanOrEqual(390)
})
