import { type Locator, type Page } from "@playwright/test";

export class EditBugModal {
  readonly page: Page;
  readonly dialog: Locator;
  readonly creatorInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dialog = page.getByRole("dialog").filter({ has: page.getByRole("heading", { name: /Edit bug #/ }) });
    this.creatorInput = this.dialog.getByRole("textbox", { name: "Creator" });
  }
}
