
import { useEffect, useState } from "react";

import EditableImage from "@/components/layout/EditableImage"
import AddressInput from "@/components/layout/AddressInput"

const UserForm = ({user, onSave}) => {
    const [userName,setUserName] = useState(user?.name || "");
    const [userImage, setUserImage] = useState(user?.image || "");
    const [phone, setPhone] = useState(user?.phone || "");
    const [streetAddress, setStreetAddress] = useState(user?.streetAddress || "");
    const [city, setCity] = useState(user?.city || "");
    const [postalCode, setPostalCode] = useState(user?.postalCode || "");
    const [country, setCountry] =  useState(user?.country || "");

    useEffect(() => {
        setUserName(user?.name || "");
        setUserImage(user?.image || "");
        setPhone(user?.phone || "");
        setStreetAddress(user?.streetAddress || "");
        setCity(user?.city || "");
        setPostalCode(user?.postalCode || "");
        setCountry(user?.country || "");
    }, [user]);

    function handleAddressChange(propName, value) {
        if (propName === 'phoneNumber') setPhone(value);
        if (propName === 'streetAddress') setStreetAddress(value);
        if (propName === 'postalCode') setPostalCode(value);
        if (propName === 'city') setCity(value);
        if (propName === 'country') setCountry(value);
      }
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
            <AddressInput 
            addressProps={{
                phone, streetAddress, city,postalCode, country
            }} 
            setAddressProps={handleAddressChange}
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