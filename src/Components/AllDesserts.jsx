import React, { useContext } from "react";
import { desserts } from "../data";
import SingleDessert from "./SingleDessert";
import { CartContext } from "./Context/cartContext";

export default function AllDesserts() {
  const { cart } = useContext(CartContext);

  return (
    <div className="flex flex-wrap ">
      {desserts.map((dessert) => {
        const inCart = cart.some((cartItem) => cartItem.id === dessert.id);
        return <SingleDessert key={dessert.id} {...dessert} inCart={inCart} />;
      })}
    </div>
  );
}