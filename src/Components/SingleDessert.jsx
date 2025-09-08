import React, { useContext } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { CartContext } from "./Context/cartContext";

export default function SingleDessert({ id, img, title, description, price }) {
  const { cart, addToCart, handleIncrease, handleDecrease } = useContext(CartContext);

  const itemInCart = cart.find((item) => item.id === id);
  const quantity = itemInCart?.quantity || 0;

  return (
    <div className="p-5">
      <div className="relative inline-block">
        {itemInCart ? <img className="rounded-lg w-full lg:w-[250px] border-2 border-rose-500" src={img} alt={title} /> : <img className="rounded-lg w-full lg:w-[250px]" src={img} alt={title} />}

        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-[150px]">
          {itemInCart ? (
            <div className="flex items-center justify-between gap-2 border rounded-3xl py-2 px-4 text-lg bg-rose-500 text-white shadow-lg">
              <button onClick={() => handleDecrease(itemInCart)}>
                <CiCircleMinus size={20} />
              </button>
              <span>{quantity}</span>
              <button onClick={() => handleIncrease(itemInCart)}>
                <CiCirclePlus size={20} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => addToCart({ id, img, title, description, price })}
              className="flex items-center gap-2 border px-5 rounded-3xl h-[40px] bg-white shadow-lg"
            >
              <span className="text-rose-400">
                <MdAddShoppingCart />
              </span>
              Add to Cart
            </button>
          )}
        </div>
      </div>

      <h2 className="mt-8 text-gray-600 text-xl">{title}</h2>
      <p className="text-xl text-dark font-semibold">{description}</p>
      <p className="text-2xl">${price.toFixed(2)}</p>
    </div>
  );
}