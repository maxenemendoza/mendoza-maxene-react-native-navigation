// types.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;  // Add this line
}

export interface CartItem extends Product {
  quantity: number;
}