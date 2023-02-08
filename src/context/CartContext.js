import { useState, createContext } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addItem = (productToAdd) => {
    if (!isInCart(productToAdd.id)) {
      setCart((prev) => {
        return [...prev, productToAdd];
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
      return prev.filter((prod) => prod.id !== itemId);
    });
  };

  const clear = () => setCart([])

  const isInCart = (id) => cart.some((prod) => id === prod.id);


  const getTotalQuantity = () => {
    let accu = 0;

    cart.forEach((prod) => {
      accu += prod.quantity;
    });

    return accu;
  };

  const getTotal = () => {
    let total = 0

    cart.forEach(prod => {
      total += prod.quantity * prod.price
    })

    return total
  }

  const total = getTotal()

  const totalQuantity = getTotalQuantity();

  return (
    <CartContext.Provider
      value={{ addItem, isInCart, removeItem, clear, totalQuantity, cart, setCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
};
