"use client";

import UserTabs from "@/components/layout/UserTabs"
import { useState, useEffect } from "react";
import {useProfile} from "@/components/UseProfile"
import { redirect } from "next/navigation";
import { Bars } from "react-loader-spinner";
import toast from "react-hot-toast";

const CategoriesPage = () => {

    const [newCategoryName, setNewCategoryName] = useState("");
    const [categories, setCategories] = useState([]);

    useEffect(async ()=>{
        await fetch("/api/categories").then(response=>{
            response.json().then(categories=>{

            })
        })
    },[])

    const {loading, data} = useProfile();
    if(data && !data.admin){
        redirect("/")
    }

    const handleNewCategory = async (e) =>{
        e.preventDefault();
        const creationPromise = new Promise(async (resolve, reject)=>{
            const response = await fetch("api/categories",{
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body:JSON.stringify({name: newCategoryName})
            })

            if(response.ok){
                resolve();
            }
            else reject();
        })
        

       toast.promise(
            creationPromise
            ,{
            loading: "Adding Category",
            success: "Category Added",
            error: "Failed to add category"
        })
    }
    
  return (
    <>
        {
            loading ===true ? (
                <Bars
                    height="40"
                    width="40"
                    color="#f13a01"
                    ariaLabel="bars-loading"
                    wrapperStyle={{justifyContent:"center",alignItems:"center", height:"80vh"}}    
                    wrapperClass=""
                    visible={true}
                />
            ) : (
                <section className="mt-8 max-w-md mx-auto" >
                    <UserTabs isAdmin={data.admin}/>
                    <form className="mt-8" onSubmit={handleNewCategory}>
                        <div className="flex items-center gap-2">
                            <div className="grow">
                                 <label>New category name</label>
                                <input 
                                    type="text"
                                    value={newCategoryName}
                                    onChange={(e)=>setNewCategoryName(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="mt-3">Create</button>
                        </div>
                       
                    </form>
                    <div>
                        <h2 className="mt-8">Edit Category:</h2>
                        {
                            categories.length>0 && categories.map((category)=>(
                                <div className="flex">{category.name}</div>
                            ))
                        }
                    </div>
                </section>
            )
        }
    </>
    
  )
}

export default CategoriesPage