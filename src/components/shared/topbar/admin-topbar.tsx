import { useNavigate } from "react-router-dom";
import { LogOut, User, Settings, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectCurrentUser, clearCredentials } from "@/store/slices/authSlice";
import { setTheme } from "@/store/slices/uiSlice";
import { removeLocalStorageItem } from "@/utils/storage-utils";
import { env } from "@/config/env";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const AdminTopbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectCurrentUser);
  const { theme: nextTheme, setTheme: setNextTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "??";

  const handleLogout = () => {
    removeLocalStorageItem(env.VITE_AUTH_TOKEN_SECRET);
    dispatch(clearCredentials());
    navigate("/auth/login", { replace: true });
  };

  const toggleTheme = () => {
    const next = nextTheme === "dark" ? "light" : "dark";
    setNextTheme(next);
    dispatch(setTheme(next));
  };

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
      </div>

      <div className="ml-auto flex items-center gap-1">
        {/* Theme toggle */}
        {mounted && (
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={toggleTheme}
            aria-label={nextTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {nextTheme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>
        )}

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1 outline-none hover:bg-accent">
            <Avatar size="sm">
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <span className="hidden text-sm font-medium sm:block">
              {user?.name ?? "User"}
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuLabel>{user?.email ?? ""}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/admin/settings/profile")}>
              <User className="size-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/admin/settings/profile")}>
              <Settings className="size-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={handleLogout}>
              <LogOut className="size-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default AdminTopbar;
