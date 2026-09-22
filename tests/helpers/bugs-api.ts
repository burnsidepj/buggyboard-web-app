import { type APIRequestContext } from "@playwright/test";

export type BugRecord = {
  id: number;
  title: string;
  severity: string;
  owner: string;
  creator: string;
  description: string;
  state?: string;
};

export type CreateBugPayload = {
  title: string;
  severity: string;
  owner: string;
  creator: string;
  description: string;
};

export class BugsApi {
  constructor(private readonly request: APIRequestContext) {}

  async listBugs(): Promise<BugRecord[]> {
    const response = await this.request.get("/api/bugs");
    return (await response.json()) as BugRecord[];
  }

  async findByTitle(title: string): Promise<BugRecord | undefined> {
    const bugs = await this.listBugs();
    return bugs.find((bug) => bug.title === title);
  }

  async createBug(payload: CreateBugPayload): Promise<BugRecord> {
    const response = await this.request.post("/api/bugs", { data: payload });
    if (!response.ok()) {
      throw new Error(`Failed to create bug: ${response.status()} ${await response.text()}`);
    }
    return (await response.json()) as BugRecord;
  }
}
