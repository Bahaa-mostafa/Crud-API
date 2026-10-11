export interface ProductsResponse {
  products: {
    id: number;
    title: string;
    price: number;
  }[];
  total: number;
  skip: number;
  limit: number;
}