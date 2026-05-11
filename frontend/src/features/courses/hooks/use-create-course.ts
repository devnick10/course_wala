
import { useMutation } from "@tanstack/react-query";
import { createCourses } from "../api/create-course";

export const useCreateCourse = () => {
    return useMutation({
        mutationFn: createCourses,
    });
};