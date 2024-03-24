
import {Order} from "@/models/Order";

const stripe = require('stripe')(process.env.STRIPE_SK);

export const POST = async (req)=>{
  const sig = req.headers.get('stripe-signature');
  let event;

  try {
    const reqBuffer = await req.text();
    const signSecret = process.env.STRIPE_SIGN_SECRET;
    event = stripe.webhooks.constructEvent(reqBuffer, sig, signSecret);
  } catch (e) {
    console.error('stripe error');
    console.log(e);
    return Response.json(e, {status: 400});
  }
  console.log("got here")
  console.log(event.type)
  // if (event.type === 'checkout.session.completed') {
  //   console.log(event);
  //   const orderId = event?.data?.object?.metadata?.orderId;
  //   const isPaid = event?.data?.object?.payment_status === 'paid';
  //   console.log(isPaid)
  //   if (isPaid) {
  //     console.log(isPaid)
  //     await Order.updateOne({_id:orderId}, {paid:true});
  //   }
  // }

  return Response.json('ok', {status: 200});
}