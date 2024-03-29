
"use client"
import { useState } from "react";

import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { Bars } from "react-loader-spinner";
import Link from "next/link";

import UserTabs from "@/components/layout/UserTabs"
import { useProfile } from "@/components/useProfile";
import Left from "@/components/icons/Left"
import MenuItemForm from "@/components/layout/MenuItemForm";

const NewMenuItemPage = () =>{

    const {loading, data} = useProfile();
    const [redirectToItems, setRedirectToItems] = useState(false)

    if(data && !data.admin){
        redirect("/")
    }
    const handleFormSubmit = (e,data) =>{
        e.preventDefault();
        
        const savingPromise = new Promise(async (resolve, reject)=>{
            const response =await  fetch("/api/menu-items",{
                method: "POST",
                body: JSON.stringify(data),
                headers : {
                    "Content-Type":"application/json"
                }
            })
            if(response.ok){
                resolve();
            }
            else{
                reject();
            }
        })
        
        toast.promise(savingPromise,{
            loading: "Saving item...",
            success: "Item saved",
            error: "Error saving item",
        })
        setRedirectToItems(true)
    }

    if(redirectToItems){
        return redirect("/menu-items")
    }
    return(
        <>
            {
                loading===true ?(
                    <Bars 
                        height="40"
                        width="40"
                        color="#f13a01"
                        ariaLabel="bars-loading"
                        wrapperStyle={{justifyContent:"center",alignItems:"center", height:"80vh"}}    
                        wrapperClass=""
                        visible={true}
                    />
                ):
                (
                    <section className="mt-8 max-w-2xl mx-auto">
                        <UserTabs isAdmin={data.admin}/>
                        <div className="max-w-2xl mx-auto mt-8">
                            <Link href={'/menu-items'} className="button">
                            <Left />
                            <span>Show all menu items</span>
                            </Link>
                        </div>
                        <MenuItemForm menuItem={null} onSubmit={handleFormSubmit} />
                    </section>
                )
            }
        
        </>
    )
}

export default NewMenuItemPage;