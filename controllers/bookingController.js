
import Booking from '../models/Booking.js';

// create new book
export const createBooking = async(req,res)=>{
    const newBooking = new Booking(req.body)
    try {
        const savedBooking = await newBooking.save()
        res.status(200).json({
            success:true,
            message:'your tour has booked',
            data: savedBooking
        })
    } catch (err) {
        res.status(500).json({
            success:false,
            message:'internal server error'
        })
    }
}


// getting single book
export const getBooking = async(req,res)=>{
    const id = req.params.id;
    try {
        const book = await Booking.findById(id)
        res.status(200).json({
            success:true,
            message:'successful',
            data: book
        })
    } catch (err) {
        res.status(402).json({
            success:true,
            message:'not found'
        })
    }
}

// gt all book
export const getAllBooking = async(req,res)=>{
    
    try {
        const books = await Booking.find()
        res.status(200).json({
            success:true,
            message:'successful',
            data: books
        })
    } catch (err) {
        res.status(402).json({
            success:true,
            message:'not found'
        })
    }
}