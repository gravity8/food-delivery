
import mongoose from 'mongoose'
import {User} from "@/app/models/User"

mongoose.connect(process.env.MONGO_URL)
export const GET = async() =>{

    const users = await User.find();
    return Response.json(users)
}

export const POST = async() =>{

}