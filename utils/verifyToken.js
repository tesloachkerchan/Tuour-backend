

import jwt from 'jsonwebtoken';
const verfiyToken = async(req,res,next)=>{
    const token = req.cookies.accessToken
    if(!token){
        return res.status(401)
        .json({
            success: false,
            message: 'you are not authorized'
        })
    }
    //if token exist 
    jwt.verify(token,process.env.JWT_SECRET_KEY,(err,user)=>{
        if(err){
            return res.status(401)
            .json({
                success: false,
                message: 'token is invalid'
            })
        }
        req.user = user
        next()
    })
}
export const verifyUser = async(req,res,next)=>{
    verfiyToken(req,res,next,()=>{
        if(req.user.id=== req.params.id || res.user.role==='admin'){
            next()
        }else{
            return res.status(401)
            .json({
                success: false,
                message: 'you are not authenticated'
            })
        }
    })
}
export const verifyAdmin = async(req,res,next)=>{
    verfiyToken(req,res,next,()=>{
        if( res.user.role==='admin'){
            next()
        }else{
            return res.status(401)
            .json({
                success: false,
                message: 'you are not authorized'
            })
        }
    })
}
