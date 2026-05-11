import React from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/services/query-client'
import { TooltipProvider } from "@/components/ui/tooltip"
import { Provider as StoreProvider } from "react-redux"
import { store } from './store'
import { SidebarProvider } from '@/components/ui/sidebar'
export const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <StoreProvider store={store}>
        <QueryClientProvider client={queryClient}>
            <TooltipProvider >
                <SidebarProvider>
                {children}
                </SidebarProvider>
            </TooltipProvider >
        </QueryClientProvider>
    </StoreProvider>
}
