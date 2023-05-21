import { Router } from "express";
import { gelList, getOne, saveNew, saveProdInCart, deleteProdInCart, deleteAllProdInCart, updateCart, updateProdInCart } from "../controllers/cartsController.js";

const cartRouter = Router()

cartRouter.get("/", gelList)
cartRouter.get("/:id", getOne)
cartRouter.post("/",saveNew)
cartRouter.post("/:id/products/:pid", saveProdInCart)
cartRouter.put("/:id", updateCart)
cartRouter.put("/:id/products/:pid", updateProdInCart)
cartRouter.delete("/:id/products/:pid", deleteProdInCart)
cartRouter.delete("/:id", deleteAllProdInCart)
export default cartRouter
