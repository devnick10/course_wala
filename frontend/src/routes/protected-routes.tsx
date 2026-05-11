// src/routes/protected-route.tsx

import { DashboardSkeleton } from "@/components/shared/dashboard-skeleton";
import { Spinner } from "@/components/ui/spinner";
import { useMe } from "@/features/auth/hooks/use-me";
import { Navigate, Outlet } from "react-router-dom";


export const ProtectedRoute = () => {
    const {
        data,
        isPending,
        isError,
    } = useMe();

    if (isPending) {
        return <DashboardSkeleton />
    }

    if (isError || !data?.user) {
        return (
            <Navigate
                to="/auth/login"
                replace
            />
        );
    }

    return <Outlet />;
};