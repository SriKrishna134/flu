  import express from "express"
  import { addToCart,deleteFromCart,getCart } from "../controllers/Cartcontroller.js"  
  import authMiddleware from "../middleware/auth.js";

  const cartRouter = express.Router();  

  cartRouter.post("/add", authMiddleware, addToCart)
  cartRouter.post("/delete", authMiddleware, deleteFromCart)    
  cartRouter.post("/get", authMiddleware, getCart)

  export default cartRouter;