import { type Locator, type Page } from "@playwright/test";

/**
 * The board page: title bar controls, the state filter, and the bug table.
 *
 * Board rows render as `<tr role="button">` rather than `row`, so `bugRows` targets the
 * `data-testid="bug-row-<id>"` attribute. To assert on one row, filter the exposed locator
 * in the test: `boardPage.bugRows.filter({ hasText: title })`.
 */
export class BoardPage {
  readonly page: Page;
  readonly newBugButton: Locator;
  readonly logoutButton: Locator;
  readonly searchInput: Locator;
  readonly searchClearButton: Locator;
  readonly bugTable: Locator;
  readonly bugRows: Locator;
  readonly openFilterButton: Locator;
  readonly closedFilterButton: Locator;
  readonly emptyMessage: Locator;
  readonly noMatchesMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newBugButton = page.getByTestId("new-bug-button");
    this.logoutButton = page.getByTestId("logout-button");
    this.searchInput = page.getByTestId("search-input");
    this.searchClearButton = page.getByTestId("search-clear");
    this.bugTable = page.getByTestId("bug-table");
    this.bugRows = page.locator('[data-testid^="bug-row-"]');
    this.openFilterButton = page.getByTestId("state-filter-open");
    this.closedFilterButton = page.getByTestId("state-filter-closed");
    this.emptyMessage = page.getByTestId("board-empty");
    this.noMatchesMessage = page.getByTestId("board-no-matches");
  }

  async goto(): Promise<void> {
    await this.page.goto("/board");
  }

  async openCreateBugModal(): Promise<void> {
    await this.newBugButton.click();
  }

  async openBugByTitle(title: string): Promise<void> {
    await this.bugRows.filter({ hasText: title }).click();
  }

  async filterByOpen(): Promise<void> {
    await this.openFilterButton.click();
  }

  async filterByClosed(): Promise<void> {
    await this.closedFilterButton.click();
  }

  async search(query: string): Promise<void> {
    await this.searchInput.fill(query);
  }
}
