import dotenv from "dotenv"
dotenv.config();

const _config = {
    NODE_ENV: process.env.NODE_ENV?.trim() || 'DEVELOPMENT',
    MONGO_URL: process.env.MONGO_URL?.trim(),
    PORT: process.env.PORT?.trim() || 3000,
    JWT_USER_SECRET:process.env.JWT_USER_SECRET?.trim() || "user_secret",
    JWT_ADMIN_SECRET:process.env.JWT_ADMIN_SECRET?.trim()|| "admin_secret"
}
export const config = Object.freeze(_config);