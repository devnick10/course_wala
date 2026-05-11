
import { Navbar } from "../components/shared/navbar";
import { Footer } from "../components/shared/footer";
import { Outlet } from "react-router-dom";

export const AuthLayout: React.FC = () => {
    return (
        <div className="w-full max-w-7xl mx-auto min-h-screen flex flex-col  ">
            <Navbar />
            <main className="flex-1 container mx-auto p-4 max-w-4xl sm:pt-20">
                <Outlet />
            </main >
            <Footer />
        </div>
    );
};
