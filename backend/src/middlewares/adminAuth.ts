import { config } from "@/config/index.js";
import { TryCatch } from "./error.js";

import jwt, { JwtPayload } from "jsonwebtoken"
import HttpError from "@/utils/errorHandler.js";

const adminAuth = TryCatch(async (req, res, next) => {
    const authHeader = req.headers.authorization || "";
    const token = authHeader?.split(" ")[1];
    try {
        const decodePayload = jwt.verify(token, config.JWT_ADMIN_SECRET) as JwtPayload
        if (!decodePayload || !decodePayload.id) {
            throw new HttpError(401, "Unautorized")
        }
        // @ts-expect-error userId not defined on req obejct types error 
        req.userId = decodePayload.id;
        next();
    } catch (error: HttpError | Error | unknown) {
        throw new HttpError(401,
            error instanceof HttpError
                ? error.message
                : "Unauthorized")
    }
})

export { adminAuth };