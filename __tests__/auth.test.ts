import { hashPassword, verifyPassword, generateToken, verifyToken } from "@/lib/auth";

describe("Auth Library", () => {
  test("hash and verify password correctly", async () => {
    const password = "MySecret123!";
    const hashed = await hashPassword(password);
    expect(await verifyPassword(password, hashed)).toBe(true);
    expect(await verifyPassword("wrong", hashed)).toBe(false);
  });

  test("generate and verify JWT correctly", () => {
    process.env.JWT_SECRET = "testsecret";
    const token = generateToken({ id: "123", name: "Test User", email: "test@example.com", role: "customer" });
    const decoded = verifyToken(token);
    expect(decoded).toMatchObject({ id: "123", name: "Test User", email: "test@example.com", role: "customer" });
  });
});