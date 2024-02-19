import { Timestamp } from "mongodb"
import {model, models,Schema}  from "mongoose"

const UserSchema = new Schema({
    email : {type: String, required: true, unique: true},
    password: {
        type: String, 
        required: true, 
        validate: (pass)=>{
            if(!pass?.length || pass.length < 5){
                new Error("Password must be atleast 5 characters long")
            }       
        }
    },
}, {Timestamp:true})

export const User = models?.User || model("user", UserSchema)