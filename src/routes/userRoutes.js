import { Router } from "express";
import {listUsers,getOneUser,createOneUser,updateOneUser,deleteOneUser, } from "../controllers/userController.js";

const router = Router();

router.get("/", listUsers);
router.get("/:id", getOneUser);
router.post("/", createOneUser);
router.put("/:id", updateOneUser);
router.delete("/:id", deleteOneUser);

export default router;
