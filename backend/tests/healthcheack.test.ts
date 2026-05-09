import req from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "../src/app";


describe("GET /user/signup", () => {
  it("Should return status 201 and jwt token", async () => {

    const response = await req(app).get("/")
    expect(response.status).toBe(200)
    expect(response.text).toEqual('Server is up!')
  })
})