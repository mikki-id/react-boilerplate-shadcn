import { useMemo, useCallback } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ALL_RESOURCES,
  ALL_ACTIONS,
  getResourcePermissions,
  type Action,
} from "@/features/auth/constants/permissions";
import type { Resource, Permission, Role } from "@/features/auth/types/permission-types";

interface PermissionMatrixProps {
  /** The role being edited */
  role: Role;
  /** Called with the updated permissions */
  onChange: (permissions: Permission[]) => void;
  /** If true, the matrix is read-only */
  readonly?: boolean;
}

/**
 * Permission matrix table — rows are resources, columns are actions.
 * Checkboxes toggle individual permissions for a role.
 *
 * @example
 * ```tsx
 * <PermissionMatrix
 *   role={currentRole}
 *   onChange={(perms) => setRole({ ...role, permissions: perms })}
 * />
 * ```
 */
const PermissionMatrix = ({
  role,
  onChange,
  readonly = false,
}: PermissionMatrixProps) => {
  const permissionSet = useMemo(
    () => new Set(role.permissions),
    [role.permissions],
  );

  const togglePermission = useCallback(
    (permission: Permission) => {
      if (readonly) return;
      const next = new Set(permissionSet);
      if (next.has(permission)) {
        next.delete(permission);
      } else {
        next.add(permission);
      }
      onChange(Array.from(next));
    },
    [permissionSet, onChange, readonly],
  );

  const hasAllResource = useCallback(
    (resource: Resource) => {
      const perms = getResourcePermissions(resource);
      return perms.every((p) => permissionSet.has(p));
    },
    [permissionSet],
  );

  const toggleResource = useCallback(
    (resource: Resource) => {
      if (readonly) return;
      const perms = getResourcePermissions(resource);
      const allGranted = perms.every((p) => permissionSet.has(p));
      const next = new Set(permissionSet);
      for (const p of perms) {
        if (allGranted) next.delete(p);
        else next.add(p);
      }
      onChange(Array.from(next));
    },
    [permissionSet, onChange, readonly],
  );

  // Determine which actions apply to each resource
  const resourceActions = useMemo(() => {
    const map = new Map<Resource, Action[]>();
    for (const resource of ALL_RESOURCES) {
      const perms = getResourcePermissions(resource);
      const actions: Action[] = [];
      for (const action of ALL_ACTIONS) {
        if (perms.includes(`${resource}:${action}` as Permission)) {
          actions.push(action);
        }
      }
      map.set(resource, actions);
    }
    return map;
  }, []);

  // Filter to relevant actions (actions that exist in at least one resource)
  const relevantActions = useMemo(() => {
    const seen = new Set<Action>();
    for (const actions of resourceActions.values()) {
      for (const a of actions) seen.add(a);
    }
    return ALL_ACTIONS.filter((a) => seen.has(a));
  }, [resourceActions]);

  return (
    <div className="overflow-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-32">Resource</TableHead>
            <TableHead className="w-12 text-center">All</TableHead>
            {relevantActions.map((action) => (
              <TableHead key={action} className="text-center capitalize">
                {action}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {ALL_RESOURCES.map((resource) => {
            const actions = resourceActions.get(resource) ?? [];
            const allChecked = hasAllResource(resource);

            return (
              <TableRow key={resource}>
                <TableCell className="font-medium capitalize">
                  {resource.replace(/_/g, " ")}
                </TableCell>

                {/* Select all for this resource */}
                <TableCell className="text-center">
                  {!readonly && actions.length > 1 && (
                    <Checkbox
                      checked={allChecked}
                      onCheckedChange={() => toggleResource(resource)}
                      aria-label={`Toggle all ${resource}`}
                    />
                  )}
                </TableCell>

                {relevantActions.map((action) => {
                  const perm = `${resource}:${action}` as Permission;
                  const exists = actions.includes(action);
                  const checked = permissionSet.has(perm);

                  return (
                    <TableCell key={perm} className="text-center">
                      {exists ? (
                        readonly ? (
                          <div
                            className={`mx-auto size-4 rounded-sm border ${
                              checked
                                ? "bg-primary border-primary"
                                : "border-input"
                            }`}
                          />
                        ) : (
                          <Checkbox
                            checked={checked}
                            onCheckedChange={() => togglePermission(perm)}
                            aria-label={`${resource} ${action}`}
                          />
                        )
                      ) : (
                        <span className="text-muted-foreground/30">—</span>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default PermissionMatrix;
