import mongoose from "mongoose"
import {getServerSession} from "next-auth"
// import { authOptions } from "../auth/[...nextauth]/route"
// import { User} from "@/app/models/User"
import {UserInfo} from "@/app/models/UserInfo"

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


export const PUT = async (req) => {
    mongoose.connect(process.env.MONGO_URL)
    console.log(req)
    const data = await req.json();
    const {_id,name, image, ...otherUserInfo}= data;

    let filter = {};
    if (_id) {
        filter = {_id};
    } else {
        const session = await getServerSession(authOptions);
        const email = session.user.email;
        filter = {email};
    }

    const user = await User.findOne(filter);
    // console.log(user)
    await User.updateOne(filter, {name, image});
    await UserInfo.findOneAndUpdate({email:user.email}, otherUserInfo, {upsert:true});
   
    return Response.json(true)
}

export const GET =async (req) =>{
    mongoose.connect(process.env.MONGO_URL)
    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');

    let filterUser = {};
    if (_id) {
        filterUser = {_id};
    } else {
        const session = await getServerSession(authOptions);
        const email = session?.user?.email;
        if (!email) {
        return Response.json({});
        }
        filterUser = {email};
    }

    const user = await User.findOne(filterUser).lean();
    const userInfo = await UserInfo.findOne({email:user.email}).lean();

    return Response.json({...user, ...userInfo});

}