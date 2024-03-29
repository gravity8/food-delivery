import clientPromise from "@/libs/mongoConnect";
import bcrypt from "bcrypt";
import {User} from "@/app/models/User"
import NextAuth, {getServerSession} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter"

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);

export const authOptions = {
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

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }