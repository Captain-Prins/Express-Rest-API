import express from "express";

import {
  getAllUsers,
    getUserbyId,
    createUser,
    updateUser,
    deleteUser,
    testError,
} from "../Controllers/usersControllers.js";

const router = express.Router();

router.get("/", getAllUsers);

router.get("/:id", getUserbyId);

router.post("/", createUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

router.get("/test=error", testError);



export default router;
