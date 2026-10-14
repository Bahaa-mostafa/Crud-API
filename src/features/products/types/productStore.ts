import type { Product } from "./product";

export interface ProductStore {
  products: Product[];
  loading: boolean;
  total: number;
  error: string;
  hasLoaded: boolean;

  fetchProducts: () => Promise<void>;
  addProduct: (name: string, price: number) => Promise<boolean>;
  editProduct: (product: Product) => Promise<boolean>;
  removeProduct: (id: number) => Promise<boolean>;
}