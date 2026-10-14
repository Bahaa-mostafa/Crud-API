import type { Product } from "./product";

export interface ProductListProps {
  products: Product[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onDeleteProduct: (id: number) => void;
  onUpdateProduct: (id: number) => void;
}