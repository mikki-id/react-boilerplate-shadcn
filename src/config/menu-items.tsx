import {
  LayoutDashboard,
  Users,
  Shield,
  Settings,
  FileText,
  ClipboardList,
  ShoppingCart,
  Package,
} from "lucide-react";
import type { MenuItem } from "@/features/auth/utils/filter-menu";

/**
 * Central menu configuration for the admin sidebar.
 *
 * Each item can have an optional `permission`. The sidebar
 * automatically filters out items the user cannot see.
 *
 * `group` — logical grouping for sidebar section headers.
 */
export const MENU_ITEMS: (MenuItem & { group?: string })[] = [
  // ─── Overview ─────────────────────────────────────────────
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard className="size-4" />,
    path: "/admin/dashboard",
    permission: "dashboard:read",
    group: "Overview",
  },
  // ─── Management ───────────────────────────────────────────
  {
    key: "users",
    label: "Users",
    icon: <Users className="size-4" />,
    permission: "users:read",
    group: "Management",
    children: [
      {
        key: "users-list",
        label: "All Users",
        path: "/admin/users",
        permission: "users:read",
      },
      {
        key: "users-roles",
        label: "Roles & Permissions",
        icon: <Shield className="size-4" />,
        path: "/admin/users/roles",
        permission: "roles:read",
      },
    ],
  },
  {
    key: "products",
    label: "Products",
    icon: <Package className="size-4" />,
    permission: "products:read",
    group: "Management",
    path: "/admin/products",
  },
  {
    key: "orders",
    label: "Orders",
    icon: <ShoppingCart className="size-4" />,
    permission: "orders:read",
    group: "Management",
    path: "/admin/orders",
  },
  {
    key: "reports",
    label: "Reports",
    icon: <FileText className="size-4" />,
    permission: "reports:read",
    group: "Management",
    path: "/admin/reports",
  },
  {
    key: "audit",
    label: "Audit Logs",
    icon: <ClipboardList className="size-4" />,
    permission: "audit_logs:read",
    group: "Management",
    path: "/admin/audit-logs",
  },
  // ─── System ───────────────────────────────────────────────
  {
    key: "settings",
    label: "Settings",
    icon: <Settings className="size-4" />,
    permission: "settings:read",
    group: "System",
    children: [
      {
        key: "settings-profile",
        label: "Profile",
        path: "/admin/settings/profile",
        permission: "settings:read",
      },
      {
        key: "settings-notifications",
        label: "Notifications",
        path: "/admin/settings/notifications",
        permission: "settings:read",
      },
    ],
  },
];

/** Unique group names in display order */
export const MENU_GROUPS = [
  "Overview",
  "Management",
  "System",
] as const;
