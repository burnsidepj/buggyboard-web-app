# Product Vision: BuggyBoard

## What It Is

BuggyBoard is a **basic bug tracker** web app. It will serve as the **system under test (SUT)** for an online course on testing web apps with Playwright.

## Theme

The app theme is the **classic air-cooled Volkswagen Beetle**—a play on the word "Bug."

## Main Views

1. **Login page** – Users sign in with username and password.
2. **Board page** – Users see all bugs that have been opened (list/board of bugs).
3. **Bug view** – Users can view, create, edit, and delete a single bug.

## User Model

- A user has **full access** to all bugs created in the app (no per-bug or per-project permissions in this version).

## Testing

Playwright tests are part of feature delivery. Every new feature includes tests that cover its new behavior. Conventions live in `specs/engineering/test-automation-patterns.md`.
