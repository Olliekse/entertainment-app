export type User = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
};

const users: User[] = [
  {
    id: "1",
    name: "Test User",
    email: "test@example.com",
    // password: password123
    passwordHash:
      "$2a$10$lvIIP7R2VZ3MGZ8hEwQG.uj.oW1fHmECa/EXUoJgP4lpxigrXbSP2",
  },
];

export async function getUserByEmail(email: string): Promise<User | null> {
  return users.find((u) => u.email === email) ?? null;
}
