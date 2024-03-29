
"use client"
import { CartContext } from '@/components/AppContext'
import AddressInput from '@/components/layout/AddressInput'
import CartProduct from '@/components/layout/CartProduct'
import Sectionheaders from '@/components/layout/Sectionheaders'
import { useParams } from 'next/navigation'
import React, { useContext,useState, useEffect } from 'react'

const OrderPage = () => {
    const {clearCart, cartProductPrice} = useContext(CartContext);
    const [order, setOrder] = useState();
    const [loadingOrder, setLoadingOrder] = useState(true);
    const {id} = useParams();
    useEffect(()=>{
        if(typeof window.console !== "undefined"){
            if(window.location.href.includes("clear-cart=1")){
                clearCart()
            }
        }
        if (id) {
            setLoadingOrder(true);
            fetch('/api/orders?_id='+id).then(res => {
              res.json().then(orderData => {
                setOrder(orderData);
                setLoadingOrder(false);
              });
            })
        }
    },[])

    let subtotal = 0;
    if (order?.cartProducts) {
        for (const product of order?.cartProducts) {
        subtotal += cartProductPrice(product);
        }
    }
  return (
    <section className='max-w-3xl mx-auto  mt-8'>
        <div className='text-center'>
            <Sectionheaders mainHeader={"Your order"}/>
            <div className='my-4'>
                <p>Thanks for your order</p>
                <p>We will call you when your order will be on the way</p>
            </div>
        </div>
        {loadingOrder && (
        <div>Loading order...</div>
      )}
      {order && (
        <div className="grid md:grid-cols-2 md:gap-16 mt-10">
          <div>
            {order.cartProducts.map(product => (
              <CartProduct key={product._id} product={product} />
            ))}
            <div className="text-right py-2 text-gray-500">
              Subtotal:
              <span className="text-black font-bold inline-block w-8">${subtotal}</span>
              <br />
              Delivery:
              <span className="text-black font-bold inline-block w-8">$5</span>
              <br />
              Total:
              <span className="text-black font-bold inline-block w-8">
                ${subtotal + 5}
              </span>
            </div>
          </div>
          <div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <AddressInput
                disabled={true}
                addressProps={order}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default OrderPage