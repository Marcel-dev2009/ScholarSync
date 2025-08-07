
import { connectDB } from "../../../lib/mongodb";
import User from "../../../models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
export async function POST(req ){
    try {
      const {name , email , password} = await req.json();
      const hashedPassword = await bcrypt.hash(password ,  10);
      await connectDB();
      await User.create({
       name,
       email,
       password : hashedPassword   
      })  
      return NextResponse.json({message : 'User Registered!'} , {status : 201})  
    } catch (error) {
return NextResponse.json({message : `User registration failed ` , error} , {status : 500})
          
    }      
}