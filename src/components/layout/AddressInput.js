

const AddressInput = ({addressProps, setAddressProps}) => {
    const {phone, streetAddress, postalCode, city, country} = addressProps;
  return (
    <>
        <label> Phone number</label>
            <input 
                type= "tel" 
                placeholder="Phone Number"
                value={phone}
                onChange={e=>  setAddressProps("phoneNumber",e.target.value)}
            />
            <label >Street address</label>
            <input 
                type="text" 
                placeholder="Street Address"
                value={streetAddress}
                onChange={e=>  setAddressProps("streetAddress",e.target.value)}
            />
            
            <div className="flex gap-4">
                <div className="flex flex-col grow">
                    <label >Postal code</label>
                    <input 
                        type="text" 
                        placeholder="Postal Code"
                        value={postalCode}
                        onChange={e=>  setAddressProps("postalCode", e.target.value)}
                    />
                </div>
                <div className="flex flex-col grow">
                    <label >City</label>
                    <input 
                        type="text"
                        placeholder="City"
                        value={city}
                        onChange={e=>  setAddressProps("city", e.target.value)}
                    />  
                </div>
                
            </div>
            <label>Country</label>
            <input 
                type="text" 
                placeholder="Country"
                value={country}
                onChange={e=>  setAddressProps("country",e.target.value)}
            />
    </>
  )
}

export default AddressInput