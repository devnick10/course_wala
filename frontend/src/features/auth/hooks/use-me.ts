import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api/me";
import { loginSuccess, setUser } from "../store/auth-slice";
import { useAppDispatch } from "@/hooks/use-app-dispatch";

export const useMe = () => {
    const dispatch = useAppDispatch()

    const result = useQuery({
        queryKey: ["me"],
        queryFn: getMe,
        retry: false,
        staleTime: 1000 * 60 * 5,
    });
    if (result.isSuccess) {
        dispatch(setUser(result.data.user))
        dispatch(loginSuccess())
    }
    return result;
};