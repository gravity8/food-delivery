import mongoose from "mongoose";
import {MenuItem} from "../../models/MenuItem";
import { UserInfo } from "@/app/models/UserInfo";

import clientPromise from "@/libs/mongoConnect";
import bcrypt from "bcrypt";
import {User} from "@/app/models/User"
import {getServerSession} from "next-auth";
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
  
async function isAdmin() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  if (!userEmail) {
    return false;
  }
  const userInfo = await UserInfo.findOne({email:userEmail});
  if (!userInfo) {
    return false;
  }
  return userInfo.admin;
}

export const POST = async (req) =>{
    mongoose.connect(process.env.MONGO_URL)
    const data = await req.json();
    if(await isAdmin()){
      const menuItemDoc = await MenuItem.create(data)
      return Response.json(menuItemDoc);
    }else{
      return Response.json({})
    }
    
}

export const GET = async () =>{
    mongoose.connect(process.env.MONGO_URL)
    return Response.json(
        await MenuItem.find()
    )
}

export async function PUT(req) {
    if (await isAdmin()) {
        
      mongoose.connect(process.env.MONGO_URL)
      const {_id, ...data} = await req.json();
      await MenuItem.findByIdAndUpdate(_id, data);
    }
    return Response.json(true);
}

export async function DELETE(req) {
    mongoose.connect(process.env.MONGO_URL);
    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');
    if (await isAdmin()) {
      await MenuItem.deleteOne({_id});
    }
    return Response.json(true);
  }