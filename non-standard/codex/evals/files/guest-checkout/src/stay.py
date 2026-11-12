class StayController:
    async def pay(self):
        self.web_open = True
        try:
            await self.browser.open(self.checkout.url)
        finally:
            self.web_open = False
        await self.reload_stay()

    async def on_app_resume(self):
        if not self.web_open:
            await self.reload_stay()

    async def reload_stay(self):
        self.stay = await self.api.load_stay(self.booking_id)
