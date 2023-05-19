import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
export const createHash = async(body)=>{
    return await bcrypt.hash(body.password, 10)
}
export const passwordsCompare = async(password, user)=>{
    return await bcrypt.compare(password, user.password)
}
export const generateToken = async(user)=>{
    return jwt.sign({user: {...user, password: undefined}}, process.env.PRIVATE_KEY, {expiresIn: "2m"})
}