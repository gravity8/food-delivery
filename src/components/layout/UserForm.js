
import { useEffect, useState } from "react";

import EditableImage from "@/components/layout/EditableImage"

const UserForm = ({user, onSave}) => {
    const [userName,setUserName] = useState(user?.name || "");
    const [userImage, setUserImage] = useState(user?.image || "");
    const [phoneNumber, setPhoneNumber] = useState(user?.phone || "");
    const [streetAddress, setStreetAddress] = useState(user?.streetAddress || "");
    const [city, setCity] = useState(user?.city || "");
    const [postalCode, setPostalCode] = useState(user?.postalCode || "");
    const [country, setCountry] =  useState(user?.country || "");

    useEffect(() => {
        setUserName(user?.name || "");
        setUserImage(user?.image || "");
        setPhoneNumber(user?.phone || "");
        setStreetAddress(user?.streetAddress || "");
        setCity(user?.city || "");
        setPostalCode(user?.postalCode || "");
        setCountry(user?.country || "");
    }, [user]);

  return (
    <div className="flex gap-4">
        <div className=" p-2 rounded-lg relative self-start pt-0 max-w-[120px] ">
            <EditableImage link={userImage} setLink={setUserImage}/>
            
        </div>
        <form 
        className="grow" 
        onSubmit={(e)=>onSave(e,{name:userName, image:userImage, phone:phoneNumber, streetAddress,city,postalCode,country})}>
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
                value={user?.email}
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
                <div className="flex flex-col grow">
                    <label >Postal code</label>
                    <input 
                        type="text" 
                        placeholder="Postal Code"
                        value={postalCode}
                        onChange={e=> setPostalCode(e.target.value)}
                    />
                </div>
                <div className="flex flex-col grow">
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
  )
}

export default UserForm