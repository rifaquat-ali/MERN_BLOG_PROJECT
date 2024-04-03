import express from "express"
import { signupUser, loginUser } from "../controller/userController.js";
import { imageUpload ,getImage} from "../controller/image-controller.js";
import upload from "../middleware/upload.js";
import {createPost,getAllBlogs,getPost} from "../controller/post-controller.js";
import { authenticateToken } from "../controller/jwt-controller.js";

const router = express.Router()


router.post("/signup", signupUser)
router.post("/login", loginUser)
router.post("/file/upload",upload.single("file"), imageUpload)
router.get("/file/:filename", getImage)
router.post("/create",authenticateToken,createPost)
router.get("/blogs",authenticateToken,getAllBlogs)
router.get("/post/:id",authenticateToken,getPost)

export default router;