import { type Locator, type Page } from "@playwright/test";

/**
 * The "Delete bug" confirmation modal.
 *
 * While this modal is open the edit modal stays mounted behind it, so Delete, Cancel, and Close
 * each match two buttons on the page. Every locator here is scoped to this modal's own test IDs,
 * which keeps those names unambiguous without resorting to `.nth()`.
 */
export class DeleteConfirmationModal {
  readonly page: Page;
  readonly modal: Locator;
  readonly overlay: Locator;
  readonly heading: Locator;
  readonly message: Locator;
  readonly deleteButton: Locator;
  readonly cancelButton: Locator;
  readonly closeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.modal = page.getByTestId("delete-confirm-modal");
    this.overlay = page.getByTestId("delete-confirm-overlay");
    this.heading = this.modal.getByRole("heading", { name: "Delete bug" });
    this.message = page.getByTestId("delete-confirm-message");
    this.deleteButton = page.getByTestId("delete-confirm-delete");
    this.cancelButton = page.getByTestId("delete-confirm-cancel");
    this.closeButton = page.getByTestId("delete-confirm-close");
  }

  async confirm(): Promise<void> {
    await this.deleteButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  async close(): Promise<void> {
    await this.closeButton.click();
  }

  async pressEscape(): Promise<void> {
    await this.page.keyboard.press("Escape");
  }
}
