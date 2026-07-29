import { useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

import { useAppSelector } from "@/store/hooks";
import { selectUserPermissions } from "@/store/slices/authSlice";
import {
  filterMenuByPermission,
  type MenuItem,
} from "@/features/auth/utils/filter-menu";
import { MENU_ITEMS, MENU_GROUPS } from "@/config/menu-items";
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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// ─── Sidebar item ────────────────────────────────────────────────────
interface NavItemProps {
  item: MenuItem;
  pathname: string;
}

const NavItem = ({ item, pathname }: NavItemProps) => {
  const hasChildren = item.children && item.children.length > 0;

  if (!hasChildren) {
    const isActive = pathname === item.path;
    return (
      <SidebarMenuItem>
        <Link to={item.path ?? "#"} style={{ textDecoration: "none" }}>
          <SidebarMenuButton isActive={isActive}>
            {item.icon}
            <span>{item.label}</span>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    );
  }

  const isActive = item.children?.some((c) => c.path && pathname === c.path) ?? false;

  return (
    <Collapsible defaultOpen={isActive} className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger>
          <SidebarMenuButton isActive={isActive}>
            {item.icon}
            <span>{item.label}</span>
            <ChevronRight className="ml-auto size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.children!.map((child) => (
              <SidebarMenuSubItem key={child.key}>
                <Link to={child.path ?? "#"} style={{ textDecoration: "none" }}>
                  <SidebarMenuSubButton isActive={pathname === child.path}>
                    {child.label}
                  </SidebarMenuSubButton>
                </Link>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
};

// ─── AdminSidebar ────────────────────────────────────────────────────
const AdminSidebar = () => {
  const { pathname } = useLocation();
  const permissions = useAppSelector(selectUserPermissions);

  const hasPermission = (perm: string) => permissions.includes(perm);
  const filteredMenu = useMemo(
    () => filterMenuByPermission(MENU_ITEMS, hasPermission),
    [permissions],
  );

  // Build group -> items mapping from filtered menu
  const groupedItems = useMemo(() => {
    const map = new Map<string, MenuItem[]>();
    for (const item of filteredMenu) {
      const g = item.group ?? "General";
      const arr = map.get(g) ?? [];
      arr.push(item);
      map.set(g, arr);
    }
    return map;
  }, [filteredMenu]);

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <div className="flex aspect-square size-8 items-center justify-center rounded-sm bg-primary text-primary-foreground">
                <span className="text-sm font-bold">A</span>
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-medium">Admin Panel</span>
                <span className="text-xs text-muted-foreground">
                  Control center
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {MENU_GROUPS.map((group) => {
          const groupItems = groupedItems.get(group);
          if (!groupItems?.length) return null;

          return (
            <SidebarGroup key={group}>
              <SidebarGroupLabel>{group}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {groupItems.map((item) => (
                    <NavItem key={item.key} item={item} pathname={pathname} />
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  );
};

export default AdminSidebar;
