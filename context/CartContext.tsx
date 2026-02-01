"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";


export interface CartItem {
  id: string;
  name: string;
  price: number;
  image?: string;
  calories: number;
  cuisine?: string;
  dietary?: string[];
  spiceLevel?: string;
  isAvailable: boolean;
  mealType?: string;
  category?:{
    name: string;
  };
  provider?: {};
  quantity: number;
  // name?: string;
  // price?: number;
  pricePerUnit?: number;
}

interface CartContextType {
  cartItems: CartItem[];
  updateCart: (newCart: CartItem[]) => void;
  totalItems: number;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

interface CartProviderProps {
  children: ReactNode;
}


export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  //  localStorage load
  useEffect(() => {
    const savedCart =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("cart") || "[]")
        : [];

    setCartItems(savedCart);
  }, []);

  // কার্ট আপডেট ফাংশন
  const updateCart = (newCart: CartItem[]) => {
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  // total items হিসাব
  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <CartContext.Provider value={{ cartItems, updateCart, totalItems }}>
      {children}
    </CartContext.Provider>
  );
};


export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};
