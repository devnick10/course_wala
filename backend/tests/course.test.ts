import request from "supertest";
import {
    afterEach,
    beforeAll,
    beforeEach,
    describe,
    expect,
    it,
    vi,
} from "vitest";

import mockingoose from "mockingoose";

import { app } from "../src/app.js";
import { Course } from "../src/models/course.js";
import { myCache } from "../src/lib/cache.js";

vi.mock("bcrypt", () => ({
    hash: vi.fn(),
    compare: vi.fn(),
}));

vi.mock("jsonwebtoken", () => ({
    default: {
        sign: vi.fn(),
    },
}));

vi.mock("../src/middlewares/userAuth.js", () => ({
    userAuth: (req: any, _res: any, next: any) => {
        req.userId = "507f191e810c19729de860eb";
        next();
    },
}));

vi.mock("../src/middlewares/adminAuth.js", () => ({
    adminAuth: (req: any, _res: any, next: any) => {
        req.adminId = "507f191e810c19729de860ed";
        next();
    },
}));

beforeAll(() => {
    mockingoose.resetAll();
    vi.clearAllMocks();
});

describe("POST /api/v1/courses", () => {
    beforeEach(() => {
        mockingoose.resetAll();
        vi.clearAllMocks();
        myCache.flushAll();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("should create course by admin", async () => {
        mockingoose(Course).toReturn(
            {
                _id: "507f191e810c19729de860ex",
                title: "web dev course",
                thumbnail: "https://thumbnail.test.com",
                description: "full stack development course",
                video: "https://lectures.webdevcourse.com",
                author: "507f191e810c19729de860ed",
                price:50000
            },
            "save"
        );

        const response = await request(app)
            .post("/api/v1/courses")
            .send({
                title: "web dev course",
                thumbnail: "https://thumbnail.test.com",
                description: "full stack development course",
                video: "https://lectures.webdevcourse.com",
                price:50000
            });

        expect(response.status).toBe(201);

        expect(response.body.mesage).toBe(
            "Course created successsfully"
        );
    });

    it("should return 400 for invalid body", async () => {
        const response = await request(app)
            .post("/api/v1/courses")
            .send({
                title: "",
            });

        expect(response.status).toBe(400);
    });
});

describe("GET /api/v1/courses", () => {
    beforeEach(() => {
        mockingoose.resetAll();
        vi.clearAllMocks();
        myCache.flushAll();
    });

    it("should return all available courses", async () => {
        mockingoose(Course).toReturn(
            [
                {
                    _id: "507f191e810c19729de860ex",
                    title: "web dev course",
                    thumbnail: "https://thumbnail.test.com",
                    description: "full stack development course",
                    video: "https://lectures.webdevcourse.com",
                    author: "507f191e810c19729de860ed",
                },
            ],
            "find"
        );

        const response = await request(app)
            .get("/api/v1/courses");

        expect(response.status).toBe(200);

        expect(Array.isArray(response.body.data)).toBe(true);

        expect(response.body.data.length).toBe(1);

        expect(response.body.data[0].title).toBe(
            "web dev course"
        );
    });

    it("should return 500 if server error", async () => {
        myCache.flushAll();

        mockingoose(Course).toReturn(
            new Error("Database error"),
            "find"
        );

        const response = await request(app)
            .get("/api/v1/courses");

        expect(response.status).toBe(500);

        expect(response.body.message).toBe(
            "Database error"
        );
    });
});

describe("DELETE /api/v1/courses/:courseId", () => {
    beforeEach(() => {
        mockingoose.resetAll();
        vi.clearAllMocks();
    });
    it("should delete course by admin", async () => {
        mockingoose(Course).toReturn(
            {
                _id: "507f191e810c19729de860ef",
                author: "507f191e810c19729de860ed",
            },
            "findOneAndDelete"
        );

        const response = await request(app).delete(
            "/api/v1/courses/507f191e810c19729de860ef"
        );
        
        expect(response.status).toBe(204);
    });

    it("should return 400 for invalid course id", async () => {
        const response = await request(app)
            .delete("/api/v1/courses/invalid-id");

        expect(response.status).toBe(400);
    });
});