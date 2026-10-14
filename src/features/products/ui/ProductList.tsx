
import type { ProductListProps } from "../types/productList";
import { Button, Card, DataTable, Search } from "../../../shared";
import type { Column } from "../../../shared/types/dataTable";

function ProductList({
  products,
  onDeleteProduct,
  onUpdateProduct,
  searchQuery,
  onSearchChange,
}: ProductListProps) {
  const columns: Column<ProductListProps["products"][number]>[] = [
    {
      key: "product",
      title: "Product",
      render: (product) => (
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-lg font-semibold text-gray-600">
            {product.name.charAt(0).toUpperCase()}
          </div>

          <div>
            <h3 className="font-medium text-gray-900">
              {product.name}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Product ID: {product.id}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "price",
      title: "Price",
      render: (product) => (
        <span className="font-semibold text-gray-900">
          ${product.price}
        </span>
      ),
    },
    {
      key: "actions",
      title: "Actions",
      render: (product) => (
        <div className="flex gap-3">
          <Button
            variant="warning"
            onClick={() => onUpdateProduct(product.id)}
          >
            Edit
          </Button>

          <Button
            variant="danger"
            onClick={() => onDeleteProduct(product.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-w-full max-w-5xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Products
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your products
          </p>
        </div>

        <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600">
          {products.length} Products
        </span>
      </div>

      <div className="mb-6">
        <label
          htmlFor="product-search"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Search products
        </label>

        <Search
          id="product-search"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by product name..."
        />
      </div>

      {products.length > 0 ? (
        <DataTable
          data={products}
          columns={columns}
          getRowKey={(product) => product.id}
        />
      ) : (
        <Card className="px-6 py-12 text-center">
          <h3 className="font-medium text-gray-900">
            No products found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            There are no products to display.
          </p>
        </Card>
      )}
    </div>
  );
}

export default ProductList;
