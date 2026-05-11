
import { apiClient } from "@/services/api-client";

import type{
    AuthResponse,
    RegisterInput,
} from "../types/auth-types";

export const register = async (
    data: RegisterInput
): Promise<AuthResponse> => {
    const response = await apiClient.post(
        "auth/users/signup",
        data
    );

    return response.data;
};