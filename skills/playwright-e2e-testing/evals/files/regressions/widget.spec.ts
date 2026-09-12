import { expect, test } from '@playwright/test'

interface Verification {
  reset: () => void;
  start: () => void;
}

declare global {
  interface Window {
    verification: Verification;
  }
}

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.verification = {
      reset() {},

      start() {
        const resultEvent = new CustomEvent('verification-result', { detail: 'Complete' })

        window.dispatchEvent(resultEvent)
      }
    }
  })
})

test('can retry verification', async ({ page }) => {
  const widgetUrl = new URL('./widget.html', import.meta.url).href

  await page.goto(widgetUrl)
  await page.getByRole('button', { name: 'Verify' }).click()
  await expect(page.getByText('Complete')).toBeVisible()
  await page.getByRole('button', { name: 'Retry' }).click()
  await expect(page.getByText('Complete')).toBeVisible()
})
