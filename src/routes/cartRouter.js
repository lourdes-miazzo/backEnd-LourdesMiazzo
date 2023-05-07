import { Router } from "express";
import { gelList, getOne, saveNew, saveProdInCart, deleteProdInCart, deleteAllProdInCart, updateCart, updateProdInCart } from "../controllers/cartscontroller.js";

const cartRouter = Router()

cartRouter.get("/", gelList)
cartRouter.get("/:cid", getOne)
cartRouter.post("/",saveNew)
cartRouter.post("/:cid/products/:pid", saveProdInCart)
cartRouter.put("/:cid", updateCart)
cartRouter.put("/:cid/products/:pid", updateProdInCart)
cartRouter.delete("/:cid/products/:pid", deleteProdInCart)
cartRouter.delete("/:cid", deleteAllProdInCart)
export default cartRouter
