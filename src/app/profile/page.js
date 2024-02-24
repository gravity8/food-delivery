"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState , useEffect} from "react";
import toast from "react-hot-toast";
import { Bars } from 'react-loader-spinner'

import UserTabs from "@/components/layout/UserTabs"



const ProfilePage = () => {
    const session = useSession();
    const [userName,setUserName] = useState("");
    const [userImage, setUserImage] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [country, setCountry] =  useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [profileFetched, setProfileFetched] = useState(false);
    const {status} = session;
    // const status = "loading"

    
    if(status==="unauthenticated"){
        redirect("/login")
    }

    useEffect(()=>{
        if(status==="authenticated"){
            setUserName(session?.data?.user?.name)
            setUserImage(session?.data?.user?.image)

            fetch("/api/profile",{
                method: "GET",
                headers:{
                    "Content-Type": "application/json",
                }
            }).then(response =>{
                response.json().then(data =>{
                    data?.name && setUserName(data.name);
                    setPhoneNumber(data.phone);
                    setCountry(data.country);
                    setCity(data.city);
                    setStreetAddress(data.streetAddress);
                    setPostalCode(data.postalCode);
                    setIsAdmin(data.admin);
                    setUserImage(data.image);
                })
                setProfileFetched(true);
            })
        }
    },[session, status])

    const handleProfileUpdate = async (e) =>{
        e.preventDefault()
        
        const savingPromise = fetch("/api/profile",{
        method: "PUT",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({
            name:userName,
            image: userImage,
            phone:phoneNumber,
            streetAddress,
            city,
            postalCode,
            country,
        })
        })


        await toast.promise(savingPromise,{
            loading: "Saving profile...",
            success: "Profile Saved!",
            error: "Something went wrong!"
        })
    }

    const handleImageChange = async (e) =>{
        const files = e.target.files;

        if(files?.length === 1){
            const data = new FormData();
            data.set('file', files[0])
    
           const uploadPromise =  fetch("/api/upload",{
            method: "POST",
            body: data
            }).then((response) =>{
                if(response.ok) {
                    return response.json().then(link=>{
                        setUserImage(link);

                    });
                }
                throw new Error("Something went wrong!");
            })
                

            await toast.promise(uploadPromise,{
                loading: "Uploading Image...",
                success: "Image Uploaded!",
                error: "Something went wrong!"
            })
            
        }
       
    }   

  return (
    <div className="mt-8">

        {
        (status==="loading" || !profileFetched)? (
            
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
        <UserTabs isAdmin = {isAdmin}/>
        <div className="max-w-md mx-auto ">
            <div className="flex gap-4">
                <div className=" p-2 rounded-lg relative self-start pt-0 max-w-[120px] -z-10">
                    {
                        userImage && (
                            <Image 
                            draggable="false"
                            className={"rounded-lg w-full h-full mb-1"} 
                            src={userImage} 
                            alt={"avatar"} 
                            width={250} 
                            height={250}
                            />
                        )
                    }
                   
                    <label>
                        <input 
                        type="file" 
                        onChange={handleImageChange} 
                        hidden />
                        <span className="button">Edit</span> 
                    </label>
                   
                </div>
                <form className="grow" onSubmit={handleProfileUpdate}>
                    <label>Firstname and lastname</label>
                    <input 
                        type="text" 
                        placeholder="firstname and lastname"
                        value={userName}
                        onChange={e=>setUserName(e.target.value)}
                    />
                    <label >Email</label>
                    <input 
                        type="email" 
                        disabled={true} 
                        value={session?.data?.user?.email}
                    />
                    <label> Phone number</label>
                    <input 
                        type= "tel" 
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChange={e=> setPhoneNumber(e.target.value)}
                    />
                    <label >Street address</label>
                    <input 
                        type="text" 
                        placeholder="Street Address"
                        value={streetAddress}
                        onChange={e=> setStreetAddress(e.target.value)}
                    />
                    
                    <div className="flex gap-4">
                        <div className="flex flex-col">
                            <label >Postal code</label>
                            <input 
                                type="text" 
                                placeholder="Postal Code"
                                value={postalCode}
                                onChange={e=> setPostalCode(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col">
                          <label >City</label>
                            <input 
                                type="text"
                                placeholder="City"
                                value={city}
                                onChange={e=> setCity(e.target.value)}
                            />  
                        </div>
                        
                    </div>
                    <label>Country</label>
                    <input 
                        type="text" 
                        placeholder="Country"
                        value={country}
                        onChange={e=> setCountry(e.target.value)}
                    />
                    <button
                        className="w-full" 
                        type="submit"
                    >
                        Save
                    </button>
                </form>
            </div>
        </div>
        </>
    )
    }
    </div>
    )
}

export default ProfilePage