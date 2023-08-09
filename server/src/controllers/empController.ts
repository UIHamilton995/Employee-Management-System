import express, { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { generateSalt, hashPassword, generateToken } from '../utils/utils';
import User from '../models/userModels';

export const createUser = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, password, role, gender, DOB, department } = req.body;
        const mainUser = await User.findOne({ email })
        if (mainUser) {
            return res.status(400).json({ message: `Email already exists` })
        }
        if (role !== 'admin' && role !== 'employee') {
            return res.status(400).json({
                message: `Invalid role. Role must be either 'employee' or 'admin'`
            })
        }

        const salt = await generateSalt();
        const hashedPassword = await hashPassword(password, salt);

        if (!mainUser) {
            let newUser = await User.create({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                role,
                gender,
                DOB,
                department
            })
        }

        const check = await User.findOne({ email });
        if (check) {
            return res.status(200).json({
                message: `User successfully created`
            })
        }

        return res.status(400).json({
            message: `Couldn't create the user`
        })
    } catch (err) {
        return res.status(500).json({ message: `Internal Server Error` })
    }
}

export const loginUser = async(req: Request, res: Response) => {
    try {
        const { email , password } = req.body;
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({ message: `You do not have an account, please sign up` })
        }
        const validate = await bcrypt.compare(password, user.password)
        if(!validate){
            return res.status(400).json({ message: `Invalid email or password` })
        }

        const token = generateToken(user._id)
        res.cookie('token', token);
        return res.status(200).json({
            message: `Login successful`,
            role: user.role, 
            email: user.email
        });
    } catch (err) {
        return res.status(500).json({ message: `Internal Server Error`})
    }
}

export const updateUser = async (req: JwtPayload, res: Response) => {
    try {
        const id = req.params.id; 
        const user = await User.findOne({ _id: id})
        if(!user){
            return res.status(400).json({ Error: 'User not found' })
        }

        if (user.role !== 'admin') {
            return res.status(403).json({ Error: 'Only admin users can update users' });
        }

        if(user){
            const { firstName, lastName, department } = req.body;
            const updatedUser = await User.findOneAndUpdate({ _id:id}, { firstName, lastName, department })
            if(updatedUser){
                return res.status(200).json({
                    message: `User updated successfully`,
                    updatedUser
                })
            }
            return res.status(404).json({ message: `User not found` })
        }
    } catch (err) {
        return res.status(500).json({ message: `Internal Server Error` })
    }
}

export const deleteUser = async(req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const user = await User.findOne({ _id:id })

        if(!user){
            return res.status(404).json({ message: `User not found` })
        }

        if (user.role !== 'admin') {
            return res.status(403).json({ Error: 'Only admin users can update users' });
        }

        const deletedUser = await User.findOneAndDelete({ _id: user._id });

        if(deletedUser){
            return res.status(200).json({ message: `User deleted successfully` })
        };

        return res.status(401).json({ message: `Failed to delete user`})
    } catch (err) {
        return res.status(500).json({ message: `Internal Server Error`})
    }
}

export const fetchAllUsers = async(req: Request, res: Response) => {
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