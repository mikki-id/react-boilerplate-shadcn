import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

const AuthLayout = ({
  children,
  title = "Welcome back",
  description = "Sign in to your account to continue",
}: AuthLayoutProps) => {
  return (
    <div className="bg-muted/30 flex min-h-dvh items-center justify-center p-4">
      <div className="bg-card text-card-foreground w-full max-w-sm rounded-xl border p-6 shadow-sm">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
          <p className="text-muted-foreground mt-1 text-sm">{description}</p>
        </div>

        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
