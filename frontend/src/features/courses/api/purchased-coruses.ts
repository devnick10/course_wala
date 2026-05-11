
import { apiClient } from "@/services/api-client";
import type { CousesApiResponse } from "../types/course-types";


export const purchasedCourses = async (): Promise<CousesApiResponse> => {
    const response = await apiClient.get("/purchases");
    return response.data;
};