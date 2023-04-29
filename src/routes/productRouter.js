import { Router } from "express";
import { deleteOne, getList, getOne, saveNew, update } from "../controllers/productsController.js";

const productRouter = Router()

productRouter.get("/", getList)
productRouter.get("/:pid",getOne)
productRouter.post("/", saveNew)
productRouter.put("/:pid", update)
productRouter.delete("/:pid", deleteOne)

export default productRouter
