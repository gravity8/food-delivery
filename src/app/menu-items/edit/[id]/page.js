"use client"
import { useEffect, useState } from "react";

import toast from "react-hot-toast";
import { redirect, useParams } from "next/navigation";
import { Bars } from "react-loader-spinner";
import Link from "next/link";

import UserTabs from "@/components/layout/UserTabs"
import { useProfile } from "@/components/useProfile";

import MenuItemForm from "@/components/layout/MenuItemForm"
import Left from "@/components/icons/Left"
import DeleteItemButton from "@/components/layout/DeleteItemButton"

const EditMenuItemPage = () => {
    const {id} = useParams();
    const {loading, data} = useProfile();
    const [menuItem, setMenuItem] = useState(null)
    
    const [redirectToItems, setRedirectToItems] = useState(false)

    if(data && !data.admin){
        redirect("/")
    }

    useEffect(()=>{

        fetch("/api/menu-items").then(res=>{
            if(res.ok){
                res.json().then(menuitems=>{
                        const item = menuitems.find(i=> i._id===id)
                        setMenuItem(item)
                    })
            }
            
        })
    },[])
    const handleFormSubmit = (e, data) =>{
        e.preventDefault();
        
        data = {...data, _id:id}
        const savingPromise = new Promise(async (resolve, reject)=>{
            const response =await  fetch("/api/menu-items",{
                method: "PUT",
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

    async function handleDeleteClick() {
        const promise = new Promise(async (resolve, reject) => {
          const res = await fetch('/api/menu-items?_id='+id, {
            method: 'DELETE',
          });
          if (res.ok)
            resolve();
          else
            reject();
        });
    
        await toast.promise(promise, {
          loading: 'Deleting...',
          success: 'Deleted',
          error: 'Error',
        });
    
        setRedirectToItems(true);
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
                        <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit}/>
                        <div className="max-w-[475px] ml-auto mt-2">
                            <div className="max-w-xl ml-auto pl-4">
                                <DeleteItemButton
                                    label="Delete this menu item"
                                    onDelete={handleDeleteClick}
                                />
                            </div>
                        </div>
                    </section>
                )
            }
        
        </>
    )
}

export default EditMenuItemPage