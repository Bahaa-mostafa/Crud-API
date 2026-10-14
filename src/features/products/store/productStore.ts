
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "react-toastify";
import type { ProductStore } from "../types/productStore";

import type { Product } from "../types/product";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";


export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      products: [],
      loading: false,
      total: 0,
      error: "",
      hasLoaded: false,

      fetchProducts: async () => {
        if (get().hasLoaded) return;

        set({ loading: true, error: "" });

        try {
          const data = await getProducts(0, 0);

          const products: Product[] = data.products.map((product) => ({
            id: product.id,
            name: product.title,
            price: product.price,
          }));

          set({
            products,
            total: products.length,
            hasLoaded: true,
          });
        } catch {
          set({ error: "Failed to load products" });
        } finally {
          set({ loading: false });
        }
      },

      addProduct: async (name, price) => {
        set({ loading: true, error: "" });

        try {
          const newProduct = await createProduct(name, price);

          const currentProducts = get().products;

          const newId =
            currentProducts.length > 0
              ? Math.max(...currentProducts.map((p) => p.id)) + 1
              : 1;

          const productWithNewId = {
            ...newProduct,
            id: newId,
          };

          const products = [productWithNewId, ...currentProducts];

          set({
            products,
            total: products.length,
            hasLoaded: true,
          });

          toast.success("Product added successfully");
          return true;
        } catch {
          set({ error: "Failed to create product" });
          toast.error("Failed to create product");
          return false;
        } finally {
          set({ loading: false });
        }
      },

      editProduct: async (product) => {
        set({ loading: true, error: "" });

        try {
          const updatedProduct = await updateProduct(product);

          const products = get().products.map((p) =>
            p.id === product.id ? updatedProduct : p
          );

          set({ products, total: products.length });

          toast.success("Product updated successfully");
          return true;
        } catch {
          set({ error: "Failed to update product" });
          toast.error("Failed to update product");
          return false;
        } finally {
          set({ loading: false });
        }
      },

      removeProduct: async (id) => {
        set({ loading: true, error: "" });

        try {
          await deleteProduct(id);

          const products = get().products.filter((p) => p.id !== id);

          set({ products, total: products.length });

          toast.success("Product deleted successfully");
          return true;
        } catch {
          set({ error: "Failed to delete product" });
          toast.error("Failed to delete product");
          return false;
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: "products",
      partialize: (state) => ({
        products: state.products,
        total: state.total,
        hasLoaded: state.hasLoaded,
      }),
    }
  )
);
