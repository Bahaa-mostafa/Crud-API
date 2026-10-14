
import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import ProductForm from "./ProductForm";
import { useProductStore } from "../store/productStore";
import { Pagination } from "../../../shared";

function ProductManagement() {
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const limit = 10;

  const products = useProductStore((state) => state.products);
  const loading = useProductStore((state) => state.loading);
  const error = useProductStore((state) => state.error);
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const addProduct = useProductStore((state) => state.addProduct);
  const editProduct = useProductStore((state) => state.editProduct);
  const removeProduct = useProductStore((state) => state.removeProduct);

  useEffect(() => {
    void fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  const startIndex = (page - 1) * limit;

  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + limit
  );

  const totalPages = Math.ceil(filteredProducts.length / limit);

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
          onUpdateProduct={(product) => {
            void editProduct(product).then((success) => {
              if (success) {
                setEditingProductId(null);
              }
            });
          }}
          onCreateProduct={async (name, price) => {
            const success = await addProduct(name, price);

            if (success) {
              setPage(1);
            }
          }}
        />

        {loading && (
          <p className="flex min-h-screen items-center justify-center">
            Loading...
          </p>
        )}

        {error && <p className="text-center text-red-500">{error}</p>}

        <ProductList
          products={paginatedProducts}
          searchQuery={searchQuery}
          onSearchChange={(value) => {
            setSearchQuery(value);
            setPage(1);
          }}
          onDeleteProduct={(id) => {
            void removeProduct(id);
          }}
          onUpdateProduct={handleUpdateProduct}
        />

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}

export default ProductManagement;
