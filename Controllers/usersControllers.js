import {
  getsAllUsers,
  getsUserId,
  CreateNewUsers,
  updateUsers,
  deleted,
} from "../models/userModel.js";

//GET
async function getAllUsers(req, res) {
  try {
    const user = await getsAllUsers();

    res.json(user);
  } catch (error) {
    next(error);
  }
}

//GET using ID
async function getUserbyId(req, res) {
  const userId = parseInt(req.params.id);

  if (Number.isNaN(userId)) {
    return res.status(400).json({
      error: "user ID must be a number",
    });
  }

  const user = await getsUserId(userId);

  if (!user) {
    return res.status(404).json({
      error: "user not found",
    });
  }

  res.json(user);
}

//POST
async function createUser(req, res) {
  const { name, role } = req.body;

  if (!name || !role) {
    return res.status(404).json({
      error: "name and role are required",
    });
  }
  const newUser = await CreateNewUsers(name, role);

  res.status(201).json(newUser);
}

//PUT
async function updateUser(req, res) {
  const newId = parseInt(req.params.id);
  const { name, role } = req.body;

  if (!name || !role) {
    return res.status(404).json({
      error: "name and role are required",
    });
  }
  const updateduser = await updateUsers(newId, name, role);

  if (!updateduser) {
    return res.status(404).json({
      error: "userId not found",
    });
  }

  res.json(updateduser);
}

//DELETE
async function deleteUser(req, res) {
  const userId = parseInt(req.params.id);

  const deleteUser = await deleted(userId);

  if (!deleteUser) {
    return res.status(404).json({
      error: "user not found",
    });
  }

  res.json(deleteUser);
}

export { getAllUsers, getUserbyId, createUser, updateUser, deleteUser };
