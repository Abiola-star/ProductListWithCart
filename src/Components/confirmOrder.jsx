import React, { useContext } from "react";
import { CartContext } from "./Context/cartContext";
import { IoMdCheckmarkCircle } from "react-icons/io";

export default function ConfirmOrderModal({ showModal, setShowModal }) {
  const { cart, totalPrice, startNewOrder } = useContext(CartContext);

  if (!showModal) return null;

  return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-md p-6">
        <span className="text-green-400"><IoMdCheckmarkCircle size={40} /></span>
        <h1 className="text-3xl pt-4 font-extrabold text-gray-800">
          Order Confirmed
        </h1>
        <p className="mb-4">We hope you enjoy your food</p>

        <div className="divide-y">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center py-3 px-4 bg-gray-200"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <img className="w-[60px]" src={item.img} alt={item.title} />
                  <div className="flex flex-col">
                    <p>{item.description}</p>
                    <div className="flex items-center gap-2">
                      <p>{item.quantity}x</p>
                      <p>@ ${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
                <p>${item.price.toFixed(2)}</p>
            </div>
            </div>  
          ))}
        </div>

        <div className="flex justify-between items-center text-lg font-bold mt-4">
          <span>Order Total</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>

        <button
          onClick={startNewOrder}
          className="bg-rose-500 hover:bg-rose-600 text-white w-full py-3 rounded-3xl mt-6 transition"
        >
          Start a new order
        </button>
      </div>
    </div>
  );
}