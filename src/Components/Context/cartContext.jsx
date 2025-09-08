import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext();

const getCartFromStorage = JSON.parse(localStorage.getItem("cart")) || [];

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(getCartFromStorage);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    const exists = cart.find((cartItem) => cartItem.id === item.id);
    if (exists) {
      toast.info(`${item.title} is already in the cart`);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
      toast.success(`${item.title} added to cart`);
    }
  };

  const handleIncrease = (item) => {
    const updatedCart = cart.map((cartItem) =>
      cartItem.id === item.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
    setCart(updatedCart);
    toast.success(`Increased quantity of ${item.title}`);
  };

  const handleDecrease = (item) => {
    const updatedCart = cart
      .map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      )
      .filter((cartItem) => cartItem.quantity > 0);
    setCart(updatedCart);
    toast.warn(`Decreased quantity of ${item.title}`);
  };

  const removeItemFromCart = (item) => {
    const updatedCart = cart.filter((cartItem) => cartItem.id !== item.id);
    setCart(updatedCart);
    toast.error(`${item.title} removed from cart`);
  };

  const totalPrice = cart.reduce((total, cartItem) => {
    return total + cartItem.price * cartItem.quantity;
  }, 0);

  const totalItems= cart.reduce((total,cartItem)=>{
    return total + cartItem.quantity
  },0);
  const [showModal, setShowModal] = useState(false);

  const confirmOrder = () => {
    setShowModal(true);
  };

  const startNewOrder = () => {
    setCart([]);
    setShowModal(false);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        handleIncrease,
        handleDecrease,
        removeItemFromCart,
        totalPrice,
        totalItems,
        showModal,
        setShowModal,
        confirmOrder,
        startNewOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;