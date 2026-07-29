import { Link } from "react-router-dom";
import { ShieldOff, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

const PageForbidden = () => {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 p-4 text-center">
      <ShieldOff className="text-muted-foreground size-12" />
      <h1 className="text-3xl font-semibold tracking-tight">403</h1>
      <p className="text-muted-foreground max-w-xs text-sm">
        You don&apos;t have permission to access this page. If you believe
        this is a mistake, contact your administrator.
      </p>
      <div className="flex gap-3">
        <Button variant="outline" render={<Link to="/admin/dashboard" />}>
          <ArrowLeft className="size-4" />
          Back to Dashboard
        </Button>
        <Button render={<Link to="/" />}>
          Go to Home
        </Button>
      </div>
    </div>
  );
};

export default PageForbidden;
