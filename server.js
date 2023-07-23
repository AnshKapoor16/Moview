import express from "express"
import cors from "cors"
import reviews from "./api/reviews.route.js"

//app will be used to create our web server
const app = express();

//Middleware - The middleware in node. js is a function that will have all the access for requesting an object, responding to an object, and moving to the next middleware function in the application request-response cycle
//cors - cross origin resource sharing
app.use(cors());
app.use(express.json());   //To accept json format in request

//Routes
app.use("/api/v1/reviews", reviews);
// app.use("*", (req,res) => res.status(404).send("Requested data was not found."))
app.use("*", (req,res) => res.status(404).json({error : "Requested data was not found."}));

export default app;