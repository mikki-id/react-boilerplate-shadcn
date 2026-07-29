import { CreateButton, ExportButton, ImportButton } from "@/components/shared/action-buttons";

const OrdersPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Orders</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Manage customer orders and fulfillments.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ImportButton resource="orders" onClick={() => {}} />
          <ExportButton resource="orders" onClick={() => {}} />
          <CreateButton resource="orders" onClick={() => {}} />
        </div>
      </div>

      {/* Table placeholder */}
      <div className="border-border bg-card rounded-xl border p-8 text-center text-sm text-muted-foreground">
        Orders table with CRUD + approve/reject/print/export actions will render here.
      </div>
    </div>
  );
};

export default OrdersPage;
