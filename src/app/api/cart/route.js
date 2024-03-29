import mongoose from "mongoose"
import {CartContent} from "@/app/models/CartContent"
import {getServerSession} from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { User } from "@/app/models/User"


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
    const email = session.user?.email

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
    const email = session.user?.email
    return Response.json(
        await CartContent.findOne({email: email})
        
    )    
}