import { useQuery } from "@tanstack/react-query";
import { courses } from "../api/get-course";

export const useCourses = () => {
    const result = useQuery({
        queryKey: ["courses"],
        queryFn: courses,
        retry: false,
        staleTime: 1000 * 60 * 5,
    });
    return result;
};