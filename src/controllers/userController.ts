import { NextFunction, Request, Response } from "express";
import userModels from "../models/userModels";
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import user from "../routes/user";
const createToken = (_id: string) => {
    return jwt.sign({ _id }, process.env.SECRET as string, { expiresIn: '3d' })
}

const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body
    try {
        
        const user = await userModels.login(email, password)
        const token = createToken(user._id)
        // set token in cookie for 5 days
        res.cookie('jwt', token, { httpOnly: true, maxAge: 5 * 24 * 60 * 60 * 1000 })
        res.status(200).json({ email, token })
    } catch (err: any) {
        res.status(400).json({ error: err.message })
    }
}

const signupUser = async (req: Request, res: Response, next: NextFunction) => {
    const { fullname, email, password } = req.body
    try {
        const user = await userModels.signup(fullname, email, password)

        const token = createToken(user._id)

        res.status(200).json({ email, token })
    } catch (err: any) {
        res.status(400).json({ error: err.message })
    }
}

export {
    loginUser,
    signupUser
}