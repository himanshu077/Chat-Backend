const express = require('express');
const app = express();
const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');

// Models 
const Messages = require("../models/messages");
const Room = require("../models/room");
const Users = require("../models/users");

// Add express.json() middleware to parse incoming JSON requests
app.use(express.json());

exports.login = async (req, res) => {
    user = await Users.findOne({ email: req.body.email })
    if (!user) {
        return res.status(404).send({
            message: "user Not found"
        })
    }
    if (!(await bcrypt.compare(req.body.password, user.password))) {
        return res.status(400).send({
            message: "Password is incorrect"
        })
    }
    const token = jwt.sign({ _id: user._id }, "secret")
    res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    })
    res.send({
        message: "success",
        token
    })
};


exports.register = async (req, res) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

    console.log('Request --> ', req.body);
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await Users.findOne({email})
    if (existingUser) {
        return res
            .status(400)
            .json({ message: "Username or email already exists" });
    } else {
        const newUserRecords = new Users({
            username: username,
            email: email,
            password: hashedPassword,
        });

        const result = await newUserRecords.save();
        const { _id } = await result.toJSON();
        const token = jwt.sign({ _id: _id }, "secret");
        result.token = token
        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        })
        res.send({
            message: "success",
            result,
            token
        })
    }
};

exports.logout = async (req, res) => {
    try {
        // Clear JWT token from cookies
        res.clearCookie('jwt');
        res.send({
            message: "JWT token deleted successfully",
            clearLocalStorage: true 
        });
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).send({
            message: 'Internal server error'
        });
    }
}

