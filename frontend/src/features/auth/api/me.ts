
import { apiClient } from "@/services/api-client";

import type { GetMeResponse } from "../types/auth-types";

export const getMe = async (): Promise<GetMeResponse> => {
    const response = await apiClient.get("/auth/users/me");
    return response.data;
};