import { type Locator, type Page } from "@playwright/test";

export class BoardPage {
  readonly page: Page;
  readonly newBugButton: Locator;
  readonly bugTable: Locator;
  readonly columnHeaderButtons: Locator;
  readonly tableBodyRows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newBugButton = page.getByRole("button", { name: "New Bug" });
    this.bugTable = page.getByRole("table", { name: "Bugs" });
    this.columnHeaderButtons = this.bugTable.locator("thead button");
    this.tableBodyRows = this.bugTable.locator("tbody tr");
  }

  async openCreateBugModal(): Promise<void> {
    await this.newBugButton.click();
  }

  async openBugByTitle(title: string): Promise<void> {
    await this.tableBodyRows.filter({ hasText: title }).click();
  }
}
