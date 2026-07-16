let users = [
  { id: 1, name: "joseph", role: "student" },
  { id: 2, name: "joan", role: "Teacher" },
  { id: 3, name: "jack", role: "student" },
];

//GET
function getAllUsers(req, res) {
  const { role } = req.body;

  if (role) {
    const filteredUser = users.filter((user = user.role === role));

    return res.json(filteredUser);
  }

  res.json(users);
}

//GET using ID
function getUserbyId(req, res) {
  const userId = parseInt(req.params.id);

  const user = users.find((user) => user.id === userId);

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

  const newId =
    users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;

  const newUser = {
    id: newId,
    name,
    role,
  };

  users.push(newUser);

  res.status(201).json(newUser);
}

//PUT
function updateUser(req, res) {
  const newId = parseInt(req.params.id);

  const user = users.find((user) => user.id === newId);

  if (!user) {
    return res.status(404).json({
      error: "userId not found",
    });
  }

  const { name, role } = req.body;

  if (!name || !role) {
    return res.status(404).json({
      error: "name and role are required",
    });
  }

  user.name = name;
  user.role = role;

  res.json(user);
}

//DELETE

function deleteUser(req, res) {
  const userId = parseInt(req.params.id);

  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({
      error: "user not found",
    });
  }

  const deletedUser = users.splice(userIndex,1)[0]

  res.json(deleteUser)
}

export{
    getAllUsers,
    getUserbyId,
    createUser,
    updateUser,
    deleteUser,
}