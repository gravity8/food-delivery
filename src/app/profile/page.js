"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState , useEffect} from "react";
import toast from "react-hot-toast";

import { Bars } from 'react-loader-spinner'

import UserTabs from "@/components/layout/UserTabs"
import UserForm from  "@/components/layout/UserForm"
import { useProfile } from "@/components/useProfile";



const ProfilePage = () => {
    const {loading, data} = useProfile();
    const session = useSession();
    const [user, setUsers] = useState(null);
    const [profileFetched, setProfileFetched] = useState(false);
    const {status} = session;

    
    if(status==="unauthenticated"){
        redirect("/login")
    }

    useEffect(()=>{
        if(status==="authenticated"){

          fetch("/api/profile",{
                method: "GET",
                headers:{
                    "Content-Type": "application/json",
                }
            }).then(response =>{
                if(response.ok){
                    response.json().then(data =>{
                        setUsers(data)
                    })
                    setProfileFetched(true);
                }
            })
        }
    },[session, status])

    const handleProfileUpdate = async (e,data) =>{
        e.preventDefault()
        
        const savingPromise = fetch("/api/profile",{
        method: "PUT",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(data)
        })


        await toast.promise(savingPromise,{
            loading: "Saving profile...",
            success: "Profile Saved!",
            error: "Something went wrong!"
        })
    }
  

  return (
    <div className="mt-8">

        {
        (loading===true || !profileFetched)? (
            
            <Bars
                height="40"
                width="40"
                color="#f13a01"
                ariaLabel="bars-loading"
                wrapperStyle={{justifyContent:"center",alignItems:"center", height:"80vh"}}    
                wrapperClass=""
                visible={true}
            />
            
            )
            
        :
        (
        <>
            <UserTabs isAdmin = {data.admin}/>
            <div className="max-w-2xl mx-auto ">
                <UserForm user={user} onSave={handleProfileUpdate}/>
            </div>
        </>
    )
    }
    </div>
    )
}

export default ProfilePage