import Link from "next/link";

const Header = () => {
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
        <Link 
        // className="hover:bg-primary transition-colors duration-500 rounded-full hover:text-white px-6 py-2" 
        href={"/login"}
        >
          Login
        </Link>
        <Link 
        className="bg-primary rounded-full text-white px-6 py-2" 
        href={"/register"
        }>
          Register
        </Link>
      </nav>
    </header>
  )
}

export default Header