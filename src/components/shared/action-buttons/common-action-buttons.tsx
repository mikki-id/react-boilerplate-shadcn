import {
  Pencil,
  Trash2,
  Eye,
  Plus,
  Download,
  Upload,
  Printer,
  Archive,
  RotateCcw,
  CheckCircle,
  XCircle,
  MoreHorizontal,
} from "lucide-react";

import Can from "@/features/auth/components/Can";
import { CommonButton } from "@/components/shared/button";
import type { Resource, Permission } from "@/features/auth/types/permission-types";
import type { CommonButtonProps } from "@/components/shared/button/common-button.types";

// ─── Row action buttons (inline / dropdown) ─────────────────────────

interface ActionButtonsProps {
  resource: Resource;
  onCreate?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onView?: () => void;
  onExport?: () => void;
  onPrint?: () => void;
  onArchive?: () => void;
  onRestore?: () => void;
  onDuplicate?: () => void;
  onApprove?: () => void;
  onReject?: () => void;
  createLabel?: string;
  createButtonProps?: Partial<CommonButtonProps>;
  mode?: "inline" | "dropdown";
}

/**
 * CRUD + extended action buttons gated by user permissions.
 *
 * Renders only the buttons the current user has permission to use.
 *
 * @example
 * ```tsx
 * <ActionButtons
 *   resource="products"
 *   onCreate={() => openCreateModal()}
 *   onEdit={() => openEditModal(row)}
 *   onDelete={() => confirmDelete(row)}
 *   onView={() => navigate(`/admin/products/${row.id}`)}
 *   onExport={() => exportItem(row)}
 *   onPrint={() => printItem(row)}
 *   onArchive={() => archiveItem(row)}
 * />
 * ```
 */
const ActionButtons = ({
  resource,
  onEdit,
  onDelete,
  onView,
  onExport,
  onPrint,
  onArchive,
  onRestore,
  onApprove,
  onReject,
  createButtonProps,
  mode = "inline",
}: ActionButtonsProps) => {
  const readPerm = `${resource}:read` as Permission;
  const editPerm = `${resource}:update` as Permission;
  const deletePerm = `${resource}:delete` as Permission;
  const exportPerm = `${resource}:export` as Permission;
  const printPerm = `${resource}:print` as Permission;
  const archivePerm = `${resource}:archive` as Permission;
  const restorePerm = `${resource}:restore` as Permission;
  const approvePerm = `${resource}:approve` as Permission;
  const rejectPerm = `${resource}:reject` as Permission;

  const actions = [
    { perm: readPerm, cb: onView, icon: <Eye className="size-4" />, label: "View" },
    { perm: editPerm, cb: onEdit, icon: <Pencil className="size-4" />, label: "Edit" },
    { perm: deletePerm, cb: onDelete, icon: <Trash2 className="size-4" />, label: "Delete" },
    { perm: exportPerm, cb: onExport, icon: <Download className="size-4" />, label: "Export" },
    { perm: printPerm, cb: onPrint, icon: <Printer className="size-4" />, label: "Print" },
    { perm: archivePerm, cb: onArchive, icon: <Archive className="size-4" />, label: "Archive" },
    { perm: restorePerm, cb: onRestore, icon: <RotateCcw className="size-4" />, label: "Restore" },
    { perm: approvePerm, cb: onApprove, icon: <CheckCircle className="size-4" />, label: "Approve" },
    { perm: rejectPerm, cb: onReject, icon: <XCircle className="size-4" />, label: "Reject" },
  ];

  const available = actions.filter((a) => a.cb);

  if (!available.length) return null;

  if (mode === "dropdown") {
    return (
      <Can permission={editPerm} fallback={null}>
        <CommonButton
          label="Actions"
          leftIcon={<MoreHorizontal className="size-4" />}
          variant="outline"
          size="sm"
          {...createButtonProps}
        />
      </Can>
    );
  }

  return (
    <div className="flex items-center gap-1" role="group" aria-label="Row actions">
      {available.map((action) => (
        <Can key={action.label} permission={action.perm}>
          <CommonButton
            leftIcon={action.icon}
            variant="ghost"
            size="icon-sm"
            aria-label={action.label}
            onClick={action.cb}
          />
        </Can>
      ))}
    </div>
  );
};

// ─── Top-level create button ─────────────────────────────────────────

type CreateButtonProps = {
  resource: Resource;
  onClick: () => void;
  label?: string;
} & Partial<CommonButtonProps>;

const CreateButton = ({
  resource,
  onClick,
  label = "Create",
  ...rest
}: CreateButtonProps) => {
  const permission = `${resource}:create` as Permission;

  return (
    <Can permission={permission}>
      <CommonButton
        leftIcon={<Plus className="size-4" />}
        label={label}
        onClick={onClick}
        {...rest}
      />
    </Can>
  );
};

// ─── Export button ───────────────────────────────────────────────────

type ExportButtonProps = {
  resource: Resource;
  onClick: () => void;
  label?: string;
} & Partial<CommonButtonProps>;

const ExportButton = ({
  resource,
  onClick,
  label = "Export",
  ...rest
}: ExportButtonProps) => {
  const permission = `${resource}:export` as Permission;

  return (
    <Can permission={permission}>
      <CommonButton
        leftIcon={<Download className="size-4" />}
        label={label}
        onClick={onClick}
        variant="outline"
        {...rest}
      />
    </Can>
  );
};

// ─── Import button ───────────────────────────────────────────────────

type ImportButtonProps = {
  resource: Resource;
  onClick: () => void;
  label?: string;
} & Partial<CommonButtonProps>;

const ImportButton = ({
  resource,
  onClick,
  label = "Import",
  ...rest
}: ImportButtonProps) => {
  const permission = `${resource}:import` as Permission;

  return (
    <Can permission={permission}>
      <CommonButton
        leftIcon={<Upload className="size-4" />}
        label={label}
        onClick={onClick}
        variant="outline"
        {...rest}
      />
    </Can>
  );
};

// ─── Bulk action bar ─────────────────────────────────────────────────

interface BulkActionBarProps {
  resource: Resource;
  selectedCount: number;
  onBulkDelete?: () => void;
  onBulkExport?: () => void;
  onBulkArchive?: () => void;
  onBulkRestore?: () => void;
  onBulkApprove?: () => void;
  onBulkPrint?: () => void;
  onClearSelection?: () => void;
}

/**
 * Floating/condensed bar shown when rows are selected in a table.
 * Only shows actions the user has permission for.
 */
const BulkActionBar = ({
  resource,
  selectedCount,
  onBulkDelete,
  onBulkExport,
  onBulkArchive,
  onBulkRestore,
  onBulkApprove,
  onBulkPrint,
  onClearSelection,
}: BulkActionBarProps) => {
  if (!selectedCount) return null;

  const bulk = [
    { perm: `${resource}:delete` as Permission, cb: onBulkDelete, icon: <Trash2 className="size-4" />, label: "Delete" },
    { perm: `${resource}:export` as Permission, cb: onBulkExport, icon: <Download className="size-4" />, label: "Export" },
    { perm: `${resource}:archive` as Permission, cb: onBulkArchive, icon: <Archive className="size-4" />, label: "Archive" },
    { perm: `${resource}:restore` as Permission, cb: onBulkRestore, icon: <RotateCcw className="size-4" />, label: "Restore" },
    { perm: `${resource}:approve` as Permission, cb: onBulkApprove, icon: <CheckCircle className="size-4" />, label: "Approve" },
    { perm: `${resource}:print` as Permission, cb: onBulkPrint, icon: <Printer className="size-4" />, label: "Print" },
  ];

  const available = bulk.filter((a) => a.cb);
  if (!available.length) return null;

  return (
    <div className="bg-accent text-accent-foreground flex items-center gap-2 rounded-lg px-4 py-2 text-sm">
      <span className="font-medium">{selectedCount} selected</span>
      <div className="mx-2 h-4 w-px bg-border" />
      {available.map((action) => (
        <Can key={action.label} permission={action.perm}>
          <CommonButton
            leftIcon={action.icon}
            label={action.label}
            variant="ghost"
            size="sm"
            onClick={action.cb}
          />
        </Can>
      ))}
      {onClearSelection && (
        <>
          <div className="mx-1 h-4 w-px bg-border" />
          <CommonButton
            label="Clear"
            variant="ghost"
            size="sm"
            onClick={onClearSelection}
          />
        </>
      )}
    </div>
  );
};

export {
  ActionButtons,
  CreateButton,
  ExportButton,
  ImportButton,
  BulkActionBar,
};
export type {
  ActionButtonsProps,
  CreateButtonProps,
  ExportButtonProps,
  ImportButtonProps,
  BulkActionBarProps,
};
