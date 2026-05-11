
import {
    BookAIcon,
    CreditCard
} from "lucide-react";

import { NavLink, Outlet } from "react-router-dom";

import { Navbar } from "@/components/shared/navbar";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
} from "@/components/ui/sidebar";
import type React from "react";

const menuItems = [
    {
        title: "Courses",
        icon: BookAIcon,
        href: "/dashboard",
    },
    {
        title: "Purchases",
        icon: CreditCard,
        href: "/dashboard/purchases",
    },
    // {
    //     title: "Settings",
    //     icon: Settings,
    //     href: "/dashboard/settings",
    // },
];

const adminMenuItems = [
    {
        title: "Courses",
        icon: BookAIcon,
        href: "/dashboard",
    },
];

export const DashboardLayout: React.FC =
    () => {
        return (
            <SidebarProvider>
                <Sidebar
                    side="left"
                    variant="sidebar"
                    collapsible="icon"
                >
                    <SidebarHeader>
                        <div className="flex items-center  gap-2 px-2 py-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-black text-white">
                                C
                            </div>

                            <div className="flex flex-col">
                                <span className="text-sm font-semibold">
                                    CSAPP
                                </span>

                                <span className="text-xs text-muted-foreground">
                                    Dashboard
                                </span>
                            </div>
                        </div>
                    </SidebarHeader>

                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupLabel className="text-[1rem]">
                                Menu
                            </SidebarGroupLabel>

                            <SidebarMenu>
                                {menuItems.map(
                                    (item) => (
                                        <SidebarMenuItem
                                            key={
                                                item.title
                                            }
                                        >
                                            <SidebarMenuButton
                                                asChild
                                                tooltip={
                                                    item.title
                                                }
                                            >
                                                <NavLink
                                                    to={
                                                        item.href
                                                    }
                                                    className={({
                                                        isActive
                                                    }) =>
                                                        isActive
                                                            ? "bg-muted flex gap-2 text-[0.9rem]"
                                                            : "flex gap-2 text-[0.9rem]"
                                                    }
                                                >
                                                    <item.icon />

                                                    <span>
                                                        {
                                                            item.title
                                                        }
                                                    </span>
                                                </NavLink>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    )
                                )}
                            </SidebarMenu>
                        </SidebarGroup>
                    </SidebarContent>

                    <SidebarFooter>
                        <div className="rounded-lg border p-3 text-sm flex">
                            Logged in as
                            <div className="font-medium">
                                Nick
                            </div>
                        </div>
                    </SidebarFooter>
                </Sidebar>

                <SidebarInset>
                    <Navbar />
                    <main className="flex-1 p-6">
                        <Outlet />
                    </main>
                </SidebarInset>
            </SidebarProvider>
        );
    };


