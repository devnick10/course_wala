import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuItem,
    SidebarProvider,
} from "@/components/ui/sidebar";

import { Skeleton } from "@/components/ui/skeleton";
import { CardSkeleton } from "./card-skeleton";

export const DashboardSkeleton: React.FC = () => {
    return (
        <SidebarProvider>
            <Sidebar
                side="left"
                variant="sidebar"
                collapsible="icon"
            >
                <SidebarHeader>
                    <div className="flex items-center gap-2 px-2 py-2">
                        <Skeleton className="h-9 w-9 rounded-lg" />

                        <div className="flex flex-col gap-2">
                            <Skeleton className="h-4 w-20" />

                            <Skeleton className="h-3 w-16" />
                        </div>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>
                            <Skeleton className="h-4 w-12" />
                        </SidebarGroupLabel>

                        <SidebarMenu className="space-y-2">
                            {Array.from({
                                length: 3,
                            }).map(
                                (_, index) => (
                                    <SidebarMenuItem
                                        key={
                                            index
                                        }
                                    >
                                        <div className="flex items-center gap-3 px-2 py-2">
                                            <Skeleton className="h-5 w-5 rounded-md" />

                                            <Skeleton className="h-4 w-24" />
                                        </div>
                                    </SidebarMenuItem>
                                )
                            )}
                        </SidebarMenu>
                    </SidebarGroup>
                </SidebarContent>

                <SidebarFooter>
                    <div className="rounded-lg border p-3">
                        <Skeleton className="mb-2 h-3 w-24" />

                        <Skeleton className="h-4 w-16" />
                    </div>
                </SidebarFooter>
            </Sidebar>

            <SidebarInset>
                {/* navbar skeleton */}
                <div className="flex items-center justify-between border-b px-6 py-4">
                    <Skeleton className="h-8 w-40" />

                    <Skeleton className="h-10 w-10 rounded-full" />
                </div>

                {/* page content skeleton */}
                <main className="space-y-6 p-6">
                    <div className="space-y-2">
                        <Skeleton className="h-8 w-48" />

                        <Skeleton className="h-4 w-72" />
                    </div>

                    <div className="flex gap-6 flex-wrap ">
                        {Array.from({
                            length: 6,
                        }).map(
                            (_, index) => (
                                <CardSkeleton />
                            )
                        )}
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}