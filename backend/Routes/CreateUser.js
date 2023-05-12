const express = require("express");
const router = express.Router();
const User = require("../models/User");
const{ body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/createuser",[
body('email', "Invalid Email").isEmail(),
body('password',"Password must be atleast 6 characters long!").isLength({min:6})
], async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password,salt);

    try {

        const {name, email, password, location} =req.body;

        let user = await User.findOne({ email });
        if (user) {
          return res
            .status(400)
            .json({ success: false, message: "User already exists" });
        }

        await User.create({
            name,
            email,
            password: secPass,
            location
        })
        
        const data = {
            user:{
                id: this._id
            }
        }

        const authToken = jwt.sign(data, process.env.JWT_SECRET);

        res.status(200).json({
            success: true,
            message:"User Created!",
            authToken
        });
    } catch (error) {
        res.status(500).json({
        success: false,
        message: error.message,
      });
    }
});

router.post("/login",[
    body('email', "Invalid Email").isEmail(),
    body('password',"Password must be atleast 6 characters long!").isLength({min:6})
    ],async(req,res)=>{

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

    try {

        const { email, password } = req.body;
        
        const user= await User.findOne({email});

        if(!user){
            return res.status(400).json({
                 success: false,
                 message: "User doesn't exists"
            });
         };
        
        const passCompare = await bcrypt.compare(password,user.password);

        if(!passCompare){
            return res.status(400).json({
                success: false,
                message: "Incorrect credentials"
            });
        }

        const data = {
            user:{
                id: this._id
            }
        }

        const authToken = jwt.sign(data, process.env.JWT_SECRET);

        res.status(200).json({
            success: true,
            message:"Logged in successfully!",
            authToken
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
          });
    }
})

module.exports = router;