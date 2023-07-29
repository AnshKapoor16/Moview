import { config } from "dotenv";
config();
import app from "./server.js"
import mongodb from "mongodb"
import ReviewsDAO from "./dao/reviewsDAO.js"

const MongoClient = mongodb.MongoClient;
const mongodb_username = process.env.MONGODB_USERNAME;
const mongodb_password = process.env.MONGODB_PASSWORD;
const mongodb_uri = `mongodb+srv://${mongodb_username}:${mongodb_password}@cluster0.9m9kev7.mongodb.net/?retryWrites=true&w=majority`

const port = 8000;
MongoClient.connect(
    mongodb_uri,
    {
        maxPoolSize : 50,
        wtimeoutMS : 2500,
        useNewUrlParser : true
    }
).catch(err => {
    console.error(err.stack)
    process.exit(1)
}).then(async client => {
    await ReviewsDAO.injectDB(client)       // To transfer database connection to ReviewsDAO
    app.listen(port,() => {                 //Listen is to start the server 
        console.log(`Listening on Port ${port}`)
    })
})