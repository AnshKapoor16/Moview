import ReviewsDAO from "../dao/reviewsDAO.js"

export default class ReviewsController {
    // Using static so, we don't have to instantiate it and can use like a class property
    static async apiPostReview(req, res, next) {
        try {
            const movieId = req.body.movieId;
            const review = req.body.review;
            const user = req.body.user;
            //Response
            const reviewResponse = await ReviewsDAO.addReview(movieId,  user, review);
            res.json({status : "success"});
        } catch(e) {
            res.status(500).json({error : e.message});
        }
    }
    
    static async apiGetReview(req, res, next) {
        try {
            //id is a parameter
            const id = req.params.id || {};
            const review = await ReviewsDAO.getReview(id);
            if(!review) {
                res.status(404).json({error : "Review Not Found"});
            }
            res.json(review);
        } catch(e) {
            console.log(`api, ${e}`);
            res.status(500).json({error : e});
        }
    }
    
    static async apiUpdateReview(req, res, next) {
        try {
            //id is a parameter
            const reviewId = req.params.id || {};
            const review = req.body.review;
            const user = req.body.user;
            const reviewResponse = await ReviewsDAO.updateReview(reviewId, user, review);
            var { error } = reviewResponse;
            if (error) {
                res.status(400).json({ error });
            }
            if (reviewResponse.modifiedCount === 0){
                throw new Error("unable to update review");
            }
            res.json({status : "success"});
        } catch(e) {
            res.status(500).json({error : e.message});
        }
    }

    static async apiDeleteReview(req, res, next) {
        try {
            //id is a parameter
            const reviewId = req.params.id || {};
            const reviewResponse = await ReviewsDAO.deleteReview(reviewId);
            res.json({status : "success"});
        } catch(e) {
            res.status(500).json({error : e.message});
        }
    }

    static async apiGetReviews(req, res, next) {
        try {
            //id is a parameter
            const id = req.params.id || {};
            const reviews = await ReviewsDAO.getReviewsByMovieId(id);
            if(!reviews) {
                res.status(404).json({error : "Review Not Found"});
            }
            res.json(reviews);
        } catch(e) {
            console.log(`api, ${e}`);
            res.status(500).json({error : e});
        }
    }
};