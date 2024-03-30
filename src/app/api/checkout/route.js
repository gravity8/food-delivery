
import mongoose from "mongoose";
// import { authOptions } from "../auth/[...nextauth]/route"
import {Order} from "@/app/models/Order"
import { MenuItem } from "@/app/models/MenuItem";
import { getServerSession } from "next-auth";

import clientPromise from "@/libs/mongoConnect";
import bcrypt from "bcrypt";
import {User} from "@/app/models/User"
// import {getServerSession} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter"

const authOptions = {
    secret: process.env.SECRET,
    adapter: MongoDBAdapter(clientPromise),
    pages : {
      signOut: "@/app/login",
    },
    session: {
      strategy : "jwt",
    },
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
      CredentialsProvider({
        name: 'Credentials',
        id: 'credentials',
        credentials: {
          email: { label: "Email", type: "email", placeholder: "test@example.com" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials, req) {
          const email = credentials?.email;
          const password = credentials?.password;
          
          const user = await User.findOne({email});
          const passwordOk = user && bcrypt.compareSync(password, user.password);
          try{
              if (passwordOk) {
              return {
                id: user._id.toString(), // Use your user ID field
                email: user.email,
                name: user.name || null // Optional: Include name if available
              };
            }
            else{
              return null;
            }
          }
          catch(err){
            console.error(err)
          }
          
        }
      })
    ],
    cookies: {
      sessionToken: {
        name: 'next-auth.session-token',
        options: {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'Lax',
          path: '/',
          maxAge: 60 * 60 * 24 * 1
        },
      },
    },
  
  };

const stripe = require("stripe")(process.env.STRIPE_SK);

export const POST = async (req) =>{
    mongoose.connect(process.env.MONGO_URL)
    const {cartProducts, address} =  await req.json();
    
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email

    const orderDoc = await Order.create({
      userEmail,
      ...address,
      cartProducts,
      paid: false,
    })

    
    const stripeLineItems = []

    for (const cartProduct of cartProducts) {

      const productInfo = await MenuItem.findById(cartProduct._id);
      let productPrice = productInfo.basePrice;
      if (cartProduct.size) {
        const size = productInfo.sizes.find(size => size._id.toString() === cartProduct.size._id.toString());
        productPrice += size.price;
      }
      if (cartProduct.extras?.length > 0) {
        for (const cartProductExtraThing of cartProduct.extras) {
          const productExtras = productInfo.extraIngredients;
          const extraThingInfo = productExtras
            .find(extra => extra._id.toString() === cartProductExtraThing._id.toString());
          productPrice += extraThingInfo.price;
        }
      }
  
      const productName = cartProduct.name;
  
      stripeLineItems.push({
        quantity: 1,
        price_data: {
          currency: 'USD',
          product_data: {
            name: productName,
          },
          unit_amount: productPrice * 100,
        },
      });
    }

    const stripeSession = await stripe.checkout.sessions.create({
      line_items: stripeLineItems,
      mode: 'payment',
      customer_email: userEmail,
      success_url: process.env.NEXTAUTH_URL + 'orders/' + orderDoc._id.toString() + '?clear-cart=1',
      cancel_url: process.env.NEXTAUTH_URL + 'cart?canceled=1',
      metadata: {orderId:orderDoc._id.toString()},
      payment_intent_data: {
        metadata:{orderId:orderDoc._id.toString()},
      },
      shipping_options: [
        {
          shipping_rate_data: {
            display_name: 'Delivery fee',
            type: 'fixed_amount',
            fixed_amount: {amount: 500, currency: 'USD'},
          },
        }
      ],
    });

    return Response.json(stripeSession.url)
}