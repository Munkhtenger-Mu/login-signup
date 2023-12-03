const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const cookieSession = require("cookie-session");

// .env config
dotenv.config()


//router import 
const userRoutes = require("./routes/userRoutes.js");


//mongodb connection
connectDB()

//rest object
const app = express();


//middelwares
app.use(cors({
    origin: 'https://localhost:3000',
    methods: "GET, POST, PUT, DELETE",
    credentials: true
}));
app.use(express.json());
app.use(morgan("dev"));
app.use(
    cookieSession({
        name:"session",
        keys:["cyberwolve"],
        maxAge:24*60*60*100,
    })
)

//routes
app.use("/api/v1/user", userRoutes)



//Port 
const PORT = process.env.PORT || 8080

//Listen

app.listen(PORT, ()=>{
    console.log(`Server Running on ${process.env.DEV_MODE} mode port number ${PORT}`.bgCyan
    .white)
})