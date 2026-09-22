import { type Locator, type Page } from "@playwright/test";

export type Severity = "HIGH" | "MID" | "LOW";

export type BugStateLabel = "Open" | "Closed";

/**
 * The "Edit bug #<id>" modal.
 *
 * Save is disabled until the form differs from the loaded bug, and the comparison is made on
 * trimmed values — reverting a field to its original value disables Save again.
 *
 * Severity and State `<option>` values are lower case (`high`, `closed`) while their labels are
 * what the user sees (`HIGH`, `Closed`), so selections go through `{ label }`.
 */
export class EditBugModal {
  readonly page: Page;
  readonly modal: Locator;
  readonly overlay: Locator;
  readonly idInput: Locator;
  readonly titleInput: Locator;
  readonly severitySelect: Locator;
  readonly stateSelect: Locator;
  readonly ownerInput: Locator;
  readonly descriptionInput: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;
  readonly closeButton: Locator;
  readonly deleteButton: Locator;
  readonly errorList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.modal = page.getByTestId("edit-bug-modal");
    this.overlay = page.getByTestId("edit-bug-overlay");
    this.idInput = page.getByTestId("edit-bug-id");
    this.titleInput = page.getByTestId("edit-bug-title");
    this.severitySelect = page.getByTestId("edit-bug-severity");
    this.stateSelect = page.getByTestId("edit-bug-state");
    this.ownerInput = page.getByTestId("edit-bug-owner");
    this.descriptionInput = page.getByTestId("edit-bug-description");
    this.saveButton = page.getByTestId("edit-bug-save");
    this.cancelButton = page.getByTestId("edit-bug-cancel");
    this.closeButton = page.getByTestId("edit-bug-close");
    this.deleteButton = page.getByTestId("edit-bug-delete");
    this.errorList = page.getByTestId("edit-bug-errors");
  }

  heading(bugId: number): Locator {
    return this.modal.getByRole("heading", { name: `Edit bug #${bugId}` });
  }

  async fillTitle(title: string): Promise<void> {
    await this.titleInput.fill(title);
  }

  async selectSeverity(severity: Severity): Promise<void> {
    await this.severitySelect.selectOption({ label: severity });
  }

  async selectState(state: BugStateLabel): Promise<void> {
    await this.stateSelect.selectOption({ label: state });
  }

  async fillOwner(owner: string): Promise<void> {
    await this.ownerInput.fill(owner);
  }

  async fillDescription(description: string): Promise<void> {
    await this.descriptionInput.fill(description);
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

  async clickDelete(): Promise<void> {
    await this.deleteButton.click();
  }

  async pressEscape(): Promise<void> {
    await this.page.keyboard.press("Escape");
  }

  /** Clicks the dimmed overlay well away from the panel, which must not close the modal. */
  async clickBackdrop(): Promise<void> {
    await this.overlay.click({ position: { x: 5, y: 5 } });
  }
}
