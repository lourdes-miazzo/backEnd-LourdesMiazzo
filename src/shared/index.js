import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const createHash = async(body) =>
{
    return await bcrypt.hash(body, 10);
};
export const passwordsCompare = async(password, user) =>
{
    return await bcrypt.compare(password, user.password);
};
export const generateToken = async(user) =>
{
    return jwt.sign({ user: { ...user, password: undefined } }, process.env.PRIVATE_KEY, { expiresIn: '8m' });
};
export const generateTokenNewPassword = async(userEmail) =>
{
    return jwt.sign({ user: userEmail }, process.env.PRIVATE_KEY_2, { expiresIn: '1h' });
};

export const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_KEY
    },
    tls: {
        rejectUnauthorized: false
    }
});
