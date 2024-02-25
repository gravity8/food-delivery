import mongoose from "mongoose";
import {MenuItem} from "../../models/MenuItem";

mongoose.connect(process.env.MONGO_URL)
export const POST = async (req) =>{
    const data = await req.json();
    const menuItemDoc = await MenuItem.create(data)
    return Response.json(menuItemDoc);
}

export const GET = async () =>{
    
    return Response.json(
        await MenuItem.find()
    )
}

export async function PUT(req) {
    // if (await isAdmin()) {
        // console.log( req.json)
      const {_id, ...data} = await req.json();
      await MenuItem.findByIdAndUpdate(_id, data);
    // }
    return Response.json(true);
}

export async function DELETE(req) {
    mongoose.connect(process.env.MONGO_URL);
    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');
    // if (await isAdmin()) {
      await MenuItem.deleteOne({_id});
    // }
    return Response.json(true);
  }