
import mongoose from 'mongoose'
import {User} from "@/app/models/User"
import { isAdmin } from '../auth/[...nextauth]/route';

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
