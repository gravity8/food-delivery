"use client"

import {signIn} from "next-auth/react";
import Link from "next/link"
import Image from"next/image"
import { useState } from "react";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loggingInProgress, setLoggingInProgress] = useState(false);
    // const [error, setError] = useState(false)

    const handleFormSubmit =async (e)=>{
        e.preventDefault();
        // setError(false);
        setLoggingInProgress(true);
            await signIn("credentials",{email,password, callbackUrl:"/"})
        setLoggingInProgress(false);
    }

    const handleGoogleSignIn = async () => {
        await signIn('google',{callbackUrl:"/"});
      };
  return (
    <section className="mt-8">
        <h1 
        className="text-center text-primary text-4xl mb-4"
        >
            Login
        </h1>
        {/* {error && (
            <div className="my-4 text-center text-red-500">
                An Error has Occurred.<br/>
                Please try again.
            </div>
        )} */}
        <form 
        className="block max-w-xs mx-auto"
        onSubmit={handleFormSubmit}
        >
            <input 
            type="email" 
            placeholder="email" 
            value={email}
            onChange={e=>setEmail(e.target.value)}
            disabled={loggingInProgress}
            />
            <input 
            type="password" 
            placeholder="password"
            value={password}
            onChange={e=>setPassword(e.target.value)}
            disabled={loggingInProgress}
            />
            {/* {err} */}
            <button 
            type="submit"
            disabled={loggingInProgress}
            > Login </button>
            <div
             className="my-4 text-center text-gray-500"
            >or login with provider</div>
            <button 
            type="button"
            onClick={handleGoogleSignIn}
            className="flex justify-center items-center gap-4 button"
            >
                <Image src={"/google.png"} alt="goggle" width={24} height={24}/>
                Login with Google
            </button>
            <div 
            className=" text-center my-4"
            >
                Don't have an account? <Link className="text-primary hover:underline" href={"/register"}>Register here &raquo;</Link>
            </div>
        </form>
        <div>

        </div>
    </section>
  )
}

export default LoginPage