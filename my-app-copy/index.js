import express from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

import { registerValidation } from "./validations/auth.js"

import UserModel from "./models/User.js"

mongoose.connect("mongodb+srv://sultan:12345678qwe@cluster0.ztpege8.mongodb.net/?retryWrites=true&w=majority")
    .then(() => console.log("DB ok"))
    .catch(error => console.log("DB error", error))

const app = express();

app.use(express.json());

app.post('/auth/register', registerValidation, async (req, res) => {
    const errors = validationResult(res)

    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array())
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt)

    const doc = new UserModel({
        email: req.body.email,
        fullName: req.body.fullName,
        avatarUrl: req.body.avatarUrl,
        passwordHash,
    })
    
    const user = await doc.save()

    res.json(user)
});

app.listen(4442, (err) => {
    if (err) return console.log(err);

    console.log("Server OK");
});