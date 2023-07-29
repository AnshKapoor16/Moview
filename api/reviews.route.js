import express from "express"
import ReviewsControl from "./reviews.controller.js"
const router = express.Router();
// router.route("/").get((req,res) => res.send("Hello World!"));
router.route("/movie/:id").get(ReviewsControl.apiGetReviews);
router.route("/new").post(ReviewsControl.apiPostReview);
router.route("/:id")
    .get(ReviewsControl.apiGetReview)
    .put(ReviewsControl.apiUpdateReview)
    .delete(ReviewsControl.apiDeleteReview)

export default router;