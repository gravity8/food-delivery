"use client";

import UserTabs from "@/components/layout/UserTabs"
import { useState, useEffect } from "react";
import {useProfile} from "@/components/UseProfile"
import { redirect } from "next/navigation";
import { Bars } from "react-loader-spinner";
import toast from "react-hot-toast";

const CategoriesPage = () => {

    const [categoryName, setCategoryName] = useState("");
    const [categories, setCategories] = useState([]);
    const [editCategory, setEditCategory] = useState(null);

    useEffect(()=>{
        fetchCategory();
    },[])

    const fetchCategory = ()=>{
        fetch("/api/categories").then(response=>{
            response.json().then(categories=>{
                setCategories(categories)
            })
        })
    }
    const {loading, data} = useProfile();
    if(data && !data.admin){
        redirect("/")
    }

    const handleCategorySubmit = async (e) =>{
        e.preventDefault();
        const creationPromise = new Promise(async (resolve, reject)=>{
            const data = {name: categoryName}
            if(editCategory){
                data._id = editCategory._id;
            }
            const response = await fetch("api/categories",{
                method: editCategory? "PUT":"POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body:JSON.stringify(data)
            })
            setCategoryName("")
            fetchCategory();
            if(response.ok){
                resolve();
            }
            else reject();
        })
        

       toast.promise(
            creationPromise
            ,{
            loading:editCategory?"Updating category" : "Adding category",
            success: editCategory? "Category updated":"Category added",
            error: editCategory ? "Failed to update category" :"Failed to add category"
        })

        setEditCategory(null)
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
                    <form className="mt-8" onSubmit={handleCategorySubmit}>
                        <div className="flex items-center gap-2">
                            <div className="grow">
                                 <label>{editCategory ? "Update category name: ":  "New category name"}</label>
                                 {editCategory && 
                                    <b>{editCategory.name}</b>
                                 }
                                <input 
                                    type="text"
                                    value={categoryName}
                                    onChange={(e)=>setCategoryName(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="mt-3">{editCategory? "Update" :"Create"}</button>
                        </div>
                       
                    </form>
                    <div>
                        <h2 className="mt-8 text-sm text-gray-500 ">Edit Category:</h2>
                        {
                            categories.length>0 && categories.map((c)=>(
                                <div 
                                onClick={()=>{
                                    setEditCategory(c)
                                    setCategoryName(c.name)
                                }}
                                className="flex bg-gray-200 rounded-xl mb-2 p-2 px-4 gap-1 cursor-pointer">
                                    {c.name}
                                </div>
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