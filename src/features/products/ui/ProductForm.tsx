import { useState, useEffect, type FormEvent } from "react";
import type { Product } from "../types/product";

interface ProductFormProps {
  onUpdateProduct: (product: Product) => void;
  onCancelEdit: () => void;
  onCreateProduct: (name: string, price: number) => void
  editingProductId: number | null;
  products: Product[];
}

function ProductForm({
  onUpdateProduct,
  onCancelEdit,
  onCreateProduct,
  editingProductId,
  products,
}: ProductFormProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const productToEdit = products.find(
    (product) => product.id === editingProductId,
  );

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setPrice(String(productToEdit.price));
    }
  }, [editingProductId]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (editingProductId) {
      const updatedProduct: Product = {
        id: editingProductId,
        name: name,
        price: Number(price),
      };
      onUpdateProduct(updatedProduct);
      setName("");
      setPrice("");
      onCancelEdit();
    } else {

      setName("");
      setPrice("");

      onCreateProduct(name, Number(price));
    }
  };
  return (
    <form onSubmit={handleSubmit} className="w-full rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-6 text-2xl font-semibold text-gray-800">Add product</h2>
      <label
        htmlFor="name"
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        Product Name
      </label>
      <input
        id="name"
        className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label
        htmlFor="price"
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        Price
      </label>
      <input
        id="price"
        className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <div className="mt-6 flex justify-center ">
        <button
          type="submit"
          className="rounded-md bg-blue-600 w-30 h-10 text-white hover:bg-blue-700"
        >
          {editingProductId ? "Update Product" : "Add Product"}
        </button>
      </div>
    </form>
  );
}

export default ProductForm;
