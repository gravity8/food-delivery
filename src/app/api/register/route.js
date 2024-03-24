
import mongoose from "mongoose";
import { User } from "../../models/User";
import bcrypt from 'bcrypt';


// mongoose.connect(process.env.MONGO_URL);

export const POST = async (req) => {
    try {
        const body = await req.json();
        const pass = body.password;

        if (!pass?.length || pass.length < 5) {
            throw new Error("Password must be at least 5 characters long");
        }

        const notHashedPassword = pass;
        const salt = bcrypt.genSaltSync(10);
        body.password = bcrypt.hashSync(notHashedPassword, salt);

        const createdUser = await User.create(body);
        return Response.json(createdUser);
    } catch (error) {
        // Handle errors appropriately, e.g., return a custom error response
        console.error(error);
        return Response.json({ error: error.message }, { status: 400 }); // Example error response
    }
};
