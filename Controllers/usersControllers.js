import {
  getsAllUsers,
  getsUserId,
  CreateNewUsers,
  updateUsers,
  deleted,
} from "../models/userModel.js";

//GET
function getAllUsers(req, res) {
  const user = getsAllUsers();

  res.json(user);

}

//GET using ID
function getUserbyId(req, res) {
  const userId = parseInt(req.params.id);

  if (Number.isNaN(userId)) {
    return res.status(400).json({
      error: "user ID must be a number",
    });
  }

  const user = getsUserId(userId);

  if (!user) {
    return res.status(404).json({
      error: "user not found",
    });
  }

  res.json(user);
}

//POST
function createUser(req, res) {
  const { name, role } = req.body;

  if (!name || !role) {
    return res.status(404).json({
      error: "name and role are required",
    });
  }
  const newUser = CreateNewUsers(name, role);

  res.status(201).json(newUser);
}

//PUT
function updateUser(req, res) {
  const newId = parseInt(req.params.id);
  const { name, role } = req.body;

  if (!name || !role) {
    return res.status(404).json({
      error: "name and role are required",
    });
  }
  const updateduser= updateUsers(newId, name, role)

    if (!updateduser) {
    return res.status(404).json({
      error: "userId not found",
    });
  }

  res.json(updateduser);
}

//DELETE
function deleteUser(req, res) {
  const userId = parseInt(req.params.id);


  const deleteUser = deleted(userId);

    if(!deleteUser){
      return res.status(404).json({
      error: "user not found",
    });
    }


  res.json(deleteUser);
}


export {
  getAllUsers,
  getUserbyId,
  createUser,
  updateUser,
  deleteUser,
};
