import ApiError from "../utils/apiError.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { createUserSchema } from "../validations/user.schema.js";
import { getUsers, getUserById, createUser, updateUser, deleteUser } from "../services/userService.js";


export const listUsers = asyncHandler(async (req, res) => {
    const users = await getUsers();
    res.json(users);
});

export const getOneUser = asyncHandler(async (req, res) =>{
    const user = await getUserById(req.params.id);
    if (!user) throw new ApiError(404, "User not found");
    res.json(user);
});

export const createOneUser = asyncHandler(async(req, res) =>  {
    const {error, value} = createUserSchema.validate(req.body);
    if (error) throw new ApiError(400, error.message);
    const user = await createUser(value);
    res.status(201).json(user);
});

export const updateOneUser = asyncHandler(async(req, res) => {
    const {error, value} = createUserSchema.validate(req.body);
    if (error) throw new ApiError(400, error.message);
    const user = await updateUser(req.params.id, value);
    if (!user) throw new ApiError(404, "User not found");
    res.json(user);
});

export const deleteOneUser = asyncHandler(async(req, res) => {
    const ok = await deleteUser(req.params.id);
    if (!ok) throw new ApiError(404, "User not found");
    res.status(204).end();
});



