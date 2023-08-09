import express, { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { generateSalt, hashPassword, generateToken } from '../utils/utils';
import User from '../models/userModels';

export const createAdmin = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, password, role, gender, DOB, department } = req.body;
        const mainAdmin = await User.findOne({ email })
        console.log(mainAdmin)
        if (mainAdmin) {
            return res.status(400).json({ message: `Email already exists` })
        }

        if (role !== 'admin' && role !== 'employee') {
            return res.status(400).json({
                message: `Invalid role. Role must be either 'employee' or 'admin'`
            })
        }

        const salt = await generateSalt();
        const hashedPassword = await hashPassword(password, salt);

        if (!mainAdmin) {
            let newAdmin = await User.create({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                role,
                gender,
                DOB,
                department
            })

            const check = await User.findOne({ email });

            if (check) {
                return res.status(200).json({
                    message: `Amin successfully created`
                })
            }
        }

        
    } catch (err) {
        return res.status(500).json({ message: `Internal Server Error` })
    }
}

export const loginAdmin = async(req: Request, res: Response) => {
    try {
        const { email , password } = req.body;
        const admin = await User.findOne({ email });
        if(!admin){
            return res.status(400).json({ message: `You do not have an account, please sign up` })
        }
        const validate = await bcrypt.compare(password, admin.password)
        if(!validate){
            return res.status(400).json({ message: `Invalid email or password` })
        }

        const token = await generateToken(admin._id)
        res.cookie('token', token);
        return res.status(200).json({
            message: `Login successful`,
            role: admin.role, 
            email: admin.email
        });
    } catch (err) {
        return res.status(500).json({ message: `Internal Server Error`})
    }
}

export const fetchAllAdmin = async(req: Request, res: Response) => {
    try {
        const all = await User.find({})
        if(all.length === 0){
            return res.status(400).json({ message: `No users found in the database`})
        }
        return res.status(200).json({
            message: `Users successfully Retrieved`, 
            allData: all,
        });
    } catch (err) {
        return res.status(500).json({ message: `Internal Server Error`})
    }
}