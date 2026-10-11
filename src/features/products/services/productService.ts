import type { Product } from "../types/product";
import type { ProductsResponse } from "../types/api";


const BASE_URL = "https://dummyjson.com/products";

export async function getProducts(
  limit: number,
  skip: number,
): Promise<ProductsResponse> {
  const response = await fetch(`${BASE_URL}?limit=${limit}&skip=${skip}`);
  if (!response.ok) {
    throw new Error("faild to fetch product");
  }
  return response.json();
}

export async function createProduct(
  name: string,
  price: number,
): Promise<Product> {
  const response = await fetch(`${BASE_URL}/add`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      title: name,
      price: price,
    }),
  });
  if (!response.ok) {
    throw new Error("Failed to create product");
  }
  const data = await response.json();
          
  return {
    id: data.id,
    name: data.title,
    price: data.price,
  };
}

export async function updateProduct(
  product:Product,
): Promise<Product>{
  const response = await fetch(`${BASE_URL}/${product.id}`,{
    method:"PUT",
    headers:{"Content-type":"application/json"},
    body: JSON.stringify({
      title: product.name,
      price: product.price,
    }),
  });
  if(!response.ok){
    throw new Error("Failed to Update product");
  }
  const data = await response.json();

  return {
    id:data.id,
    name:data.title,
    price: data.price,
  };
}

export async function deleteProduct(id:number): Promise<void>{
  const response = await fetch(`${BASE_URL}/${id}`,{
    method:"DELETE",
  });
  if(!response.ok) {
    throw new Error("Failed to delete product");
  }
}





