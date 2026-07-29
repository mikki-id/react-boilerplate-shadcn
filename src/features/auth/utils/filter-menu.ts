import type { Permission } from "@/features/auth/types/permission-types";

export interface MenuItem {
  /** Unique key for the menu entry */
  key: string;
  /** Display label */
  label: string;
  /** Optional icon component (lucide-react) */
  icon?: React.ReactNode;
  /** Route path — leaf items must have one */
  path?: string;
  /** Required permission to see this item */
  permission?: Permission;
  /** Nested child items */
  children?: MenuItem[];
  /** Logical group for sidebar section headers */
  group?: string;
}

/**
 * Recursively filters a menu tree, keeping only items the user has
 * permission to see. A group with children is included if at least one
 * child is visible (but the group's own permission is also checked).
 */
export function filterMenuByPermission(
  items: MenuItem[],
  hasPermission: (perm: Permission) => boolean,
): MenuItem[] {
  const result: MenuItem[] = [];

  for (const item of items) {
    // Check item-level permission
    if (item.permission && !hasPermission(item.permission)) {
      // Even without permission, we might still include the group
      // if it has children and one of them is accessible
      if (item.children) {
        const filteredChildren = filterMenuByPermission(
          item.children,
          hasPermission,
        );
        if (filteredChildren.length) {
          result.push({ ...item, children: filteredChildren });
        }
      }
      continue;
    }

    // If item has children, filter them too
    if (item.children) {
      result.push({
        ...item,
        children: filterMenuByPermission(item.children, hasPermission),
      });
    } else {
      result.push(item);
    }
  }

  return result;
}
