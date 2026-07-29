import { Link } from "react-router-dom";
import { FileQuestion, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

const PageNotFound = () => {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 p-4 text-center">
      <FileQuestion className="text-muted-foreground size-12" />
      <h1 className="text-3xl font-semibold tracking-tight">404</h1>
      <p className="text-muted-foreground max-w-xs text-sm">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex gap-3">
        <Button variant="outline" render={<Link to="/" />}>
          <ArrowLeft className="size-4" />
          Back to Home
        </Button>
        <Button render={<Link to="/auth/login" />}>Sign in</Button>
      </div>
    </div>
  );
};

export default PageNotFound;
