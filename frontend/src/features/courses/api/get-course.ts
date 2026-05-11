
import { apiClient } from "@/services/api-client";
import type { CousesApiResponse } from "../types/course-types";

export const courses = async (): Promise<CousesApiResponse> => {
    const response = await apiClient.get("/courses");
    return response.data;
};