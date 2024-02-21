"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Header = () => {

  const session = useSession();
  const status = session.status;

  const userName = session.data?.user?.name.split(" ")[0] || session.data?.user?.email;

  return (
    <header className="flex justify-between items-center "> 
      <Link className="text-primary font-bold text-2xl " href="">
          ST PIZZA
      </Link>
      <nav className="flex gap-8 text-gray-500 font-semibold items-center">
          <Link href={"/"}>Home</Link>
          <Link href={""}>Menu</Link>
          <Link href={""}>About</Link>
          <Link href={""}>Contact</Link>
          
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

      </nav>
    </header>
  )
}

export default Header