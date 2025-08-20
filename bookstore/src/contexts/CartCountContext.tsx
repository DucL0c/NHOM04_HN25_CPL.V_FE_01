import React, { createContext, useContext, useState, useEffect } from "react";
import axiosClient from "../services/axiosClient";
import type { CartProps } from "../pages/cart/Cart";
import { useAuth } from "../hooks/useAuth";

interface CartContextType {
  cartCount: number;
  refreshCartCount: () => void;
}

const CartCountContext = createContext<CartContextType>({
  cartCount: 0,
  refreshCartCount: () => {},
});

export const useCartCount = () => useContext(CartCountContext);

export const CartCountProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const { user } = useAuth();

  const fetchCartCount = async () => {
    if (!user) {
      setCartCount(0);
      return;
    }
    try {
      const data = await axiosClient.get<CartProps[], any>(`/Cart/byUserId/${user.userId}`);
      if (data && data[0]) {
        setCartCount(data[0].cartItems.length);
      } else {
        setCartCount(0);
      }
    } catch {
      setCartCount(0);
    }
  };

  useEffect(() => {
    fetchCartCount();
    // eslint-disable-next-line
  }, [user]);

  return (
    <CartCountContext.Provider value={{ cartCount, refreshCartCount: fetchCartCount }}>
      {children}
    </CartCountContext.Provider>
  );
};
