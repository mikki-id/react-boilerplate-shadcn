import { Link } from "react-router-dom";
import { ArrowRight, LayoutDashboard, Shield, Palette } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Landing = () => {
  return (
    <div className="flex min-h-dvh flex-col">
      {/* Nav */}
      <header className="flex h-14 items-center justify-between border-b px-6">
        <span className="text-lg font-semibold tracking-tight">
          Boilerplate
        </span>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" render={<Link to="/auth/login" />}>
            Sign in
          </Button>
          <Button size="sm" render={<Link to="/auth/sign-up" />}>
            Get started
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="flex flex-1 flex-col items-center justify-center gap-6 p-6 text-center">
        <Badge variant="outline" className="px-3 py-1 text-xs font-normal">
          Production-grade foundation
        </Badge>

        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl text-balance">
          Build better apps with{" "}
          <span className="text-primary">shadcn/ui</span> and React
        </h1>

        <p className="text-muted-foreground max-w-prose text-base leading-relaxed text-pretty">
          A feature-based boilerplate with Redux Toolkit, TanStack Query,
          shadcn/ui components, RBAC permissions, and a clean architecture
          built for teams.
        </p>

        <div className="flex gap-3">
          <Button size="lg" render={<Link to="/auth/sign-up" />}>
            Get started
            <ArrowRight className="ml-1.5 size-4" />
          </Button>
          <Button variant="outline" size="lg" render={<Link to="/auth/login" />}>
            Sign in
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="grid gap-px border-t bg-border sm:grid-cols-3">
        {[
          {
            icon: <LayoutDashboard className="size-5" />,
            title: "Feature-based architecture",
            desc: "Modular features with clear boundaries. Scale to 50+ features without chaos.",
          },
          {
            icon: <Shield className="size-5" />,
            title: "RBAC & permissions",
            desc: "Role-based access control with granular resource-action permissions and dynamic menus.",
          },
          {
            icon: <Palette className="size-5" />,
            title: "shadcn/ui + 10 registries",
            desc: "Atomic UI components with access to OriginUI, MagicUI, shadcnblocks, and more.",
          },
        ].map((feature) => (
          <div
            key={feature.title}
            className="bg-background flex flex-col gap-2 p-8 text-left"
          >
            <div className="text-primary mb-1">{feature.icon}</div>
            <h3 className="font-medium">{feature.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {feature.desc}
            </p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="border-t px-6 py-4 text-center text-xs text-muted-foreground">
        React Boilerplate with shadcn/ui
      </footer>
    </div>
  );
};

export default Landing;
