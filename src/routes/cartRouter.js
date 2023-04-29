import { Router } from "express";
import { gelList, getOne, saveNew, saveProdInCart } from "../controllers/cartscontroller.js";

const cartRouter = Router()

cartRouter.get("/", gelList)
cartRouter.get("/:cid", getOne)
cartRouter.post("/",saveNew)
cartRouter.post("/:cid/products/:pid", saveProdInCart);


export default cartRouter
