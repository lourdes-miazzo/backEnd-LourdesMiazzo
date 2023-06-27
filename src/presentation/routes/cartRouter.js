import { Router } from "express";
import { gelList, getOne, saveNew, saveProdInCart, deleteProdInCart, purchaseProductsInCart ,deleteAllProdInCart, updateCart, updateProdInCart } from "../controllers/cartsController.js";
import auth from "../middlewares/auth.js";
import authorization from "../middlewares/authorization.js";
import { authorizationOnlyUser } from "../middlewares/authorizationOnlyUser.js";

const cartRouter = Router()

cartRouter.get("/", auth, authorization("getCarts"), gelList)
cartRouter.get("/:id", auth, authorization("getCart"),  getOne)
cartRouter.post("/", auth, authorization("postCart"),  saveNew)
cartRouter.post("/:id/products/:pid", auth, authorizationOnlyUser("postProdCart"),  saveProdInCart)
cartRouter.post("/:id/purchase", auth, authorization("purchase"), purchaseProductsInCart)
cartRouter.put("/:id", auth, authorization("putcart"),  updateCart)
cartRouter.put("/:id/products/:pid", auth, authorization("putprodCart"),  updateProdInCart)
cartRouter.delete("/:id/products/:pid", auth, authorization("deleteProdCart"),  deleteProdInCart)
cartRouter.delete("/:id", auth, authorization("deleteAllProdCart"),  deleteAllProdInCart)
export default cartRouter
