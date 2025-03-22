import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";      
import validator from "validator"
// Login User //
const loginUser = async (req,res) => {
    const {email,password} = req.body;    
    try{
        const user = await userModel.findOne({email});
        if(!user) {
            return res.json({success:false, message: "User not found"})     
        }
        
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) {
            return res.json({success:false, message: "Invalid password"})
        }    
        const token = createToken(user._id);
        res.json({success:true, token})
    } catch(error){
        console.log(error);
        res.json({success:false, message: "Error occurred"})
    }
}
const createToken = (id) => {
    try {
      console.log(process.env.JWT_SECRET);
      return jwt.sign({ id }, process.env.JWT_SECRET);
    } catch (err) {
      console.log(err); 
    }
  };
//Registor user //
const registerUser = async (req,res) => {
    const {name,email,password} = req.body; 
    try{
        // Check if user already exist //
        const exists = await userModel.findOne({email});
        if(exists){
             return res.json({success:false,  message:"User already exist"})     
        }
            // Check if password and confirmPassword is match //
        if(!validator.isEmail(email)) {
            return res.json({success:false,  message:"Pls Entre valid email"})    
        }
        if(password.length<8) {    
            return res.json({success:false,  message:"pls entre a valid strong password"})
        }        
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new userModel({
            name:name,
            email:email, 
            password:hashedPassword 
        })
        const user = await newUser.save()         
        const token = createToken(user._id) 
        res.json({success:true, token})     
        } catch(err){     
            console.log(err)
            res.json({success:false, message:"Error"})    
            }
}
export {loginUser,registerUser}