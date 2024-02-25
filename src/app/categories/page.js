"use client";

import UserTabs from "@/components/layout/UserTabs"
import { useState, useEffect } from "react";
import {useProfile} from "@/components/UseProfile"
import { redirect } from "next/navigation";
import { Bars } from "react-loader-spinner";
import toast from "react-hot-toast";

import { FaTrash } from "react-icons/fa6";
import { FaPen } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

import DeleteItemButton from "@/components/layout/DeleteItemButton";

const CategoriesPage = () => {

    const [categoryName, setCategoryName] = useState("");
    const [categories, setCategories] = useState([]);
    const [editCategory, setEditCategory] = useState(null);
    const [deleteCategory, setDeleteCategory] = useState(null);

    useEffect(()=>{
        fetchCategory();
    },[])

    const fetchCategory = async () => {
        const response = await fetch("/api/categories");
        const categories = await response.json();
        setCategories(categories);
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
    async function handleDeleteClick(_id) {
        const promise = new Promise(async (resolve, reject) => {
          const res = await fetch('/api/categories?_id='+_id, {
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
    
        fetchCategory();
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
                        <div className="flex gap-2 items-end">
                        <div className="grow">
                            <label>
                            {editCategory ? 'Update category' : 'New category name'}
                            {editCategory && (
                                <>: <b>{editCategory.name}</b></>
                            )}
                            </label>
                            <input type="text"
                                value={categoryName}
                                onChange={ev => setCategoryName(ev.target.value)}
                            />
                        </div>
                        <div className="pb-2 flex gap-2">
                            <button 
                            disabled={!categoryName}
                            className="border border-primary" type="submit">
                            {editCategory ? 'Update' : 'Create'}
                            </button>
                            {editCategory && <button
                            type="button"
                            className="button"
                            onClick={() => {
                                setEditCategory(null);
                                setCategoryName('');
                            }}>
                            <FaXmark className="mt-1"/>
                            </button>}
                        </div>
                        </div>
                    </form>
                    <div>
                        {
                            categories.length >0 && (
                                <h2 className="mt-8 text-sm text-gray-500 ">Edit Category:</h2>
                            )
                        }
                        
                        {
                            categories.length>0 &&
                                categories.map((c)=>(
                                    <div className="flex items-start gap-2" key={c._id}>
                                        <div 
                                            className="flex bg-gray-200 w-full justify-between rounded-xl mb-2 p-2 px-4 gap-1 cursor-pointer"
                                        >
                                            <span className="mt-1">{c.name}</span>
                                            <div className="flex items-center gap-2">
                                                <button 
                                                    onClick={()=>{
                                                        setEditCategory(c)
                                                        setCategoryName(c.name)
                                                    }} 
                                                    className="button hover:bg-white">
                                                    <FaPen />
                                                </button>
                                                <DeleteItemButton label={<FaTrash />} onDelete={()=>handleDeleteClick(c._id)}/>
                                            </div>
                                        </div>
                                        
                                        
                                    </div>
                                )
                                
                            )
                        }
                        {
                            !categories.length>0 && (
                                <div className="my-8">
                                    <h2 className="text-gray-400 text-xl text-center">
                                        No categories available
                                    </h2>
                                </div>
                            )
                        }
                    </div>
                </section>
            )
        }
    </>
    
  )
}

export default CategoriesPage