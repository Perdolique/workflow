class BrowserKitAdapter:
    def view_did_disappear(self):
        self.events.emit("closed")

    def on_close_button(self):
        self.controller.dismiss()
