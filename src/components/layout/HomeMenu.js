"use client"

import Image from "next/image"
import MenuItem from "../menu/MenuItem"
import Sectionheaders from "./Sectionheaders"
import { useEffect, useState } from "react"

const HomeMenu = () => {
    const [bestSellers, setBestSellers] = useState([])
    useEffect(()=>{
        fetch("/api/menu-items").then(res=>{
        if(res.ok){
            res.json().then(menuItems =>{
                setBestSellers(menuItems.slice(-3));

            })
        }
            
        })
    },[])
  return (
    <section className="">
        <div className="absolute left-0 group right-0  w-full">
            <div className="h-48 w-48 absolute -left-0 -top-[70px] -z-10">
                <Image src={"/sallad1.png"} alt="salad1" height={189} width={109}></Image>
            </div>
            <div className="h-48 absolute -top-[100px] right-0 -z-10">
                <Image src={"/sallad2.png"} alt="salad2" height={195} width={107}></Image>
            </div>
        </div>
        <div className="text-center mb-4">
            <Sectionheaders subHeader={"Check out"} mainHeader={"Our Best Sellers"} />
        </div>
        <div className="grid grid-cols-3 gap-4">
            {
                bestSellers?.length>0 && bestSellers.map((item)=>(
                    <MenuItem {...item}/>
                ))
            }
        </div>
        
    </section >
  )
}

export default HomeMenu