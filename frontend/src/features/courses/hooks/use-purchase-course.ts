
import { useMutation } from "@tanstack/react-query";
import { purchaseCourse } from "../api/purchase-coruse";

export const usePurchaseCourse = () => {
    return useMutation({
        mutationFn: purchaseCourse,
    });
};