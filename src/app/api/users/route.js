
import mongoose from 'mongoose'
import {User} from "@/app/models/User"
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

export const GET = async() =>{
    if(await isAdmin()){
        mongoose.connect(process.env.MONGO_URL)
        const users = await User.find();
        return Response.json(users)
    }
    else{
        return Response.json({})
    }
}
