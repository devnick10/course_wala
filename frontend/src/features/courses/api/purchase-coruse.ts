
import { apiClient } from "@/services/api-client";
import type { ApiResponse } from "../types/course-types";

export const purchaseCourse = async (courseId: string): Promise<ApiResponse> => {
    const response = await apiClient.post(
        `/purchases/${courseId}`,
    );
    return response.data;
};
