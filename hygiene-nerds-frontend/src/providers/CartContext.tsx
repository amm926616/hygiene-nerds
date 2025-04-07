import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";

interface CartItem {
  productId: number;
  quantity: number;
  price: number;
  name: string;
  brand_name?: string;
  imageUrl: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (
    productId: number,
    price: number,
    name: string,
    imageUrl?: string,
    brand_name?: string,
    qty?: number,
  ) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  getItemQuantity: (productId: number) => number;
  isInCart: (productId: number) => boolean;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = useCallback(
    (
      productId: number,
      price: number,
      name: string,
      imageUrl: string,
      qty: number,
      brand_name?: string,
    ) => {
      console.log(
        "Adding to cart:",
        productId,
        price,
        name,
        imageUrl,
        qty,
        brand_name,
      );
      setCartItems((prevItems) => {
        const existingItem = prevItems.find(
          (item) => item.productId === productId,
        );
        if (existingItem) {
          return prevItems.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + qty }
              : item,
          );
        }
        return [
          ...prevItems,
          { productId, quantity: qty, price, name, imageUrl, brand_name },
        ];
      });
    },
    [],
  );

  const removeFromCart = useCallback((productId: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.productId !== productId),
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: number, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(productId);
        return;
      }

      setCartItems((prevItems) => {
        const existingItem = prevItems.find(
          (item) => item.productId === productId,
        );
        if (existingItem) {
          return prevItems.map((item) =>
            item.productId === productId ? { ...item, quantity } : item,
          );
        }
        return prevItems; // Don't add new item if it doesn't exist
      });
    },
    [removeFromCart],
  );

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const getItemQuantity = useCallback(
    (productId: number) => {
      return (
        cartItems.find((item) => item.productId === productId)?.quantity || 0
      );
    },
    [cartItems],
  );

  const isInCart = useCallback(
    (productId: number) => {
      return cartItems.some((item) => item.productId === productId);
    },
    [cartItems],
  );

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

  const cartTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems],
  );

  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount,
      getItemQuantity,
      isInCart,
      cartTotal,
    }),
    [
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount,
      getItemQuantity,
      isInCart,
      cartTotal,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
