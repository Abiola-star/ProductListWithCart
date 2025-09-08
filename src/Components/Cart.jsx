import React, { useContext } from "react";
import { CartContext } from "./Context/cartContext";
import CartItem from "./Cartitems";
import ConfirmOrderModal from "../Components/confirmOrder";
import illustrationemptycartimg from "../assets/images/illustration-empty-cart.svg"
import tree from "../assets/images/icon-carbon-neutral.svg"

export default function Cart() {
  const { cart, totalPrice,totalItems, confirmOrder, showModal, setShowModal } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <div className="h-[250px] bg-white rounded-lg py-8">
        <h2 className="text-xl pl-5 text-rose-950 font-bold">Your Cart (0)</h2>
        <div className="flex flex-col items-center pt-3">
          <img src={illustrationemptycartimg} alt="Cart is Empty" />
        <p className="text-sm text-rose-900 pt-4">Your added item will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-white rounded-lg py-8 px-4">
      {showModal && <ConfirmOrderModal showModal={showModal} setShowModal={setShowModal} />}
      <h2 className="text-xl  text-rose-950 font-bold">Your Cart ({totalItems})</h2>
      <div>
        {cart.map((dessert) => (
          <CartItem key={dessert.id} {...dessert} />
        ))}
      </div>
      <div className="flex items-center justify-between py-5">
        <p>Order Total</p>
        <p className="text-xl font-bold">${totalPrice.toFixed(2)}</p>
      </div>
      <div className="w-full bg-gray-100 rounded-md py-3">
        <div className="flex justify-center items-center gap-1">
         <img src={tree} alt="" /> 
         <p className="text-xs">
          This is a <span className="font-semibold">Carbon-Neutal</span> delivery
          </p>
        </div>
      </div>
      <button
      className="w-full bg-rose-500 text-white rounded-3xl py-3 mt-3"
        onClick={confirmOrder}
      >
        Confirm Order
      </button>
    </div>
  );
}
