import mongoose from "mongoose"
import { Category } from "../../models/Category";

mongoose.connect(process.env.MONGO_URL);
export const POST = async (req) =>{
    const {name} = await req.json();
    const categoryDoc = await Category.create({name});

    return Response.json(categoryDoc);
}

export const GET = async ()=>{
    return Response.json(
        await Category.find()
    )
}

export const PUT = async (req)=>{
    const {_id, name} = await req.json()
    await Category.updateOne({_id}, {name})
    return Response.json(true)
}

export async function DELETE(req) {
    mongoose.connect(process.env.MONGO_URL);
    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');
    // if (await isAdmin()) {
      await Category.deleteOne({_id});
    // }
    return Response.json(true);
  }