import { CreateButton, ExportButton, ImportButton } from "@/components/shared/action-buttons";

const ProductsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Products</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Manage your product catalog.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ImportButton resource="products" onClick={() => {}} />
          <ExportButton resource="products" onClick={() => {}} />
          <CreateButton resource="products" onClick={() => {}} />
        </div>
      </div>

      {/* Table placeholder */}
      <div className="border-border bg-card rounded-xl border p-8 text-center text-sm text-muted-foreground">
        Product table with CRUD + export/import/archive/restore actions will render here.
      </div>
    </div>
  );
};

export default ProductsPage;
