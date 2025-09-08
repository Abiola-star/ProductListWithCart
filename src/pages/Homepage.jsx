import React from 'react'
import Header from '../Components/Header';
import Cart from "../Components/Cart"
import AllDesserts from "../Components/AllDesserts"



export default function Homepage() {
  return (
    <div>
      <Header />
      <main className="flex flex-col lg:flex-row justify-between">
        <AllDesserts />
        <div className="">
          <Cart />
        </div>
      </main>
      
    </div>
  )
}
