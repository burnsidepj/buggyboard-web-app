import { type Locator, type Page } from "@playwright/test";

export type Severity = "HIGH" | "MID" | "LOW";

/**
 * The "Create bug" modal.
 *
 * Note the severity `<option>` values are lower case (`high`/`mid`/`low`) while their labels
 * are upper case, so selections go through `{ label }` to match what the user sees.
 */
export class CreateBugModal {
  readonly page: Page;
  readonly modal: Locator;
  readonly overlay: Locator;
  readonly heading: Locator;
  readonly titleInput: Locator;
  readonly severitySelect: Locator;
  readonly ownerInput: Locator;
  readonly descriptionInput: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;
  readonly closeButton: Locator;
  readonly errorList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.modal = page.getByTestId("create-bug-modal");
    this.overlay = page.getByTestId("create-bug-overlay");
    this.heading = this.modal.getByRole("heading", { name: "Create bug" });
    this.titleInput = page.getByTestId("create-bug-title");
    this.severitySelect = page.getByTestId("create-bug-severity");
    this.ownerInput = page.getByTestId("create-bug-owner");
    this.descriptionInput = page.getByTestId("create-bug-description");
    this.saveButton = page.getByTestId("create-bug-save");
    this.cancelButton = page.getByTestId("create-bug-cancel");
    this.closeButton = page.getByTestId("create-bug-close");
    this.errorList = page.getByTestId("create-bug-errors");
  }

  async fillTitle(title: string): Promise<void> {
    await this.titleInput.fill(title);
  }

  async selectSeverity(severity: Severity): Promise<void> {
    await this.severitySelect.selectOption({ label: severity });
  }

  async fillOwner(owner: string): Promise<void> {
    await this.ownerInput.fill(owner);
  }

  async fillDescription(description: string): Promise<void> {
    await this.descriptionInput.fill(description);
  }

  async fillForm(fields: {
    title?: string;
    severity?: Severity;
    owner?: string;
    description?: string;
  }): Promise<void> {
    if (fields.title !== undefined) await this.fillTitle(fields.title);
    if (fields.severity !== undefined)
      await this.selectSeverity(fields.severity);
    if (fields.owner !== undefined) await this.fillOwner(fields.owner);
    if (fields.description !== undefined)
      await this.fillDescription(fields.description);
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

  /** Clicks the dimmed overlay well away from the panel, which must not close the modal. */
  async clickBackdrop(): Promise<void> {
    await this.overlay.click({ position: { x: 5, y: 5 } });
  }
}
