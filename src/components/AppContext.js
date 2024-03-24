"use client"
import {SessionProvider, useSession} from "next-auth/react"
import { createContext, useEffect, useState } from "react"

import toast from "react-hot-toast";

export const CartContext= createContext();
export const cartProductPrice = (cartProduct)=>{
    let price = Number(cartProduct.basePrice);
    if (cartProduct.size) {
      price += cartProduct.size.price;
    }
    if (cartProduct.extras?.length > 0) {
      for (const extra of cartProduct.extras) {
        price += extra.price;
      }
    }
    return price;
}

export const AppProvider =({children})=>{
    const [cartProducts, setCartProducts] = useState([]);

    const ls = typeof window != "undefined" ? window.localStorage : null;

    useEffect(()=>{
     if(ls && ls.getItem("cart-food-delivery")){
        setCartProducts(JSON.parse(ls.getItem("cart")))
     }
    },[])
    
    const removeCartProduct = (indexToRemove) =>{
        setCartProducts(prevCartProducts => {
            const newCartProducts = prevCartProducts
              .filter((v,index) => index !== indexToRemove);

            fetch("/api/cart",{
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(newCartProducts)
            })
            
            saveCartProductsToLocalStorage(newCartProducts);
            return newCartProducts;
          });
          toast.success('Product removed');

    }

    const clearCart =async()=>{
        const allCartItems = cartProducts;
        console.log(allCartItems)
       const data =  fetch("/api/cart",{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(allCartItems)
        })
        setCartProducts([])
        saveCartProductsToLocalStorage([])
    }
    const saveCartProductsToLocalStorage = (cartProducts) =>{
        if(ls){
            ls.setItem("cart-food-delivery", JSON.stringify(cartProducts))
        }
    }
   
    const addToCart = (product, size=null, extras={}) =>{
        setCartProducts(prevProducts =>{
            const cartProduct = {...product, size, extras}
            const newProducts = [...prevProducts, cartProduct ]
            fetch("/api/cart",{
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(newProducts)
            })
            saveCartProductsToLocalStorage(newProducts)
            return newProducts;
        })

    }
    return (
        <SessionProvider>
            <CartContext.Provider value={{cartProducts, setCartProducts, addToCart, removeCartProduct, clearCart, cartProductPrice}}>
                {children}
            </CartContext.Provider>
        </SessionProvider>
    )
}
