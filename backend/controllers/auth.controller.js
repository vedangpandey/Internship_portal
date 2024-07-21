import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import generateTokenAndSetCookie from "../utils/generatToken.js";
export const signin=async (req,res)=>{
    try {
        const {username ,email, password ,confirmPassword}=req.body;
        console.log(`${username} ${email} ${password} ${confirmPassword}`);
        if(password!==confirmPassword)
            res.status(400).json({error:"Password don't match"})
        const user=await User.findOne({username});
        if(user){
            return res.status(400).json({error:"username already exists"});
        }
        const salt=await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        
        
        const newUser=new User({
            username,
            email,
            password:hashedPassword,
        })

        if(newUser){
            generateTokenAndSetCookie(newUser._id,res);
            console.log(`${hashedPassword}`);
            await newUser.save();
            res.status(201).json({
                _id:newUser._id,
                username: newUser.username,
                email: newUser.email,
            })
        }
        else {
            res.status(400).json({error: "Invalid User Data"});
        }
    } catch (error) {
        console.log("Error in signup controller",error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}
export const login = async (req,res)=>{
    try{
        const {userName,password}=req.body;
        const user=await User.findOne({userName});
        const isPasswordCorrect=await bcrypt.compare(password,user?.password || "");
        if(!user|| !isPasswordCorrect){
            return res.status(400).json({error:"Invalid username or password"});
        }
        generateTokenAndSetCookie(user._id,res);
        res.status(200).json({
            _id:user._id,
            username: user.username,
            email: user.email,
        });
    }catch(error){
        console.log("Error in login Controller ",error.message);
        return res.status(500).json({error:"Internal Server Error"});
    }
}
export const logout = (req,res)=>{
    try{
        res.cookie("jwt","",{maxAge: 0});
        res.status(200).json({message: "Logged out Succesfully"});
    }catch(error){
        console.log("Error in loging out ",error.message);
        res.status(500).json({error:"Internal Server Error "});
    }
}
