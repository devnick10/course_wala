
import { apiClient } from "@/services/api-client";
import type { ApiResponse } from "../types/course-types";


export const deleteCourse = async (courseId: string): Promise<ApiResponse> => {
    const response = await apiClient.delete(
        `/courses/${courseId}`,
    );
    return response.data;
};