import mongoose from "mongoose";
import {MenuItem} from "../../models/MenuItem";
import { UserInfo } from "@/app/models/UserInfo";

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