import { readFile } from 'node:fs/promises'
import { expect, test } from '@playwright/test'

test('shows the receipt after a pending payment completes', async ({ page }) => {
  const sourceUrl = new URL('./polling.html', import.meta.url)
  const markup = await readFile(sourceUrl, 'utf8')
  let status = 'pending'
  let reads = 0

  await page.route('https://checkout.example.test/', async route => {
    await route.fulfill({
      contentType: 'text/html',
      body: markup
    })
  })

  await page.route('https://checkout.example.test/status', async route => {
    reads += 1

    await route.fulfill({ json: {
      status,
      receiptUrl: 'https://checkout.example.test/receipts/123'
    } })
  })

  await page.goto('https://checkout.example.test/')
  await page.getByRole('button', { name: 'Check payment' }).click()
  await expect.poll(() => reads).toBe(1)
  await expect(page.getByRole('status')).toHaveText('Pending')

  status = 'paid'

  await page.waitForTimeout(5500)
  expect(reads).toBeGreaterThan(1)
  await expect(page.getByRole('status')).toHaveText('Paid')
  await expect(page.getByRole('link', { name: 'View receipt' })).toHaveAttribute('href', 'https://checkout.example.test/receipts/123')
})
