import { useState, useEffect, type FormEvent } from "react";
import type { Product } from "../types/product";
import { Button, Input } from "../../../shared/index";

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
      <Input
        id="name"
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
      <Input
        id="price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <div className="mt-6 flex justify-center ">
        <Button
          type="submit"
          variant="primary"
          
        >
          {editingProductId ? "Update Product" : "Add Product"}
        </Button>
      </div>
    </form>
  );
}

export default ProductForm;
