"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState , useEffect} from "react";
import { set } from "mongoose";


const ProfilePage = () => {
    const session = useSession();
    const [userName,setUserName] = useState("");
    const [profileUpdating, setProfileUpdating] = useState(false);
    const [profileUpdated, setProfileUpdated] = useState(false)
    const {status} = session;
    const userImage = session?.data?.user?.image

    useEffect(()=>{
        if(status==="authenticated"){
            setUserName(session?.data?.user?.name)
        }
    },[session, status])

    if(status==="loading"){
        return "Loading...";
    }
    if(status==="unauthenticated"){
        return redirect("/login");
    }

    const handleProfileUpdate = async (e) =>{
        e.preventDefault()
        setProfileUpdating(true)
        setProfileUpdated(false)
        const response = await fetch("/api/profile",{
            method: "PUT",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({name:userName})
        })
        if(response.ok){
            setProfileUpdated(true)
        }
        setProfileUpdating(false)
        setTimeout(()=>{
            setProfileUpdated(false)
        }, 2000)
    }

    const handleImageChange = async (e) =>{
        const files = e.target.files;

        if(files?.length === 1){
            const data = new FormData();
            data.set('files', files[0])
            await fetch("/api/upload",{
                method: "POST",
                body: data
            })
        }

    }   

  return (
    <div className="mt-8">
        <h1 
        className="text-center text-primary text-4xl mb-4"
        >
            Profile
        </h1>
        
        <div className="max-w-md mx-auto ">
            {profileUpdated && <h2 className="text-center bg-green-100 rounded-lg  py-2  mb-4 border border-green-500">
                Changes saved!
            </h2>}
            {profileUpdating && <h2 className="text-center bg-blue-100 rounded-lg  py-2  mb-4 border border-blue-500">
                Updating changes...
            </h2>}
            <div className="flex gap-4 items-center">
                <div className=" p-2 rounded-lg">
                   <Image 
                        draggable="false"
                        className={"rounded-lg w-full h-full mb-1"} 
                        src={userImage} 
                        alt={"avatar"} 
                        width={250} 
                        height={250}
                    />
                    <label>
                        <input 
                        type="file" 
                        onChange={handleImageChange} 
                        hidden />
                        <span className="button">Edit</span> 
                    </label>
                   
                </div>
                <form className="grow" onSubmit={handleProfileUpdate}>
                    <input 
                        type="text" 
                        className=" outline-gray-300" 
                        placeholder="firstname and lastname"
                        value={userName}
                        onChange={e=>setUserName(e.target.value)}
                        disabled={profileUpdating}
                    />
                    <input 
                        type="email" 
                        disabled={true} 
                        value={session?.data?.user?.email}
                    />
                    <button
                        className="submit" 
                        type="submit"

                        disabled={profileUpdating}
                    >
                        Save
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default ProfilePage