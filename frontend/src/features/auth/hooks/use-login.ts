
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { login } from "../api/login";
import { loginSuccess } from "../store/auth-slice";
import { useAppDispatch } from "@/hooks/use-app-dispatch";

export const useLogin = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    return useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            dispatch(loginSuccess())
            localStorage.setItem("token",data.token)
            navigate("/dashboard");
        },
    });
};