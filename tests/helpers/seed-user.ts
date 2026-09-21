import users from "../../users.json" with { type: "json" };

const seedUser = users[0];
if (!seedUser) {
  throw new Error("users.json must contain at least one user");
}

export { seedUser };
