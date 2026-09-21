import { type Locator, type Page } from "@playwright/test";

export class BoardPage {
  readonly page: Page;
  readonly newBugButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newBugButton = page.getByRole("button", { name: "New Bug" });
  }

  async openCreateBugModal(): Promise<void> {
    await this.newBugButton.click();
  }
}
