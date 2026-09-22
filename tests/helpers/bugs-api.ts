import { expect, type APIRequestContext } from "@playwright/test";

export interface Bug {
  id: number;
  title: string;
  severity: string;
  owner: string;
  description: string;
  state: string;
}

export interface NewBug {
  title: string;
  severity?: "HIGH" | "MID" | "LOW";
  owner?: string;
  description?: string;
}

/**
 * The bug API needs no authentication, so tests can arrange their own data directly instead of
 * driving the create-bug modal. Requests go through the Vite dev server, which proxies /api to
 * the backend, so the configured baseURL is all that is needed.
 */
export async function createBug(
  request: APIRequestContext,
  bug: NewBug
): Promise<Bug> {
  const response = await request.post("/api/bugs", {
    data: {
      title: bug.title,
      severity: bug.severity ?? "MID",
      owner: bug.owner ?? "paul",
      description: bug.description ?? "Created by an automated test.",
    },
  });
  expect(response.status()).toBe(201);
  return (await response.json()) as Bug;
}

/** Replaces every field, since PUT is a full update rather than a patch. */
export async function updateBug(
  request: APIRequestContext,
  bug: Bug,
  changes: Partial<Omit<Bug, "id">>
): Promise<Bug> {
  const response = await request.put(`/api/bugs/${bug.id}`, {
    data: {
      title: changes.title ?? bug.title,
      severity: changes.severity ?? bug.severity,
      owner: changes.owner ?? bug.owner,
      description: changes.description ?? bug.description,
      state: changes.state ?? bug.state,
    },
  });
  expect(response.ok()).toBe(true);
  return (await response.json()) as Bug;
}

/** Returns the HTTP status for a bug — 200 when it exists, 404 once deleted. */
export async function getBugStatus(
  request: APIRequestContext,
  bugId: number
): Promise<number> {
  const response = await request.get(`/api/bugs/${bugId}`);
  return response.status();
}
