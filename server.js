const express = require("express");
const path = require("path");
const app = express();
const port = 4000;
const session = require("express-session");
require("dotenv").config();
const cors = require("cors"); // to avoid cors error when connecting from frontend to backend

// cor set up
app.use(
    cors({
        origin: "http://localhost:5173",
        allowedHeaders: ["Content-Type", "Authorization"],
        methods: ["GET", "POST", "PATCH", "DELETE"],
    })
);

// set up session
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie:{
            maxAge: 3600000 // 1 hour for the cookie
        }
    })
);

// console log request information when a request is happening
app.use((req,res,next)=>{
    res.on("finish",()=>{
        console.log(`${req.method} ${req.originalUrl} ${req.statusCode} `);
    });
    next();
});

// middleware to handle json body request
app.use(express.json());

// import all routers from the router folder
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const restaurantRouter = require("./routes/restaurant");
const tagRouter = require("./routes/tag");
const restauarantPostRouter = require("./routes/restaurantPost");
const reviewRouter = require("./routes/userRate");

// include the router inside the app of server.js
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/restaurant", restaurantRouter);
app.use("/api/tag", tagRouter);
app.use("/api/restaurant_post", restauarantPostRouter);
app.use("/api/review", reviewRouter);

app.use(express.static(path.join(__dirname, "client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/dist", "index.html"));
});


app.listen(process.env.PORT, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT}`);
  });

