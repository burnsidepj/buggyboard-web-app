# Edit Bug Test Plan

## Application Overview

Clicking a bug's row on the board opens a modal titled **"Edit bug #&lt;id&gt;"**. The ID is
read-only; Title, Severity, **State**, Owner, and Description are editable. Save writes the changes
and closes the modal; Cancel, the X, and Escape all close without saving, and the backdrop does not
close it. Unlike the create modal, **Save is disabled until the data actually differs from what was
loaded** — and it disables again if a required field is blanked or if an edit is reverted.

Source specs: `specs/features/09-edit-bug.md` (editing) and `specs/features/13-bug-status.md`
(the State field). Verified against the running app on 2026-09-22 with `playwright-cli`.

**Data requirement:** these scenarios mutate a bug, so each one must create its own bug via the API
first rather than editing whatever happens to be on the board. See note 7.

## Test Scenarios

### 1. Opening the modal

**Seed:** `tests/seed.spec.ts`

#### 1.1. open-bug-by-clicking-its-row

**File:** `tests/edit-bug/open-bug-by-clicking-its-row.spec.ts`

**Steps:**
  1. Create a bug with a known title via the API
  2. Reload the board
  3. Click the row for that bug
    - expect: a dialog is visible
    - expect: the dialog heading is "Edit bug #&lt;id&gt;" for that bug's id
    - expect: the Title field contains the bug's title
    - expect: the Severity dropdown shows the bug's severity
    - expect: the Owner field contains the bug's owner
    - expect: the Description field contains the bug's description
    - expect: the dialog has Save, Cancel, and Delete buttons

#### 1.2. id-field-is-read-only

**File:** `tests/edit-bug/id-field-is-read-only.spec.ts`

**Steps:**
  1. Create a bug via the API and open its row
    - expect: the ID field shows that bug's id
    - expect: the ID field is read-only
    - expect: the Title, Owner, and Description fields are editable

#### 1.3. severity-dropdown-uses-severity-colors

**File:** `tests/edit-bug/severity-dropdown-uses-severity-colors.spec.ts`

**Steps:**
  1. Create a bug via the API and open its row
  2. Select "HIGH" in the Severity dropdown
    - expect: the dropdown text color is `rgb(184, 74, 46)` (`#b84a2e`)
  3. Select "MID" in the Severity dropdown
    - expect: the dropdown text color is the MID amber (`#a67c47`)
  4. Select "LOW" in the Severity dropdown
    - expect: the dropdown text color is the LOW sage (`#4a6b5e`)

### 2. Save button enablement

**Seed:** `tests/seed.spec.ts`

#### 2.1. save-disabled-when-nothing-changed

**File:** `tests/edit-bug/save-disabled-when-nothing-changed.spec.ts`

**Steps:**
  1. Create a bug via the API and open its row
    - expect: the Save button is disabled

#### 2.2. save-enabled-after-editing-a-field

**File:** `tests/edit-bug/save-enabled-after-editing-a-field.spec.ts`

**Steps:**
  1. Create a bug via the API and open its row
  2. Append " (updated)" to the Title field
    - expect: the Save button is enabled

#### 2.3. save-disabled-when-required-field-blanked

**File:** `tests/edit-bug/save-disabled-when-required-field-blanked.spec.ts`

**Steps:**
  1. Create a bug via the API and open its row
  2. Clear the Title field
    - expect: the Save button is disabled
  3. Type a new title
    - expect: the Save button is enabled
  4. Clear the Description field
    - expect: the Save button is disabled

#### 2.4. save-disabled-again-when-edit-is-reverted

**File:** `tests/edit-bug/save-disabled-again-when-edit-is-reverted.spec.ts`

**Steps:**
  1. Create a bug via the API and open its row
  2. Append " (updated)" to the Title field
    - expect: the Save button is enabled
  3. Restore the Title field to the bug's original title
    - expect: the Save button is disabled

### 3. Saving and discarding changes

**Seed:** `tests/seed.spec.ts`

#### 3.1. save-persists-edited-fields

**File:** `tests/edit-bug/save-persists-edited-fields.spec.ts`

**Steps:**
  1. Create a LOW-severity bug via the API and open its row
  2. Change the Title to a new unique value
  3. Select "HIGH" in the Severity dropdown
  4. Change the Description
  5. Click Save
    - expect: the dialog is no longer visible
    - expect: the board row shows the new title
    - expect: the board row shows severity HIGH
  6. Reload the board and reopen that bug
    - expect: the Title, Severity, and Description fields show the saved values

#### 3.2. cancel-discards-changes

**File:** `tests/edit-bug/cancel-discards-changes.spec.ts`

**Steps:**
  1. Create a bug via the API and open its row
  2. Change the Title to "Should not be saved"
  3. Click Cancel
    - expect: the dialog is no longer visible
    - expect: the board still shows the bug's original title
    - expect: no row titled "Should not be saved" appears on the board

#### 3.3. x-button-discards-changes

**File:** `tests/edit-bug/x-button-discards-changes.spec.ts`

**Steps:**
  1. Create a bug via the API and open its row
  2. Change the Title to "Should not be saved via X"
  3. Click the X button in the upper right corner of the dialog
    - expect: the dialog is no longer visible
    - expect: the board still shows the bug's original title

#### 3.4. escape-discards-changes

**File:** `tests/edit-bug/escape-discards-changes.spec.ts`

**Steps:**
  1. Create a bug via the API and open its row
  2. Change the Title to "Should not be saved via Escape"
  3. Press the Escape key
    - expect: the dialog is no longer visible
    - expect: the board still shows the bug's original title

#### 3.5. backdrop-click-does-not-close

**File:** `tests/edit-bug/backdrop-click-does-not-close.spec.ts`

**Steps:**
  1. Create a bug via the API and open its row
  2. Change the Title to "Backdrop probe"
  3. Click the dimmed area outside the dialog
    - expect: the dialog is still visible
    - expect: the Title field still contains "Backdrop probe"

#### 3.6. owner-can-be-reassigned

**File:** `tests/edit-bug/owner-can-be-reassigned.spec.ts`

**Steps:**
  1. Create a bug owned by "paul" via the API and open its row
  2. Replace the Owner field contents with "vanny"
  3. Click Save
    - expect: the board row for that bug shows "vanny" as owner

### 4. Changing bug state

**Seed:** `tests/seed.spec.ts`

#### 4.1. state-field-offers-open-and-closed

**File:** `tests/edit-bug/state-field-offers-open-and-closed.spec.ts`

**Steps:**
  1. Create a bug via the API and open its row
    - expect: the State dropdown has "Open" selected
    - expect: the State dropdown offers exactly "Open" and "Closed"

#### 4.2. closing-a-bug-removes-it-from-the-open-board

**File:** `tests/edit-bug/closing-a-bug-removes-it-from-the-open-board.spec.ts`

**Steps:**
  1. Create a bug via the API and open its row
  2. Select "Closed" in the State dropdown
  3. Click Save
    - expect: the bug's row is no longer visible on the board
  4. Click the "Closed" state filter
    - expect: the bug's row is visible

#### 4.3. reopening-a-closed-bug

**File:** `tests/edit-bug/reopening-a-closed-bug.spec.ts`

**Steps:**
  1. Create a bug via the API, set its state to CLOSED via the API
  2. Reload the board and click the "Closed" state filter
  3. Open the bug's row
  4. Select "Open" in the State dropdown
  5. Click Save
    - expect: the bug's row is no longer visible under the Closed filter
  6. Click the "Open" state filter
    - expect: the bug's row is visible

---

## Notes from live exploration

1. **The ID field is `readOnly`, not `disabled`.** It still resolves as a textbox, so
   `getByRole('textbox', { name: 'ID' })` works — assert read-only rather than expecting the element
   to be absent or disabled.
2. **Save's disabled state tracks real dirtiness, not just "touched."** Editing a field and then
   restoring its original value disables Save again (scenario 2.4). A test that types and then
   clears input will find Save disabled, which is correct behavior, not a bug.
3. **State option labels are title case (`Open`, `Closed`) while the stored values are upper case
   (`OPEN`, `CLOSED`).** Severity is upper case in both places. Use the visible labels for
   `selectOption` in UI tests, and the upper-case values when asserting against the API.
4. **State is not described in `09-edit-bug.md`** — it comes from `13-bug-status.md`. The edit modal
   is the only place state can be changed.
5. **Selector trap — the X button.** `getByRole('button', { name: 'Close' })` also matches the
   board's **"Closed"** state-filter button. Use `{ name: 'Close', exact: true }`.
6. **Selector trap — board rows.** Rows render as `<button>` elements inside the table body, not as
   `row` elements. Locate a row with
   `page.getByRole('button').filter({ hasText: '<unique title>' })`.
7. **Never edit a pre-existing bug.** The database is shared across runs and is not reset, so tests
   that mutate a row found on the board will interfere with each other. Create a bug via
   `POST /api/bugs` in the arrange step — the API needs no authentication — then reload the board.
   Use a unique title per test.
