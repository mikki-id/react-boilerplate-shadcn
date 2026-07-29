import type { Permission, Resource } from "../types/permission-types";

/**
 * Central registry of every permission key in the application.
 *
 * Use `PERMISSIONS.USERS.CREATE` instead of magic strings
 * for type-safety and discoverability.
 *
 * To add a new resource, add it to the `Resource` type in
 * `permission-types.ts` first, then add its permissions here.
 */
export const PERMISSIONS: Record<
  Resource,
  Record<string, Permission>
> = {
  dashboard: {
    VIEW: "dashboard:read",
  },
  users: {
    READ: "users:read",
    CREATE: "users:create",
    UPDATE: "users:update",
    DELETE: "users:delete",
    EXPORT: "users:export",
    IMPORT: "users:import",
  },
  roles: {
    READ: "roles:read",
    CREATE: "roles:create",
    UPDATE: "roles:update",
    DELETE: "roles:delete",
  },
  settings: {
    READ: "settings:read",
    UPDATE: "settings:update",
    MANAGE: "settings:manage",
  },
  reports: {
    VIEW: "reports:read",
    CREATE: "reports:create",
    EXPORT: "reports:export",
    PRINT: "reports:print",
    ARCHIVE: "reports:archive",
  },
  audit_logs: {
    VIEW: "audit_logs:read",
    EXPORT: "audit_logs:export",
  },
  products: {
    READ: "products:read",
    CREATE: "products:create",
    UPDATE: "products:update",
    DELETE: "products:delete",
    EXPORT: "products:export",
    IMPORT: "products:import",
    ARCHIVE: "products:archive",
    RESTORE: "products:restore",
  },
  orders: {
    READ: "orders:read",
    CREATE: "orders:create",
    UPDATE: "orders:update",
    DELETE: "orders:delete",
    EXPORT: "orders:export",
    IMPORT: "orders:import",
    PRINT: "orders:print",
    APPROVE: "orders:approve",
    REJECT: "orders:reject",
  },
  content: {
    READ: "content:read",
    CREATE: "content:create",
    UPDATE: "content:update",
    DELETE: "content:delete",
    ARCHIVE: "content:archive",
    RESTORE: "content:restore",
  },
} as const;

/** All known resources (for UI lists) */
export const ALL_RESOURCES: Resource[] = Object.keys(PERMISSIONS) as Resource[];

/** All known actions (for permission matrix) */
export const ALL_ACTIONS: Action[] = [
  "create",
  "read",
  "update",
  "delete",
  "export",
  "import",
  "print",
  "archive",
  "restore",
  "approve",
  "reject",
  "manage",
];

/**
 * Get all permissions for a given resource, e.g.
 * `getResourcePermissions("users")` → ["users:create", "users:read", ...]
 */
export function getResourcePermissions(resource: Resource): Permission[] {
  return Object.values(PERMISSIONS[resource] ?? {});
}

/**
 * Get all permissions across all resources.
 */
export function getAllPermissions(): Permission[] {
  return ALL_RESOURCES.flatMap(getResourcePermissions);
}

import type { Action } from "../types/permission-types";
export type { Action };
