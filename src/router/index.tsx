import { Suspense } from "react";
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom";
import { PUBLIC_ROUTES } from "./public-routes";
import { ADMIN_ROUTES } from "./admin-routes";
import { AUTH_ROUTES } from "./auth-routes";
import PageNotFound from "@/pages/public/404";

const MainRouter = () => {
  const routers = createBrowserRouter([
    {
      path: "/",
      element: <Outlet />,
      children: [
        ...PUBLIC_ROUTES,
        {
          path: "/login",
          element: <Navigate to="/auth/login" replace />,
        },
      ],
    },
    {
      path: "/auth",
      element: <Outlet />,
      children: AUTH_ROUTES,
    },
    {
      path: "/admin",
      children: ADMIN_ROUTES,
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={routers} />
    </Suspense>
  );
};

export default MainRouter;
