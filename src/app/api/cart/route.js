import mongoose from "mongoose"
import {CartContent} from "@/app/models/CartContent"
import {getServerSession} from "next-auth"
// import { authOptions } from "../auth/[...nextauth]/route"
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

export const POST =async (req)=>{
    mongoose.connect(process.env.MONGO_URL)
    const session = await getServerSession(authOptions);
    const email = session.user?.email
    const body = await req.json();

    const cleanedbody = [];

    // Iterate over each item in the original body array
    for (const item of body) {
        // Remove the _id field from the item
        delete item._id;

        // Add the cleaned item to the array
        cleanedbody.push(item);
    }
    const existingUser = await CartContent.findOne({ email });
    if(!existingUser){
        const cartProducts = await CartContent.create({email:email,allCartItems:cleanedbody});
        return Response.json(cartProducts);
    }
    else{
        const cartProducts = await CartContent.findOneAndReplace({email},{email:email, allCartItems: cleanedbody})
        return Response.json(cartProducts)
    }

}

export const PUT = async (req) =>{
    mongoose.connect(process.env.MONGO_URL)
    const body = await req.json();
    const session = await getServerSession(authOptions);
    const email = session?.user?.email

    const cleanedData = [];

    // Iterate over each item in the original body array
    for (const item of body) {
        // Remove the _id field from the item
        delete item._id;

        // Add the cleaned item to the array
        cleanedData.push(item);
    }
    await CartContent.findOneAndUpdate({email}, {email:email, allCartItems: cleanedData})
    return Response.json(true)
}
export const GET = async () =>{
    mongoose.connect(process.env.MONGO_URL)
    const session = await getServerSession(authOptions);
    const email = session?.user?.email
    return Response.json(
        await CartContent.findOne({email: email})
        
    )    
}