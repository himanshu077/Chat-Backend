const mongoose = require("mongoose");

const Messages = require("../models/messages");
const Room = require("../models/room");
const chatuser = require("../models/user");

const Users = require("../models/users");

const bcrypt = require("bcrypt");
const cookieparsal= require('cookie-parser')
const jwt = require('jsonwebtoken'); 


const connectDb = require("../db/connect");
const userlogin = async (req, res) => {
  user= await Users.findOne({email:req.body.email})
  if(!user){
    return res.status(404).send({
        message:"user Not found"
    })
  }
  if(!(await bcrypt.compare(req.body.password,user.password))){
    return res.status(400).send({
        message:"Password is incorrect"
    })
  }
const token=jwt.sign({_id:user._id},"secret")
res.cookie("jwt",token,{
httpOnly:true,
maxAge:24*60*60*1000
})
res.send({
    message:"sucess"
})
};


const userRegister = async (req, res) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await Users.findOne({
    $or: [{ email }, { username }],
  });
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "Username or email already exists" });
  } else {
    const newUserregister = new Users({
        username:username,
        email:email,
      password: hashedPassword,
    });

    const result = await newUserregister.save();   
    const {_id}=await result.toJSON();
    const token = jwt.sign({_id: _id}, "secret");
    res.cookie("jwt", token,{
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    })
    res.send({
        message:"success"
    })
  }
};

const Alluser = async (req, res) => {
    try {
        const cookie = req.cookies['jwt'];
        if (!cookie) {
            return res.status(401).send({
                message: 'JWT token not provided'
            });
        }
        
        const claims = jwt.verify(cookie, "secret");
        if (!claims) {
            return res.status(401).send({
                message: 'JWT token invalid'
            });
        }
        
        const user = await Users.findOne({ _id: claims._id });
        if (!user) {
            return res.status(401).send({
                message: 'User not found'
            });
        }
        
        const { password, ...data } = user.toJSON();
        res.send(data);
    } catch (err) {
        console.error('Error verifying JWT token:', err);
        return res.status(401).send({
            message: 'JWT token verification failed'
        });
    }
};


const logout = async (req, res) => {
    try {
        // Clear JWT token from cookies
        res.clearCookie('jwt');
        res.send({
            message: "JWT token deleted successfully"
        });
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).send({
            message: 'Internal server error'
        });
    }
}



module.exports = { userlogin, userRegister, Alluser ,logout};
