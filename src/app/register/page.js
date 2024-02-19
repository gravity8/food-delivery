"use client";
import { useState } from "react";
import Image from "next/image";

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const hadleFormSubmit =(e)=>{
        e.preventDefault();
        fetch("/api/register", {
            method:"POST", 
            body: JSON.stringify(email, password),
            headers:{'Content-Type': 'application/json'}
        })
    }
  return (
    <section className="mt-8">
        <h1 
        className="text-center text-primary text-4xl mb-4"
        >
            Register
        </h1>
        <form 
        className="block max-w-xs mx-auto"
        onSubmit={hadleFormSubmit}
        >
            <input 
            type="email" 
            placeholder="email" 
            value={email}
            onChange={e=>setEmail(e.target.value)}
            />
            <input 
            type="password" 
            placeholder="password"
            value={password}
            onChange={e=>setPassword(e.target.value)}
            />
            <button type="submit"> Register </button>
            <div
             className="my-4 text-center text-gray-500"
            >or login with provider</div>
            <button className="flex justify-center items-center gap-4">
                <Image src={"/google.png"} width={24} height={24}></Image>
                Login with Google
            </button>
        </form>
        <div>

        </div>
    </section>
  )
}

export default RegisterPage;