"use client"
import { redirect } from "next/dist/server/api-utils";
import { useEffect, useState } from "react";

import { Bars } from "react-loader-spinner";
import toast from "react-hot-toast";

import {useProfile} from "@/components/useProfile"
import UserTabs from "@/components/layout/UserTabs"
import UserForm from "@/components/layout/UserForm";
import { useParams } from "next/navigation";

const EditUserPage = () => {
    const {loading, data} = useProfile();
    const [user, setUser] = useState(null)
    const {id} = useParams();

    if(data && !data.admin){
        redirect("/")
    }
    useEffect(() => {
        fetch('/api/profile?_id='+id).then(res => {
          res.json().then(user => {
            setUser(user);
          });
        })
    }, []);

    const handleSaveButtonClick = async (e, data) =>{
        e.preventDefault();
        const promise = new Promise(async (resolve, reject) => {
        const res = await fetch('/api/profile', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({...data,_id:id}),
        });
        if (res.ok)
            resolve();
        else
            reject();
        });

        await toast.promise(promise, {
        loading: 'Saving user...',
        success: 'User saved',
        error: 'An error has occurred while saving the user',
        });
    }
  return (
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
            ):(
                <section className="max-w-2xl mx-auto">
                    <UserTabs isAdmin={data.admin}/>
                    <UserForm user={user} onSave={handleSaveButtonClick}/>
                </section>
            )
        }
    </>
  )
}

export default EditUserPage