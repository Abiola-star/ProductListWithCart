import {React, useState} from 'react'
import {Link} from "react-router"
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import {motion, AnimatePresence} from "framer-motion"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] =useState(false)

  const toggleMenu =()=>{
    setIsMenuOpen(!isMenuOpen)
  }
  return (
    <header className="bg-rose-100 py-10 w-full">
        <nav className="container mx-auto flex justify-between items-center px-4">
            <Link to="/">
            <span className="font-bold text-3xl">Desserts</span>
            </Link>

             <button onClick={toggleMenu} className="md:hidden">
              {isMenuOpen ? <IoCloseSharp size={30} /> : <GiHamburgerMenu size={30} /> }
             </button>

{/* for large screen */}
            <div className="hidden md:flex gap-5">
              {
              [{
                content:"Sign In",
                path: "/signin"
              },
              {
                content:"Sign Up",
                path: "/signup"
              }].map((link, index)=>{
                return <motion.div key={link.content}
                initial={{opacity: 0,y:-10}}
                animate={{opacity:1, y:0}}
                transition={{delay: index * 0.1}}
                whileHover={{scale: 1.1}}>
                  <Link className="bg-red-500 py-2 px-3 rounded-md text-white hover:bg-red-900" to={link.path}>
                  {link.content}
                  </Link>
                </motion.div>
              })
              }
            </div>

{/* mobile menu tab */}
           <AnimatePresence>
  {isMenuOpen && (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 w-full max-h-[70vh] bg-rose-600 py-6 px-6 bg-opacity-95 md:hidden z-50"
    >
      <div className="flex justify-end mb-4">
        <button onClick={toggleMenu} className="text-white">
          <IoCloseSharp size={30} />
        </button>
      </div>
      <nav className="flex flex-col gap-4">
        {[
          { content: "Sign In", path: "/signin" },
          { content: "Sign Up", path: "/signup" }
        ].map((link, index) => (
          <motion.div
            key={link.content}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <Link
              to={link.path}
              onClick={toggleMenu}
              className="block bg-red-500 py-3 px-4 rounded-md text-white text-center hover:bg-red-900"
            >
              {link.content}
            </Link>
          </motion.div>
        ))}
      </nav>
    </motion.div>
  )}
</AnimatePresence>

        </nav>
    </header>
  )
}