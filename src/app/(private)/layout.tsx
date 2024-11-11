import { SidebarNavigation } from '@/components/SidebarNavigation';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function PrivateLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <SidebarNavigation />
            <main className="my-6 w-full">
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    );
}
