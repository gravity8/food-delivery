"use client"
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

import { Bars } from "react-loader-spinner";

import {useProfile} from "@/components/useProfile";
import UserTabs from "@/components/layout/UserTabs";


const UsersPage = () => {
  const [users, setUsers] = useState([])
  const {loading, data} = useProfile();

  if(data&&!data.admin){
    redirect("/")
  }

  useEffect(()=>{
    fetch("/api/users").then(res=>{
      if(res.ok){
        res.json().then(users=>{
        setUsers(users)
      })
      }
    })
  },[])
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
        ) :(
          <section className=" max-w-2xl mx-auto mt-8">
            <UserTabs isAdmin={data.admin}/>
            <div className="mt-8">
                {
                  users.length >0 && users.map((user,index) =>(
                    <div
                    key={index}
                    className="bg-gray-100 rounded-lg mb-2 p-2 flex justify-between items-center px-5">
                      <div className="grid grid-cols-2 md:grid-cols-3 px-3 gap-4 grow">
                        <div className="text-gray-900">
                          {user.name && (<span>{user.name}</span>)}
                          {!user.name && (<span className=" italic">{"No name"}</span>)}
                        </div>
                        
                        <span className="text-gray-500">{user.email}</span>
                      </div>
                      <div>
                          <button 
                            type="button" >
                              <Link className="button hover:bg-white" href={"/users/"+user._id}>Edit</Link>
                          </button>
                      </div>
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

export default UsersPage