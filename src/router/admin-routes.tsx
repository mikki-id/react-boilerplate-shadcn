import { lazy } from "react";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "@/features/auth/components/ProtectedRoute";
import AdminLayout from "@/features/admin/layout";

const Dashboard = lazy(() => import("@/pages/admin/dashboard"));
const Profile = lazy(() => import("@/pages/admin/settings/profile"));
const Notifications = lazy(() => import("@/pages/admin/settings/notifications"));
const UsersPage = lazy(() => import("@/pages/admin/users"));
const RolesPage = lazy(() => import("@/pages/admin/users/roles"));
const ProductsPage = lazy(() => import("@/pages/admin/products"));
const OrdersPage = lazy(() => import("@/pages/admin/orders"));
const ReportsPage = lazy(() => import("@/pages/admin/reports"));
const AuditLogsPage = lazy(() => import("@/pages/admin/audit-logs"));

export const ADMIN_ROUTES = [
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/admin/dashboard" replace />,
          },
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "users",
            element: <UsersPage />,
          },
          {
            path: "users/roles",
            element: <RolesPage />,
          },
          {
            path: "products",
            element: <ProductsPage />,
          },
          {
            path: "orders",
            element: <OrdersPage />,
          },
          {
            path: "reports",
            element: <ReportsPage />,
          },
          {
            path: "audit-logs",
            element: <AuditLogsPage />,
          },
          {
            path: "settings",
            element: <Navigate to="/admin/settings/profile" replace />,
          },
          {
            path: "settings/profile",
            element: <Profile />,
          },
          {
            path: "settings/notifications",
            element: <Notifications />,
          },
        ],
      },
    ],
  },
];
