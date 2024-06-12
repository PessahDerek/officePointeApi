import express from "express";
import bcrypt from "bcrypt"
import jwt, {JwtPayload} from "jsonwebtoken";

export const respond = (res: express.Response, message: string, status: number = 200, body?: object ) => {
    res.statusCode = status;
    res.setHeader('message', message)
    res.send({
        message: message,
        extra: body
    });
    res.end()
}

/**
 *
 * @param text Text to be encrypted
 * @returns {string} An encrypted string
 */
export const encryptString = (text: string): string => {
    return bcrypt.hashSync(text, 10)
}

export const compareEncrypted = (plain: string, hashed: string) => {
    return bcrypt.compareSync(plain, hashed)
}

export const generateToken = (userId: string, role: string): string => {
    const payload: JwtPayload = {userId: userId.split('').reverse().join(""), role: role};
    return jwt.sign(payload, process.env.SERVER_KEY, {expiresIn: '12h'})
}