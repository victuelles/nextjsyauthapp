import { connectMongoDB } from "@/lib/ mongodb"
import User from "@/models/user"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"

export async function POST(req){
    try {
        const {name,email,password} = await req.json()
        // console.log("name ",name)
        // console.log("email ",email)
        // console.log("password ",password)
        const hashedPassword = await bcrypt.hash(password,10)
        await connectMongoDB()
        await User.create({name,email,password:hashedPassword})
        return NextResponse.json({message:"User registered"},{status:201})

    } catch (error) {
        return NextResponse.json({message:"An error occured while registering the user."},{status:500})
        
    }
}