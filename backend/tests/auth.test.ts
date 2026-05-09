import request from "supertest";
import {
    beforeEach,
    describe,
    expect,
    it,
    vi,
} from "vitest";

import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import mockingoose from "mockingoose";

import { app } from "../src/app.js";
import { User } from "../src/models/user.js";
import { Admin} from "../src/models/admin.js";

vi.mock("bcrypt", () => ({
    hash: vi.fn(),
    compare: vi.fn(),
}));

vi.mock("jsonwebtoken", () => ({
    default: {
        sign: vi.fn(),
    },
}));

vi.mock("../src/middlewares/auth.js", () => ({
    auth: (req: any, _res: any, next: any) => {
        req.userId = "507f191e810c19729de860eb";
        next();
    },
}));


describe("POST /api/v1/auth/users/signup", () => {
    beforeEach(() => {
        mockingoose.resetAll();
        vi.clearAllMocks();
    });

    it("should signup user and return jwt token", async () => {
        mockingoose(User).toReturn(null, "findOne");

        mockingoose(User).toReturn(
            {
                _id: "507f191e810c19729de860ea",
                name: "Nick",
                email: "nick@test.com",
                password: "hashedpassword",
            },
            "save"
        );

        vi.mocked(hash).mockResolvedValue(
            "hashedpassword" as never
        );

        vi.mocked(jwt.sign as any).mockReturnValue(
            "mocked-jwt-token"
        );

        const response = await request(app)
            .post("/api/v1/auth/users/signup")
            .send({
                name: "Nick",
                email: "nick@test.com",
                password: "12345678",
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("token");
        expect(response.body.token).toBe(
            "mocked-jwt-token"
        );
        expect(response.body.mesage).toBe(
            "signup successsfully"
        );
    });

    it("should return 409 if email already exists", async () => {
        mockingoose(User).toReturn(
            {
                _id: "507f191e810c19729de860ea",
                email: "nick@test.com",
            },
            "findOne"
        );

        const response = await request(app)
            .post("/api/v1/auth/users/signup")
            .send({
                name: "Nick",
                email: "nick@test.com",
                password: "12345678",
            });

        expect(response.status).toBe(409);
        expect(response.body.message).toBe(
            "Email already taken!"
        );
    });

    it("should return 400 for invalid body", async () => {
        const response = await request(app)
            .post("/api/v1/auth/users/signup")
            .send({
                email: "wrong",
            });

        expect(response.status).toBe(400);
    });
});

describe("POST /api/v1/auth/users/signin", () => {
    beforeEach(() => {
        mockingoose.resetAll();
        vi.clearAllMocks();
    });

    it("should signin user and return jwt token", async () => {
        mockingoose(User).toReturn(
            {
                _id: "507f191e810c19729de860ea",
                name: "Nick",
                email: "nick@test.com",
                password: "hashedpassword",
            },
            "findOne"
        );

        vi.mocked(compare).mockResolvedValue(
            true as never
        );
        vi.mocked(jwt.sign as any).mockReturnValue(
            "mocked-jwt-token"
        );

        const response = await request(app)
            .post("/api/v1/auth/users/signin")
            .send({
                email: "nick@test.com",
                password: "12345678",
            });

        expect(response.status).toBe(200);

        expect(response.body).toHaveProperty("token");

        expect(response.body.token).toBe(
            "mocked-jwt-token"
        );

        expect(response.body.mesage).toBe(
            "signin successsfully"
        );
    });

    it("should return 400 if validation failed", async () => {
        const response = await request(app)
            .post("/api/v1/auth/users/signin")
            .send({
                email: { wrong: true },
                password: 12345678,
            });

        expect(response.status).toBe(400);
    });

    it("should return 401 for invalid credentials", async () => {
        mockingoose(User).toReturn(
            {
                _id: "507f191e810c19729de860ea",
                email: "nick@test.com",
                password: "hashedpassword",
            },
            "findOne"
        );

        vi.mocked(compare).mockResolvedValue(
            false as never
        );

        const response = await request(app)
            .post("/api/v1/auth/users/signin")
            .send({
                email: "nick@test.com",
                password: "wrongpassword",
            });

        expect(response.status).toBe(401);
        expect(response.body.message).toBe(
            "Invalid credentials"
        );
    });
});

describe("POST /api/v1/auth/admins/signup", () => {
    beforeEach(() => {
        mockingoose.resetAll();
        vi.clearAllMocks();
    });

    it("should signup admin and return jwt token", async () => {
        mockingoose(Admin).toReturn(null, "findOne");

        mockingoose(Admin).toReturn(
            {
                _id: "507f191e810c19729de860ea",
                name: "Nick",
                email: "nick@test.com",
                password: "hashedpassword",
            },
            "save"
        );

        vi.mocked(hash).mockResolvedValue(
            "hashedpassword" as never
        );

        vi.mocked(jwt.sign as any).mockReturnValue(
            "mocked-jwt-token"
        );

        const response = await request(app)
            .post("/api/v1/auth/admins/signup")
            .send({
                name: "Nick",
                email: "nick@test.com",
                password: "12345678",
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("token");
        expect(response.body.token).toBe(
            "mocked-jwt-token"
        );
        expect(response.body.mesage).toBe(
            "signup successsfully"
        );
    });

    it("should return 409 if email already exists", async () => {
        mockingoose(Admin).toReturn(
            {
                _id: "507f191e810c19729de860ea",
                email: "nick@test.com",
            },
            "findOne"
        );

        const response = await request(app)
            .post("/api/v1/auth/admins/signup")
            .send({
                name: "Nick",
                email: "nick@test.com",
                password: "12345678",
            });

        expect(response.status).toBe(409);
        expect(response.body.message).toBe(
            "Email already taken!"
        );
    });

    it("should return 400 for invalid body", async () => {
        const response = await request(app)
            .post("/api/v1/auth/admins/signup")
            .send({
                email: "wrong",
            });

        expect(response.status).toBe(400);
    });
});

describe("POST /api/v1/auth/admins/signin", () => {
    beforeEach(() => {
        mockingoose.resetAll();
        vi.clearAllMocks();
    });

    it("should signin Admin and return jwt token", async () => {
        mockingoose(Admin).toReturn(
            {
                _id: "507f191e810c19729de860ea",
                name: "Nick",
                email: "nick@test.com",
                password: "hashedpassword",
            },
            "findOne"
        );

        vi.mocked(compare).mockResolvedValue(
            true as never
        );
        vi.mocked(jwt.sign as any).mockReturnValue(
            "mocked-jwt-token"
        );

        const response = await request(app)
            .post("/api/v1/auth/Admins/signin")
            .send({
                email: "nick@test.com",
                password: "12345678",
            });

        expect(response.status).toBe(200);

        expect(response.body).toHaveProperty("token");

        expect(response.body.token).toBe(
            "mocked-jwt-token"
        );

        expect(response.body.mesage).toBe(
            "signin successsfully"
        );
    });

    it("should return 400 if validation failed", async () => {
        const response = await request(app)
            .post("/api/v1/auth/Admins/signin")
            .send({
                email: { wrong: true },
                password: 12345678,
            });

        expect(response.status).toBe(400);
    });

    it("should return 401 for invalid credentials", async () => {
        mockingoose(Admin).toReturn(
            {
                _id: "507f191e810c19729de860ea",
                email: "nick@test.com",
                password: "hashedpassword",
            },
            "findOne"
        );

        vi.mocked(compare).mockResolvedValue(
            false as never
        );

        const response = await request(app)
            .post("/api/v1/auth/users/signin")
            .send({
                email: "nick@test.com",
                password: "wrongpassword",
            });

        expect(response.status).toBe(401);
        expect(response.body.message).toBe(
            "Invalid credentials"
        );
    });
});


