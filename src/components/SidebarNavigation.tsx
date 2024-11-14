import { Calendar, CalendarFold, History } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { UserButton } from '@clerk/nextjs';

const items = [
  {
    title: 'Events',
    url: '/events',
    icon: Calendar,
  },
  {
    title: 'Schedule',
    url: '/schedule',
    icon: History,
  },
];

export function SidebarNavigation() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex gap-2 p-1 font-bold">
          <CalendarFold />
          Calendly Clone
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuItem>
          <UserButton />
        </SidebarMenuItem>
      </SidebarFooter>
    </Sidebar>
  );
}
