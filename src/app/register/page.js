"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [creatingUser, setCreatingUser] = useState(false)
    const [userCreated, setUserCreated] =  useState(false)
    const [error, setError] = useState(false)

    const handleFormSubmit =async (e)=>{
        e.preventDefault();
        setError(false);
        setUserCreated(false);
        setCreatingUser(true);
        
        const response = await fetch("/api/register", {
            method: "POST",
            body: JSON.stringify({ email, password}),
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            setError(true);
            setUserCreated(false);
        } else {
            console.log("User registered");
            setUserCreated(true);
        }
        
        setCreatingUser(false);
    }
  return (
    <section className="mt-8">
        <h1 
        className="text-center text-primary text-4xl mb-4"
        >
            Register
        </h1>
        {userCreated && (
            <div className="my-4 text-center">
                User created. Now you can <Link className={"text-primary hover:underline"} href={"/login"}>login</Link>
            </div>
        )}
        {error && (
            <div className="my-4 text-red-500 text-center">
                An Error has Occurred.<br/>
                Please try again.
            </div>
        )}
        <form 
        className="block max-w-xs mx-auto"
        onSubmit={handleFormSubmit}
        >
            <input 
            type="email" 
            placeholder="email" 
            value={email}
            onChange={e=>setEmail(e.target.value)}
            disabled={creatingUser}
            />
            <input 
            type="password" 
            placeholder="password"
            value={password}
            onChange={e=>setPassword(e.target.value)}
            disabled={creatingUser}
            />
            {/* {err} */}
            <button 
            type="submit"
            disabled={creatingUser}
            > Register </button>
            <div
             className="my-4 text-center text-gray-500"
            >or login with provider</div>
            <button 
            type="button"
            onClick={()=> signIn('google', {callbackUrl: "/"})}
            className="flex justify-center items-center gap-4 button">
                <Image src={"/google.png"} alt={"google"} width={24} height={24} />
                Login with Google
            </button>
            <div className=" text-center my-4">
                Already have an account? <Link className="text-primary hover:underline" href={"/login"}>Login here &raquo;</Link>
            </div>
        </form>
        <div>

        </div>
    </section>
  )
}

export default RegisterPage;