import { useState, useEffect } from "react";
import { getProducts, createProduct } from "../services/productService";
import type { Product } from "../types/product";
import { getStoredProducts, saveProducts } from "../services/productStorage";
import { toast } from "react-toastify";

function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);

      try {
        const storedProducts = getStoredProducts();

        if (storedProducts.length > 0) {
          setProducts(storedProducts);
          setTotal(storedProducts.length);
          return;
        }
        console.log("NO LOCAL PRODUCTS");
        const data = await getProducts(0, 0);

        const products = data.products.map((product) => ({
          id: product.id,
          name: product.title,
          price: product.price,
        }));

        setProducts(products);
        setTotal(products.length);

        saveProducts(products);
      } catch (error) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleCreateProduct = async (name: string, price: number) => {
    setLoading(true);

    try {
      toast.success("Product added successfully");

      const newProduct = await createProduct(name, price);

      setProducts((prevProducts) => {
        const newId =
          prevProducts.length > 0
            ? Math.max(...prevProducts.map((product) => product.id)) + 1
            : 1;

        const productWithNewId = {
          ...newProduct,
          id: newId,
        };

        const updatedProducts = [...prevProducts, productWithNewId];

        saveProducts(updatedProducts);

        return updatedProducts;
      });
    } catch (error) {
      setError("Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveUpdatedProduct = (updatedProduct: Product) => {
    try {
      toast.success("Product updated successfully");
      setProducts((prevProducts) => {
        const updatedProducts = prevProducts.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product,
        );

        saveProducts(updatedProducts);

        return updatedProducts;
      });
    } catch {
      setError("Failed to update products");
    }
  };

  const handleDeleteProduct = (id: number) => {
    try {
      toast.success("Product deleted successfully");
      setProducts((prevProducts) => {
        const updatedProducts = prevProducts.filter(
          (product) => product.id !== id,
        );

        saveProducts(updatedProducts);

        return updatedProducts;
      });
    } catch {
      setError("Failt to Delete Product");
    }
  };

  return {
    products,
    loading,
    total,
    error,
    handleCreateProduct,
    handleSaveUpdatedProduct,
    handleDeleteProduct,
  };
}

export default useProducts;
