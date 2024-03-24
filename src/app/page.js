"use client"

import {useEffect, useContext} from "react"
import { Hero } from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import Sectionheaders from "@/components/layout/Sectionheaders";
import { useProfile } from "@/components/useProfile";
import { useSession } from "next-auth/react";
import { CartContext } from "@/components/AppContext";


export default function Home() {
  const {setCartProducts} = useContext(CartContext);
  const {status} = useSession();
  const fetchCartItems = async()=>{
    await fetch("/api/cart").then(res=>{
      if(res.ok){
        res.json().then(cartItems=>{
        console.log(cartItems)
          if(cartItems.length>0){
            setCartProducts(cartItems[0]?.allCartItems)
          }
        })
      }
      
    })
  }
  useEffect(() => {
    if(status==="authenticated"){
      console.log("got here")
      fetchCartItems()
    }
  }, [status])
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16" id="about">
        <Sectionheaders
          subHeader={'Our story'}
          mainHeader={'About us'}
        />
        <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni minima odit recusandae. Illum ipsa non repudiandae? Eum ipsam iste quos suscipit tempora? Aperiam esse fugiat inventore laboriosam officiis quam rem!
          </p>
          <p>At consectetur delectus ducimus est facere iure molestias obcaecati quaerat vitae voluptate? Aspernatur dolor explicabo iste minus molestiae pariatur provident quibusdam saepe?</p>
          <p>Laborum molestias neque nulla obcaecati odio quia quod reprehenderit sit vitae voluptates? Eos, tenetur.</p>
        </div>
      </section>
      <section className="text-center my-8" id="contact">
        <Sectionheaders
          subHeader={'Don\'t hesitate'}
          mainHeader={'Contact us'}
        />
        <div className="mt-8">
          <a className="text-4xl underline text-gray-500" href="tel:+46738123123">
            +46 738 123 123
          </a>
        </div>
      </section>
    </>
  );
}
