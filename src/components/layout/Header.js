"use client";
// import { getSession } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { CartContext } from "../AppContext";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoExitOutline } from "react-icons/io5";

const Header = () => {

  const {cartProducts,saveAndClearCart} = useContext(CartContext)
  const session = useSession();
  const status = session?.status;
  const userData = session.data?.user;

  // console.log(cartProducts)

  let userName = userData?.name || userData?.email;
  if (userName && userName.includes(' ')) {
    userName = userName.split(' ')[0];
  }
  useEffect(()=>{
    userName = userData?.name ? userData?.name : userData?.email;
  },[])

  const handleLogout = async () =>{
    await saveAndClearCart()
    signOut()
  }
  return (
    <header className="flex justify-between items-center sticky top-0 py-2 bg-white z-10"> 
      <Link className="text-primary font-bold text-2xl " href="">
          ST PIZZA
      </Link>
      <nav className="flex gap-8 text-gray-500 font-semibold items-center">
          <Link className="hover:text-primary" href={"/"}>Home</Link>
          <Link className="hover:text-primary" href={"/menu"}>Menu</Link>
          <Link className="hover:text-primary" href={"/#about"}>About</Link>
          <Link className="hover:text-primary" href={"/#contact"}>Contact</Link>
          
      </nav>
      <nav className="flex gap-4 text-gray-500 font-semibold items-center">
        <Link href={"/cart"} className="relative"> 
          <i>
            <AiOutlineShoppingCart size={24}/>
          </i>
          {
            cartProducts?.length>0 && 
            <span className="absolute flex items-center justify-center -top-2  -right-2 font-light h-5 w-5 text-white text-xs bg-red-600 rounded-full">
              {cartProducts?.length}
            </span>
          }
          
        </Link>
        {status==="authenticated" 
        &&
          <>
            <Link href={"/profile"} className="whitespace-nowrap">Hello, {userName}</Link>
            <button
              // className=" text-white" 
              onClick={handleLogout}
            > 
              <IoExitOutline className="text-red-700" size={24}/>
            </button>
          </>
          
        }
        {
          status==="unauthenticated" &&
          <>
            <Link
            href={"/login"}
            >
              login
            </Link>
            <Link 
            className="bg-primary rounded-full text-white px-6 py-2" 
            href={"/register"}
            >
              Register
            </Link>
          </>
        }
        
        

      </nav>
    </header>
  )
}

export default Header