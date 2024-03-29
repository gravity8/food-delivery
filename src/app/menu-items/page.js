"use client"
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";

import { redirect } from "next/navigation";
import { Bars } from "react-loader-spinner";
import Link from "next/link";

import UserTabs from "@/components/layout/UserTabs"
import { useProfile } from "@/components/useProfile"
import Image from "next/image";


const MenuItemsPage = () => {
    const {loading, data} =  useProfile();
    const [menuItems, setMenuItems] = useState(null)

    if(data && !data.admin){
        redirect("/")
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/menu-items");
                if (!response.ok) {
                    throw new Error("Failed to fetch menu items");
                }
                
                const menuItems = await response.json();
                console.log(menuItems)
                setMenuItems(menuItems);
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchData();
    }, []);
  return (
    <>
       {
        loading===true ? (
            <Bars 
                height="40"
                width="40"
                color="#f13a01"
                ariaLabel="bars-loading"
                wrapperStyle={{justifyContent:"center",alignItems:"center", height:"80vh"}}    
                wrapperClass=""
                visible={true}
            />
        ):(
            <section className="mt-8 max-w-2xl mx-auto">
                <UserTabs isAdmin={data.admin}/>
                <div className="mt-8">
                    <Link 
                        className="button flex items-center"
                        href={"/menu-items/new"}>
                            <span>Create new menu item</span>
                            <FaPlus />
                    </Link>
                </div>
                <div>
                    <h2
                        className="text-sm text-gray-500 mt-8"
                    >Edit menu items: </h2>
                    <div className="grid grid-cols-3 gap-2">
                        {
                            menuItems?.length>0 && menuItems.map((menuItem)=>(
                                <Link 
                                href={"/menu-items/edit/"+menuItem._id}
                                className="flex bg-gray-200 rounded-lg p-4 flex-col items-center text-center">
                                    <div className="relative w-24 h-24">
                                        <Image 
                                            className={"rounded-md"}
                                            src={menuItem.image} 
                                            alt={menuItem.image} 
                                            width={100} 
                                            height={100} 
                                        />
                                    </div>
                                    {menuItem.name}
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </section>
        )
        }
    </>
  )
}

export default MenuItemsPage