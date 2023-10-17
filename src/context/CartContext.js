import { useState, createContext, useEffect } from "react";
import { deleteCartStorage } from "../services/firebase/firestore/cart";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addItem = (productToAdd) => {
    if (!isInCart(productToAdd.id)) {
      setCart((prev) => {
        const updatedCart = [...prev, productToAdd];
        updateLocalStorage(updatedCart);
        return updatedCart;
      });
    } else {
      setCart((prev) => {
        const findProduct = cart.find((prod) => prod.id === productToAdd.id);
        return prev.map((prod) =>
          prod.id === productToAdd.id
            ? {
                ...findProduct,
                quantity: prod.quantity + productToAdd.quantity,
              }
            : prod
        );
      });
    }
  };

  const removeItem = (itemId) => {
    setCart((prev) => {
      const cartFiltered = prev.filter((prod) => prod.id !== itemId);

      localStorage.setItem("cart", JSON.stringify(cartFiltered));

      if (cartFiltered.length === 0) {
        clearLocalStorage();
      }
      return cartFiltered;
    });
  };

  const updateLocalStorage = (cartData) => {
    localStorage.setItem("cart", JSON.stringify(cartData));
  };

  const clearLocalStorage = () => {
    localStorage.removeItem("cart");
  };

  const clear = (docID) => {
    clearLocalStorage();

    if (docID) {
      deleteCartStorage(docID);
    }

    return setCart([]);
  };

  const isInCart = (id) => cart.some((prod) => id === prod.id);

  const getTotalQuantity = () => {
    let accu = 0;

    cart.forEach((prod) => {
      accu += prod.quantity;
    });

    return accu;
  };

  const getTotal = () => {
    let total = 0;

    cart.forEach((prod) => {
      total += prod.quantity * prod.price;
    });

    return total;
  };

  const total = getTotal();

  const totalQuantity = getTotalQuantity();

  const loadCartFromLocalStorage = () => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    } else {
      clearLocalStorage();
    }
  };

  useEffect(() => {
    // Cargar el carrito desde localStorage al inicio
    loadCartFromLocalStorage();
    console.log("asd");
  }, []);

  return (
    <CartContext.Provider
      value={{
        addItem,
        isInCart,
        removeItem,
        clear,
        totalQuantity,
        cart,
        setCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
