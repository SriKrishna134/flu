 import express from "express"
 import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"

// App Configuration // 
const app = express() 
const port = process.env.PORT || 4000;
// Moddle Ware // 
app.use(cors())
app.use(express.json()) // backend front end devlelopment environmnet //
// DB connection // 
connectDB();
// API endpoint //
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
// App.get Method //
app.get("/", (req, res) => {
    res.send("API working")
    })
    // App.post Method //
    app.listen(port, ()=>{
        console.log (`Server Started on http://localhost:${port}`) 
    })
