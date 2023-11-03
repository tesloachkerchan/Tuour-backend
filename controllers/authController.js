import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import  Jwt  from "jsonwebtoken";

//for user registration
export const register = async(req,res)=>{
    try {
        // hashing the password
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password,salt)
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            photo: req.body.photo
        })
        await newUser.save()
        res.status(200)
        .json({
            success: true,
            message: 'Successfully created!'
        })
    } catch (err) {
        res.status(500)
        .json({
            success: false,
            message: 'Fail to create!'
        })
    }
} 


//for user login
export const login = async(req,res)=>{

    const email = req.body.email;
    try {
        const user = await User.findOne({email})
        // if user doesn't exist
        if(!user){
            return res.status(404)
            .json({
                success: false,
                message:'user not found'
            })
        }
        // if user exist then check for password
        const checkCorrectPassword = await bcrypt.compare(req.body.password,
            user.password)

        // if checked password is not correct
        if(!checkCorrectPassword){
            return res.status(401)
            .json({
                success:false,
                message:'Incorrect email or Password'
            })
        }
        const {password,role,...rest} = user._doc;
        //create jwt token
        const token = Jwt.sign(
            {id:user._id,role: user.role},
            process.env.JWT_SECRET_KEY,
            {expiresIn:'15d'}
        );
    //set token in browser cookies and send the response to client
    res.cookie('accessToken',token,{
        httpOnly: true,
        expires: token.expiresIn
    })
    .status(200)
    .json({
        success: true,
        message: 'Successfully Login',
        token,
        data: { ...rest },
        role
    })
    } catch (err) {
        res.status(500)
        .json({
            success: false,
            message: 'Fail to Login!'
        })
    }
}
