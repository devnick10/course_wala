import { useQuery } from "@tanstack/react-query";
import { purchasedCourses } from "../api/purchased-coruses";

export const usePurchasedCourses = () => {
    const result = useQuery({
        queryKey: ["purchasedCourses"],
        queryFn: purchasedCourses,
        retry: false,
        staleTime: 1000 * 60 * 5,
    });
    return result;
};