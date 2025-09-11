import { Router } from "express";
import {listUsers, getOneUser, createOneUser, updateOneUser, deleteOneUser, } from "../controllers/userController.js";
import { validate } from "../middlewares/validate.js";
import { createUserSchema, updateUserSchema } from "../validations/user.schema.js";

const router = Router();

router.get("/", listUsers);
router.get("/:id", getOneUser);
router.post("/", validate(createUserSchema), createOneUser);
router.put("/:id", validate(updateUserSchema), updateOneUser);
router.delete("/:id", deleteOneUser);

export default router;
