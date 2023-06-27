import { Router } from "express";
import { deleteOne, getList, getOne, saveNew, update } from "../controllers/productsController.js";
import auth from "../middlewares/auth.js"
import authorization from "../middlewares/authorization.js"
import { authorizationAdmin } from "../middlewares/authorizationAdmin.js";

const productRouter = Router()

productRouter.get("/", getList)
productRouter.get("/:pid",getOne)
productRouter.post("/", auth, authorization("postProduct"), saveNew)
productRouter.put("/:pid", auth, authorizationAdmin,  update)
productRouter.delete("/:pid", auth, authorizationAdmin,  deleteOne)

export default productRouter
