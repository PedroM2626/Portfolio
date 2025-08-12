import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import request from "supertest";
import { createServer } from "../index";
import * as mailer from "../utils/mailer";

describe("POST /api/contact", () => {
  const app = createServer();

  beforeAll(() => {
    vi.spyOn(mailer, "getTransporter").mockReturnValue({
      sendMail: vi.fn().mockResolvedValue({ messageId: "test-id" }),
    } as any);
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it("validates body and returns 400 for invalid data", async () => {
    const res = await request(app).post("/api/contact").send({});
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it("sends email and returns 200 for valid data", async () => {
    const res = await request(app)
      .post("/api/contact")
      .send({
        name: "Tester",
        email: "tester@example.com",
        subject: "Hello",
        message: "World",
      });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});


