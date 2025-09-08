import React, { useContext } from "react";
import { CartContext } from "./Context/cartContext";
import { IoCloseCircleOutline } from "react-icons/io5";

export default function CartItem({ id, description, price, quantity }) {
  const { removeItemFromCart } = useContext(CartContext);

  return (
    <div>
        <div className="py-4 flex flex-row items-center justify-between border-b ">
          <div className="flex flex-col">
            <p className="font-semibold text-md">{description}</p>
            <div className="flex items-center gap-3 pt-2">
              <span className="font-bold text-rose-950">{quantity}x</span>
              <div className="flex gap-3">
                <p>@ ${price.toFixed(2)}</p>
                <p className="font-semibold">@ ${price.toFixed(2) * quantity.toFixed(2)}</p>
              </div>
            </div>
          </div>
          <button onClick={() => removeItemFromCart({ id, description, price })}>
            <span className="text-rose-900">
              <IoCloseCircleOutline size={23} />
            </span>
          </button>
        </div>
    </div>
  );
}