
import { apiClient } from "@/services/api-client";
import type {
    AuthResponse,
    LoginInput,
} from "../types/auth-types";

export const login = async (data: LoginInput): Promise<AuthResponse> => {
    const response = await apiClient.post(
        "/auth/users/signin",
        data
    );
    return response.data;
};
