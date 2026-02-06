// Navigation types
export type RootStackParamList = {
  Home: undefined;
  Cart: undefined;
  Checkout: undefined;
};

// Product types
export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
};

// Cart types
export type CartItem = Product & {
  quantity: number;
};

// Theme types
export type Theme = {
  background: string;
  cardBackground: string;
  text: string;
  textSecondary: string;
  primary: string;
  primaryDark: string;
  success: string;
  border: string;
  shadow: string;
  buttonText: string;
};

// Context types
export type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  incrementQuantity: (productId: number) => void;
  decrementQuantity: (productId: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
};

export type ThemeContextType = {
  theme: Theme;
  isDarkMode: boolean;
  toggleTheme: () => void;
};
