# Create Bug Test Plan

## Application Overview

A logged-in BuggyBoard user creates bugs from the board page by clicking **New Bug** in the title
bar, which opens a modal titled "Create bug". The modal has four fields — Title, Severity, Owner,
Description — plus **Save**, **Cancel**, and an **X** in the header. Saving writes the bug to the
database and closes the modal; Cancel, X, and Escape all close it without saving, while clicking the
dimmed backdrop deliberately does *not*, so a user cannot lose input with a stray click.

Source spec: `specs/features/06-create-bug.md`. Every scenario below was checked against the running
app on 2026-09-22 with `playwright-cli`, and the notes at the bottom record where the live app is
more specific than the spec.

## Test Scenarios

### 1. Opening and closing the modal

**Seed:** `tests/seed.spec.ts`

#### 1.1. open-create-bug-modal

**File:** `tests/create-bug/open-create-bug-modal.spec.ts`

**Steps:**
  1. Click "New Bug" in the title bar
    - expect: a dialog titled "Create bug" is visible
    - expect: the dialog has a Title field
    - expect: the dialog has a Severity field
    - expect: the dialog has an Owner field
    - expect: the dialog has a Description field
    - expect: the dialog has a Save button
    - expect: the dialog has a Cancel button

#### 1.2. cancel-closes-without-saving

**File:** `tests/create-bug/cancel-closes-without-saving.spec.ts`

**Steps:**
  1. Click "New Bug" in the title bar
  2. Type "Cancelled bug" into the Title field
  3. Click Cancel
    - expect: the dialog is no longer visible
    - expect: no row titled "Cancelled bug" appears on the board

#### 1.3. x-button-closes-without-saving

**File:** `tests/create-bug/x-button-closes-without-saving.spec.ts`

**Steps:**
  1. Click "New Bug" in the title bar
  2. Type "Discarded by X" into the Title field
  3. Click the X button in the upper right corner of the dialog
    - expect: the dialog is no longer visible
    - expect: no row titled "Discarded by X" appears on the board

#### 1.4. escape-closes-without-saving

**File:** `tests/create-bug/escape-closes-without-saving.spec.ts`

**Steps:**
  1. Click "New Bug" in the title bar
  2. Type "Discarded by Escape" into the Title field
  3. Press the Escape key
    - expect: the dialog is no longer visible
    - expect: no row titled "Discarded by Escape" appears on the board

#### 1.5. backdrop-click-does-not-close

**File:** `tests/create-bug/backdrop-click-does-not-close.spec.ts`

**Steps:**
  1. Click "New Bug" in the title bar
  2. Type "Backdrop probe" into the Title field
  3. Click the dimmed area outside the dialog
    - expect: the dialog is still visible
    - expect: the Title field still contains "Backdrop probe"

#### 1.6. reopening-clears-previous-input

**File:** `tests/create-bug/reopening-clears-previous-input.spec.ts`

**Steps:**
  1. Click "New Bug" in the title bar
  2. Type "Abandoned draft" into the Title field
  3. Press the Escape key
  4. Click "New Bug" in the title bar again
    - expect: the Title field is empty
    - expect: the Description field is empty

### 2. Field defaults

**Seed:** `tests/seed.spec.ts`

#### 2.1. owner-defaults-to-current-user

**File:** `tests/create-bug/owner-defaults-to-current-user.spec.ts`

**Steps:**
  1. Click "New Bug" in the title bar
    - expect: the Owner field contains the username the seed logged in as

#### 2.2. severity-defaults-to-mid

**File:** `tests/create-bug/severity-defaults-to-mid.spec.ts`

**Steps:**
  1. Click "New Bug" in the title bar
    - expect: the Severity dropdown has "MID" selected
    - expect: the dropdown offers exactly HIGH, MID, and LOW

#### 2.3. title-field-is-focused-on-open

**File:** `tests/create-bug/title-field-is-focused-on-open.spec.ts`

**Steps:**
  1. Click "New Bug" in the title bar
    - expect: the Title field has keyboard focus

### 3. Saving a bug

**Seed:** `tests/seed.spec.ts`

#### 3.1. save-new-bug-with-required-fields

**File:** `tests/create-bug/save-new-bug-with-required-fields.spec.ts`

**Steps:**
  1. Click "New Bug" in the title bar
  2. Type a unique title into the Title field
  3. Select "HIGH" in the Severity dropdown
  4. Type "When I use < and > in my password, login fails." into the Description field
  5. Click Save
    - expect: the dialog is no longer visible
    - expect: a row with that title appears on the board
    - expect: that row shows severity HIGH
    - expect: that row shows the current user as owner

#### 3.2. new-bug-starts-in-open-state

**File:** `tests/create-bug/new-bug-starts-in-open-state.spec.ts`

**Steps:**
  1. Create a bug with a unique title and valid values in every field
  2. Leave the state filter on its default "Open" setting
    - expect: the new row is visible on the board
  3. Switch the state filter to "Closed"
    - expect: the new row is not visible

#### 3.3. severity-dropdown-uses-severity-colors

**File:** `tests/create-bug/severity-dropdown-uses-severity-colors.spec.ts`

**Steps:**
  1. Click "New Bug" in the title bar
  2. Select "HIGH" in the Severity dropdown
    - expect: the dropdown text color is the HIGH terracotta (`rgb(184, 74, 46)` / `#b84a2e`)
  3. Select "MID" in the Severity dropdown
    - expect: the dropdown text color is the MID amber (`#a67c47`)
  4. Select "LOW" in the Severity dropdown
    - expect: the dropdown text color is the LOW sage (`#4a6b5e`)

#### 3.4. owner-can-be-changed-before-saving

**File:** `tests/create-bug/owner-can-be-changed-before-saving.spec.ts`

**Steps:**
  1. Click "New Bug" in the title bar
  2. Replace the Owner field contents with "vanny"
  3. Fill in a unique title and a description
  4. Click Save
    - expect: the new row on the board shows "vanny" as owner

### 4. Validation

**Seed:** `tests/seed.spec.ts`

#### 4.1. title-must-not-be-blank

**File:** `tests/create-bug/title-must-not-be-blank.spec.ts`

**Steps:**
  1. Click "New Bug" in the title bar
  2. Leave the Title field blank and fill in a description
  3. Click Save
    - expect: the dialog is still visible
    - expect: the message "Title is required." is visible

#### 4.2. description-must-not-be-blank

**File:** `tests/create-bug/description-must-not-be-blank.spec.ts`

**Steps:**
  1. Click "New Bug" in the title bar
  2. Fill in a title and leave the Description field blank
  3. Click Save
    - expect: the dialog is still visible
    - expect: the message "Description is required." is visible
    - expect: no new row is added to the board

#### 4.3. owner-must-not-be-blank

**File:** `tests/create-bug/owner-must-not-be-blank.spec.ts`

**Steps:**
  1. Click "New Bug" in the title bar
  2. Fill in a title and a description
  3. Clear the pre-filled Owner field
  4. Click Save
    - expect: the dialog is still visible
    - expect: the message "Owner is required." is visible
    - expect: no new row is added to the board

#### 4.4. whitespace-only-title-is-rejected

**File:** `tests/create-bug/whitespace-only-title-is-rejected.spec.ts`

**Steps:**
  1. Click "New Bug" in the title bar
  2. Type three spaces into the Title field
  3. Fill in a description
  4. Click Save
    - expect: the dialog is still visible
    - expect: the message "Title is required." is visible

#### 4.5. all-missing-fields-are-listed-together

**File:** `tests/create-bug/all-missing-fields-are-listed-together.spec.ts`

**Steps:**
  1. Click "New Bug" in the title bar
  2. Click Save without entering anything
    - expect: the dialog is still visible
    - expect: the message "Title is required." is visible
    - expect: the message "Description is required." is visible
    - expect: no new row is added to the board

#### 4.6. validation-clears-after-fixing-the-field

**File:** `tests/create-bug/validation-clears-after-fixing-the-field.spec.ts`

**Steps:**
  1. Click "New Bug" in the title bar
  2. Click Save without entering anything
    - expect: the message "Title is required." is visible
  3. Fill in a unique title and a description
  4. Click Save
    - expect: the dialog is no longer visible
    - expect: the new row appears on the board

---

## Notes from live exploration

Findings that the spec does not state, recorded so whoever generates the code does not rediscover
them the hard way.

1. **Severity cannot be blank through the UI.** The dropdown defaults to `MID` with no empty option,
   so the `| severity |` row of the spec's *"Each required field must not be blank"* Scenario Outline
   (`specs/features/06-create-bug.md:117-132`) is **not reachable from the UI**. It belongs in an API
   test, not a UI test. Scenario 2.2 covers the default instead.
2. **Save is never disabled on the create modal.** Validation fires on click, rendering an `alert`
   containing a list of `<field> is required.` messages. (This differs from the *edit* modal, where
   Save is disabled until something changes — do not assume symmetry.)
3. **Validation messages are exact strings**: `Title is required.`, `Description is required.`,
   `Owner is required.` — including the trailing period.
4. **Titles are trimmed before validation**, so a whitespace-only title is treated as blank (4.4).
5. **Selector trap — the X button.** `getByRole('button', { name: 'Close' })` is ambiguous: it also
   matches the board's **"Closed"** state-filter button. Use
   `getByRole('button', { name: 'Close', exact: true })`.
6. **Selector trap — board rows.** Rows render as `<button>` elements inside the table body, not as
   `row` elements, so `getByRole('row')` will not find them.
7. **New bugs are always created `OPEN`**, and the board's state filter defaults to Open, so a new
   bug is visible immediately (3.2).
8. **Tests create data that persists.** The SQLite database is not reset between runs. Use a unique
   title per test (a UUID suffix) so assertions cannot collide with rows left by earlier runs, and
   do not assert on total row counts.

9. **"No new row was added" is only assertable when the scenario supplies a title.** Because the
   config runs `fullyParallel`, other workers add and remove rows mid-test, so a before/after row
   count is not a safe assertion. Scenarios 4.1 and 4.5 (Title blank) and 4.4 (whitespace-only
   title) therefore assert only that the modal stayed open with the right message — there is no
   unique title to search the board for. Scenarios 4.2 and 4.3 do supply a title, so they assert
   the row is absent.
