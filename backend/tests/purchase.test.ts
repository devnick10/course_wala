import request from "supertest";
import {
    beforeAll,
    beforeEach,
    describe,
    expect,
    it,
    vi,
} from "vitest";

import mockingoose from "mockingoose";
import { app } from "../src/app.js";
import { Purchase } from "../src/models/purchese.js";
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


beforeAll(() => {
    mockingoose.resetAll();
    vi.clearAllMocks();
});

describe("POST /api/v1/purchases/:courseId", () => {
    beforeEach(() => {
        mockingoose.resetAll();
        vi.clearAllMocks();
    });

    it("should purchase course", async () => {
        mockingoose(Purchase).toReturn(
            {
                _id: "507f191e810c19729de860ea",
                userId: "507f191e810c19729de860eb",
                courseId: "507f191e810c19729de860ec",
            },
            "save"
        );

        const response = await request(app)
            .post(
                "/api/v1/purchases/507f191e810c19729de860ec"
            );

        expect(response.status).toBe(200);

        expect(response.body.mesage).toBe(
            "Course purchase successfullly"
        );
    });

    it("should return 400 for invalid course id", async () => {
        const response = await request(app)
            .post("/api/v1/purchases/invalid-id");

        expect(response.status).toBe(400);

        expect(response.body.message).toBe(
            "Invalid course id"
        );
    });

});

describe("GET /api/v1/purchases", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it("should fetch purchased courses", async () => {
        const mockedCourses = [
            {
                _id: "1",
                userId: "507f191e810c19729de860eb",
                courseDetails: {
                    title: "React Course",
                },
            },
        ];

        vi.spyOn(Purchase, "aggregate").mockResolvedValue(
            mockedCourses as any
        );

        const response = await request(app)
            .get("/api/v1/purchases")

        expect(response.status).toBe(200);

        expect(response.body.message).toBe(
            "Courses fetched successfully"
        );

        expect(response.body.data).toEqual(
            mockedCourses
        );

        expect(Purchase.aggregate).toHaveBeenCalled();
    });

    it("should return cached purchased courses", async () => {
        const mockedCourses = [
            {
                title: "Node Course",
            },
        ];

        myCache.set(
            "purchasedCourses_507f191e810c19729de860eb",
            JSON.stringify(mockedCourses),
            10
        );

        const response = await request(app)
            .get("/api/v1/purchases");

        expect(response.status).toBe(200);

        expect(response.body.message).toBe(
            "Courses fetched successfully (cache)"
        );

        expect(response.body.data).toEqual(
            mockedCourses
        );
    });
});