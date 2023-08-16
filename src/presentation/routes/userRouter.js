import { Router } from "express";
import { uploader } from "../../utils/multer.js";
import { allUsers, oneUser, saveNewUser, saveCartInUser, updateUser, deleteUser, modifyUser, postDocuments } from "../controllers/userController.js";
import auth from "../middlewares/auth.js";
import authorization from "../middlewares/authorization.js";

const userRouter = Router()

userRouter.get("/", auth, authorization("getUsers"), allUsers)
userRouter.get("/:id", auth, authorization("getUser"), oneUser)
userRouter.post("/", auth, authorization("postUser"), saveNewUser) 
userRouter.post("/:id", auth, authorization("postCartInUser"), saveCartInUser) 
userRouter.put("/:id", auth, authorization("putUser"), updateUser)
userRouter.delete("/:id", auth, authorization("deleteUser"), deleteUser)
userRouter.post("/premium/:id", uploader.any("files", 3), modifyUser)
userRouter.post("/:id/documents", uploader.any("file"), postDocuments)

export default userRouter