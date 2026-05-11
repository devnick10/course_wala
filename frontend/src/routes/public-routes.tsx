// src/routes/public-route.tsx

import { Navigate, Outlet } from "react-router-dom";

import { useMe } from "@/features/auth/hooks/use-me";

export const PublicRoute = () => {
    const { data, isPending } =
        useMe();

    if (isPending) {
        return (
            <div className="h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    // already logged in
    if (data?.user) {
        return (
            <Navigate
                to="/dashboard"
                replace
            />
        );
    }

    return <Outlet />;
};