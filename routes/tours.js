

import express from 'express';
import { CreateTour,updateTour,deleteTour,getSingleTour,getAllTour,
getTourBySearch,getFeaturedTour, getTourCount} from '../controllers/tourControllers.js';
import { verifyAdmin } from '../utils/verifyToken.js';
const router = express.Router();

// create new tour
router.post("/",verifyAdmin ,CreateTour)

// update new tour
router.put("/:id",verifyAdmin, updateTour)

// delete new tour
router.delete("/:id",verifyAdmin , deleteTour)

// getSingle new tour
router.get("/:id",getSingleTour)

// getALL new tour
router.get("/",getAllTour)
// get all tour by search
router.get("/search/getTourBySearch",getTourBySearch)
router.get("/search/getFeaturedTours",getFeaturedTour)
router.get("/search/getTourCounts",getTourCount)

export default router;