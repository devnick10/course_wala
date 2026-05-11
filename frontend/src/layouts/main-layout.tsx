import { Outlet } from "react-router-dom";

import {Navbar} from "../components/shared/navbar";
import {Footer} from "../components/shared/footer";

export const MainLayout:React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1 container mx-auto p-4">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};
