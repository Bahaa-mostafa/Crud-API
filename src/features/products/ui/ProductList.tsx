
import type { Product } from "../types/product";

interface ProductListProps {
  products: Product[];
  onDeleteProduct: (id: number) => void;
  onUpdateProduct: (id: number) => void;
}

function ProductList({
  products,
  onDeleteProduct,
  onUpdateProduct,
}: ProductListProps) {

  console.log(products);
  return (
    <div className="min-w-full max-w-5xl">
      {/* Header */}
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

      {/* Products */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex min-w-0 items-center justify-between gap-4 border-b border-gray-100 px-6 py-5 last:border-b-0 hover:bg-gray-50"
          >
            {/* Product Info */}
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

            {/* Price + Actions */}
            <div className="flex items-center gap-8 ">
              <p className="font-semibold text-gray-900 w-20">
                ${product.price}
              </p>

              <div className="flex gap-6">
                <button
                 className="rounded-lg border border-gray-200 w-25 text-lg font-medium text-white transition bg-yellow-500 cursor-pointer"
                  onClick={() => onUpdateProduct(product.id)}
                >
                  Edit
                </button>

                <button
                  className="rounded-lg border border-red-200 w-25 text-lg font-medium text-white bg-red-800 transition cursor-pointer"
                  onClick={() => onDeleteProduct(product.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {products.length === 0 && (
        <div className="rounded-xl border border-gray-200 bg-white px-6 py-12 text-center">
          <h3 className="font-medium text-gray-900">
            No products found
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            There are no products to display.
          </p>
        </div>
      )}
    </div>
  );
}

export default ProductList;

