//Register

import { DEFAULT_ERROR_MESSAGE } from "../../constants/index.js";

import { Request, Response } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { User } from "../../models/User.js";
import { IUser } from "../../models/user.types.js";

export const registerUser = async (req: Request, res: Response) => {
    const {
        username, email, password
    }: IUser = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password,12);
        const newUser = new User({
            username,
            email,
            password:hashedPassword
        });
        await newUser.save()
        res.status(201).json({
            success:true,
            message:"User registered successfully!!"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: DEFAULT_ERROR_MESSAGE
        })
    }

}
const login = (req: Request, res: Response) => {
    const { email, password }: IUser = req.body;
    try {
        console.log(email, password)
    } catch (error) {
        res.status(500).json({
            success: false,
            message: DEFAULT_ERROR_MESSAGE
        })
    }

}













//Login
//Logout
//Auth Middleware