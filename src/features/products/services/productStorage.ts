import type {Product} from "../types/product";

const STORAGE_KEY = "products";

export function saveProducts(products: Product[]):void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products)); 
}

export function getStoredProducts(): Product[] {
  const products = localStorage.getItem(STORAGE_KEY);

  if (!products) {
    return [];
  }

  return JSON.parse(products);
}