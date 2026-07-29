import { useState } from "react";
import { Pencil, Shield } from "lucide-react";

import { CreateButton } from "@/components/shared/action-buttons";
import PermissionMatrix from "@/features/roles/components/PermissionMatrix";
import { DEFAULT_ROLES } from "@/features/roles/constants/default-roles";
import Can from "@/features/auth/components/Can";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { Role, Permission } from "@/features/auth/types/permission-types";

const RolesPage = () => {
  const [roles, setRoles] = useState<Role[]>(DEFAULT_ROLES);
  const [editingRole, setEditingRole] = useState<Role | null>(null);

  const handlePermissionsChange = (permissions: Permission[]) => {
    if (!editingRole) return;
    setEditingRole({ ...editingRole, permissions });
  };

  const handleSave = () => {
    if (!editingRole) return;
    setRoles((prev) =>
      prev.map((r) => (r.id === editingRole.id ? editingRole : r)),
    );
    setEditingRole(null);
  };

  const permissionCount = (role: Role) => role.permissions.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">
            Roles & Permissions
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Define roles and assign granular permissions.
          </p>
        </div>
        <CreateButton resource="roles" onClick={() => {}} />
      </div>

      {/* Role cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {roles.map((role) => (
          <Card key={role.id} size="sm">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle>{role.label ?? role.name}</CardTitle>
                  <CardDescription>{role.description}</CardDescription>
                </div>
                <Can permission="roles:update">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => setEditingRole(role)}
                    aria-label={`Edit ${role.label ?? role.name}`}
                  >
                    <Pencil className="size-4" />
                  </Button>
                </Can>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Shield className="text-muted-foreground size-4" />
                <span className="text-muted-foreground text-sm">
                  {permissionCount(role)} permission
                  {permissionCount(role) !== 1 ? "s" : ""}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit dialog */}
      {editingRole && (
        <Dialog
          open={!!editingRole}
          onOpenChange={(open) => {
            if (!open) setEditingRole(null);
          }}
        >
          <DialogContent className="sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle>
                {editingRole.label ?? editingRole.name}
              </DialogTitle>
              <DialogDescription>
                Toggle permissions for this role. Changes take effect after
                saving.
              </DialogDescription>
            </DialogHeader>

            <PermissionMatrix
              role={editingRole}
              onChange={handlePermissionsChange}
            />

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditingRole(null)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default RolesPage;
