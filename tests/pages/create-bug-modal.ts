import { type Locator, type Page } from "@playwright/test";

export class CreateBugModal {
  readonly page: Page;
  readonly dialog: Locator;
  readonly titleInput: Locator;
  readonly severitySelect: Locator;
  readonly ownerInput: Locator;
  readonly creatorInput: Locator;
  readonly descriptionInput: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;
  readonly closeButton: Locator;
  readonly validationAlert: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dialog = page.getByRole("dialog", { name: "Create bug" });
    this.titleInput = this.dialog.getByRole("textbox", { name: "Title" });
    this.severitySelect = this.dialog.getByLabel("Severity");
    this.ownerInput = this.dialog.getByRole("textbox", { name: "Owner" });
    this.creatorInput = this.dialog.getByRole("textbox", { name: "Creator" });
    this.descriptionInput = this.dialog.getByRole("textbox", { name: "Description" });
    this.saveButton = this.dialog.getByRole("button", { name: "Save" });
    this.cancelButton = this.dialog.getByRole("button", { name: "Cancel" });
    this.closeButton = this.dialog.getByRole("button", { name: "Close", exact: true });
    this.validationAlert = this.dialog.getByRole("alert");
  }

  async fillTitle(title: string): Promise<void> {
    await this.titleInput.fill(title);
  }

  async fillOwner(owner: string): Promise<void> {
    await this.ownerInput.fill(owner);
  }

  async fillDescription(description: string): Promise<void> {
    await this.descriptionInput.fill(description);
  }

  async selectSeverity(severity: "HIGH" | "MID" | "LOW"): Promise<void> {
    await this.severitySelect.selectOption({ label: severity });
  }

  async save(): Promise<void> {
    await this.saveButton.click();
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

  async clickBackdrop(): Promise<void> {
    await this.dialog.click({ position: { x: 2, y: 2 } });
  }
}
