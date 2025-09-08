import './App.css'
import { BrowserRouter, Routes, Route } from "react-router"
import HomePage from "./pages/Homepage"
import CartProvider, { CartContext } from "./Components/Context/cartContext"
import SignInpage from "./pages/SignInpage"
import SignUppage from "./pages/SignUppage"
import { ToastContainer } from "react-toastify"

function App() {

  return (
    <CartProvider>
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<HomePage />} />
    <Route path='/SignIn' element={<SignInpage />} />
    <Route path='/SignUp' element={<SignUppage />} />
    </Routes>
    <ToastContainer/>
   </BrowserRouter> 
   </CartProvider>
    
  )
}

export default App
