
import { useMutation } from "@tanstack/react-query";
import { register } from "../api/register";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../store/auth-slice";
import { useAppDispatch } from "@/hooks/use-app-dispatch";

export const useRegister = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    return useMutation({
        mutationFn: register,
        onSuccess: (data) => {
            dispatch(loginSuccess())
            localStorage.setItem("token", data.token)
            navigate("/dashboard");
        },
    });
};