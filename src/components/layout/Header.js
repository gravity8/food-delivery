"use client";
// import { getSession } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { CartContext } from "../AppContext";

const Header = () => {

  const {cartProducts} = useContext(CartContext)
  const session = useSession();
  const status = session?.status;
  const userData = session.data?.user;

  let userName = userData?.name || userData?.email;
  if (userName && userName.includes(' ')) {
    userName = userName.split(' ')[0];
  }
  useEffect(()=>{
    userName = userData?.name ? userData?.name : userData?.email;
  },[])

  return (
    <header className="flex justify-between items-center sticky top-0 py-2 bg-white z-10"> 
      <Link className="text-primary font-bold text-2xl " href="">
          ST PIZZA
      </Link>
      <nav className="flex gap-8 text-gray-500 font-semibold items-center">
          <Link href={"/"}>Home</Link>
          <Link href={"/menu"}>Menu</Link>
          <Link href={"/#about"}>About</Link>
          <Link href={"/#contact"}>Contact</Link>
          
      </nav>
      <nav className="flex gap-4 text-gray-500 font-semibold items-center">

        {status==="authenticated" 
        &&
          <>
            <Link href={"/profile"} className="whitespace-nowrap">Hello, {userName}</Link>
            <button
              className="bg-primary transition-colors duration-500 rounded-full text-white px-6 py-2" 
              onClick={()=>signOut()}
            >
              Logout
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
        
        <Link href={"/cart"}> Cart ({cartProducts.length})</Link>

      </nav>
    </header>
  )
}

export default Header