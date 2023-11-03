
import Review from "../models/Review.js";
import Tour from "../models/Tour.js";
export const createReview = async(req,res)=>{
    const tourId = req.params.tourId
    const newReview = new Review({...req.body})
    try {
        const savedReview = await newReview.save()
        //after saving than update
        await Tour.findByIdAndUpdate(tourId,{
            $push: {reviews:savedReview._id}
        })
        res.status(200).json({
            success:true,
            message: 'reviews submitted',
        data: savedReview})
    } catch (err) {
        res.status(500).json({
            success:false,
            message: 'failed to submit',
        })
    }
}