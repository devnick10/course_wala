
import { useMutation } from "@tanstack/react-query";
import { deleteCourse } from "../api/delete-course";

export const useDeleteCourse = () => {
    return useMutation({
        mutationFn: deleteCourse,
    });
};