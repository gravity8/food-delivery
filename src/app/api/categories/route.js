import mongoose from "mongoose"
import { Category } from "../../models/Category";
import { isAdmin } from "../auth/[...nextauth]/route";


export const POST = async (req) =>{
    if(await isAdmin()){
        mongoose.connect(process.env.MONGO_URL);
        const {name} = await req.json();
        const categoryDoc = await Category.create({name});
        return Response.json(categoryDoc);
    }   
    else{
        return Response.json({})
    }
}

export const GET = async ()=>{
        mongoose.connect(process.env.MONGO_URL);
        return Response.json(
            await Category.find()
        )
    
}

export const PUT = async (req)=>{
    if(await isAdmin()){
        mongoose.connect(process.env.MONGO_URL)
        const {_id, name} = await req.json()
        await Category.updateOne({_id}, {name})
    }
    return Response.json(true)
}

export async function DELETE(req) {
    mongoose.connect(process.env.MONGO_URL);
    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');
    if(await isAdmin()){
        await Category.deleteOne({_id});
    }
    return Response.json(true);
}