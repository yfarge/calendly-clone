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
      <SidebarTrigger />
      <main className="p-6 w-full">{children}</main>
    </SidebarProvider>
  );
}
