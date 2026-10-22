import { expect, test as base } from '@playwright/test'

const appBaseUrl = 'http://127.0.0.1:4173'

export { expect }

export const test = base.extend({
  page: async ({ page }, use) => {
    const errors: string[] = []

    page.on('pageerror', error => {
      errors.push(error.message)
    })

    page.on('console', async message => {
      if (message.type() !== 'error') return

      const values = await Promise.all(message.args().map(argument => argument.jsonValue()))

      errors.push(JSON.stringify(values))
    })

    await page.route('**/*', async route => {
      const url = new URL(route.request().url())

      if (url.origin === appBaseUrl) {
        await route.continue()
      } else {
        errors.push(`Unmocked request: ${url.href}`)
        await route.abort()
      }
    })

    await use(page)
    expect(errors).toEqual([])
  }
})
