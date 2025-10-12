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
        const user = await User.findOne({ email: email });
        if (user) {
            return res.status(409).json({
                success: false,
                message: "User already exists with same email. Please try different email"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        await newUser.save()
        res.status(201).json({
            success: true,
            message: "User registered successfully!!"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: DEFAULT_ERROR_MESSAGE
        })
    }

}
export const loginUser = async (req: Request, res: Response) => {
    const { email, password: userPass }: IUser = req.body;
    try {
        const user = await User.findOne({ email })

        console.log(email)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User doesn't exist. Please register first"
            })

        }
        const isPasswordMatched = await bcrypt.compare(userPass, user?.password);
        if (!isPasswordMatched) {
            return res.status(401).json({
                success: false,
                message: "Incorrect Password Please try again"
            })
        }
        const token = jwt.sign({
            id: user._id,
            role: user.role,
            email: user.email
        }, "CLIENT_SECRET_KEY", {
            expiresIn: "60mins"
        })
        return res.cookie('token', token, { httpOnly: true, secure: false }).status(200).json({
            success: true,
            message: "Logged in successfully",
            user: {
                email: user.email,
                role: user.role,
                id: user._id
            }
        })



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