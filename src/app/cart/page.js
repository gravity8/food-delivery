"use client"
import { useEffect, useState } from "react";
import { CartContext, cartProductPrice} from "@/components/AppContext";
import Sectionheaders from "@/components/layout/Sectionheaders";
import { useProfile } from "@/components/useProfile"
import { useContext } from "react";
import { Bars } from "react-loader-spinner";

import CartProduct from "@/components/layout/CartProduct"
import AddressInput from "@/components/layout/AddressInput";

const CartPage = () => {
    const {loading, data} = useProfile();
    const {cartProducts, removeCartProduct} = useContext(CartContext);
    const [address, setAddress] = useState({});
    const {data:profileData} = useProfile();
    

    useEffect(() => {
        if (typeof window !== 'undefined') {
          if (window.location.href.includes('canceled=1')) {
            toast.error('Payment failed 😔');
          }
        }
      }, []);

      useEffect(() => {
        if (profileData?.city) {
          const {phone,streetAddress, city, postalCode, country} = profileData;
          const addressFromProfile = {
            phone,
            streetAddress,
            city,
            postalCode,
            country
          };
          setAddress(addressFromProfile);
        }
      }, [profileData]);
      


      //for address inputs change
      function handleAddressChange(propName, value) {
        setAddress(prevAddress => ({...prevAddress, [propName]:value}));
      }

      //To sum up all the products in cart
        let subtotal = 0;
        for (const p of cartProducts) {
            subtotal += cartProductPrice(p);
        }

        async function proceedToCheckout(ev) {
            ev.preventDefault();
            // address and shopping cart products
        
            const promise = new Promise((resolve, reject) => {
              fetch('/api/checkout', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                  address,
                  cartProducts,
                }),
              }).then(async (response) => {
                if (response.ok) {
                  resolve();
                  window.location = await response.json();
                } else {
                  reject();
                }
              });
            });
        
            await toast.promise(promise, {
              loading: 'Preparing your order...',
              success: 'Redirecting to payment...',
              error: 'Something went wrong... Please try again later',
            })
          }
  return (
    <>
        {
            loading==true ? (
                <Bars
                    height="40"
                    width="40"
                    color="#f13a01"
                    ariaLabel="bars-loading"
                    wrapperStyle={{justifyContent:"center",alignItems:"center", height:"80vh"}}    
                    wrapperClass=""
                    visible={true}
                />
            ):
            (
                <section className="mt-8">
                    <div className="text-center">
                        <Sectionheaders mainHeader={"Cart"}/>
                    </div>
                    
                    <div className=" mt-4 grid grid-cols-2 gap-6">
                        <div>
                            {
                                cartProducts?.length===0 && (
                                    <div className="text-gray-500 text-lg text-center py-36">No product in your shopping cart</div>
                                )
                            }
                            {
                                cartProducts?.length>0 && cartProducts.map((cartProduct, index)=>(
                                    <CartProduct
                                        key={index}
                                        index={index}
                                        product={cartProduct}
                                        onRemove={removeCartProduct}
                                    />
                                ))
                            }
                            <div className="py-2  flex justify-between items-center">
                                <div className="text-gray-500">
                                    Subtotal:<br />
                                    Delivery:<br />
                                    Total:
                                </div>
                                <div className="font-semibold pl-2 text-right">
                                    ${subtotal}<br />
                                    $5<br />
                                    ${subtotal + 5}
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <h2 className="font-bold">Checkout</h2>
                            <form onSubmit={proceedToCheckout}>
                                <AddressInput
                                addressProps={address}
                                setAddressProps={handleAddressChange}
                                />
                                <button type="submit" className="submit w-full mt-4">Pay ${subtotal+5}</button>
                            </form>
                        </div>
                    </div>
                </section>
            )
        }
    </>
  )
}

export default CartPage