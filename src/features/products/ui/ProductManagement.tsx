import { useState } from "react";
import ProductList from "./ProductList";
import ProductForm from "./ProductForm";
import useProducts from "../hooks/useProducts";

function ProductManagement() {
  const [editingProductId, setEditingProductId] = useState<number | null>(null);

  const [page, setPage] = useState(1);
  const limit = 10;

  const {
    products,
    loading,
    total,
    error,
    handleCreateProduct,
    handleSaveUpdatedProduct,
    handleDeleteProduct,
  } = useProducts();

  const startIndex = (page - 1) * limit;

  const paginatedProducts = products.slice(startIndex, startIndex + limit);

  const totalPages = Math.ceil(total / limit);

  const onCancelEdit = () => {
    setEditingProductId(null);
  };

  const handleUpdateProduct = (id: number) => {
    setEditingProductId(id);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-full">
        <h1 className="mb-8 text-3xl font-bold text-gray-800">
          Product Management
        </h1>

        <ProductForm
          editingProductId={editingProductId}
          products={products}
          onCancelEdit={onCancelEdit}
          onUpdateProduct={handleSaveUpdatedProduct}
          onCreateProduct={handleCreateProduct}
        />

        {loading && (
          <p className="flex min-h-screen items-center justify-center">
            Loading...
          </p>
        )}

        {error && <p className="text-center text-red-500">{error}</p>}

        <ProductList
          products={paginatedProducts}
          onDeleteProduct={handleDeleteProduct}
          onUpdateProduct={handleUpdateProduct}
        />

        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="rounded bg-blue-300 px-4 py-2 w-10 text-sm"
          >
            {"<"}
          </button>

          <span>page {page}</span>

          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="rounded bg-blue-300 px-4 py-2 w-10 text-sm"
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductManagement;
