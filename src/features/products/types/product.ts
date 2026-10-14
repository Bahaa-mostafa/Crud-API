export type CreateProductInput = Omit<Product, "id">;
export interface Product {
  id: number;
  name: string;
  price: number;
}