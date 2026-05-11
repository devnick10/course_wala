
import { apiClient } from "@/services/api-client";
import type { ApiResponse, Course } from "../types/course-types";

export const createCourses = async (data: Omit<Course, "author">): Promise<ApiResponse> => {
    const response = await apiClient.post(
        "/courses",
        data
    );
    return response.data;
};
