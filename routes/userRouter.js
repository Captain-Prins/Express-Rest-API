import express from "express";

const router = express.Router();

let users = [
  { id: 1, name: "joseph", role: "student" },
  { id: 2, name: "joan", role: "Teacher" },
  { id: 3, name: "jack", role: "student" },
];
//GET
router.get("/:id", (req, res) => {
  const userId = parseInt(req.params.id);

  const user = users.find((user) => user.id === userId);

  if (!user) {
    return res.status(404).json({
      error: "User not found"
    });
  }

  res.json(user);
});

//POST
router.post("/", (req, res) => {
  //storing the name and role
  const { name, role } = req.body;
  //validating the name and role because it is required
  if (!name || !role) {
    return res.status(404).json({
      error: "Name and Role are required",
    });
  }
  //creating a new number
  const newId =
    users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;

  //craetng the user object
  const newUser = {
    id: newId,
    name,
    role,
  };

  //saving the object to new array
  users.push(newUser);

  //sending the corect response
  res.status(201).json(newUser);
});

//PUT
router.put("/:id", (req, res) => {
  const userId = parseInt(req.params.id);

  const user = users.find((user) => user.id === userId);

  if (!user) {
    return res.status(404).json({
      error: "User not found",
    });
  }

  const { name, role } = req.body;

  if (!name || !role) {
    return res.status(400).json({
      error: "Name and role are required",
    });
  }

  user.name = name;
  user.role = role;

  res.json(user);
});


//DELETE
router.delete("/:id", (req, res) => {
  const userId = parseInt(req.params.id);

  const userIndex = users.findIndex(
    (user) => user.id === userId
  );

  if (userIndex === -1) {
    return res.status(404).json({
      error: "User not found",
    });
  }

  const deletedUser = users.splice(userIndex, 1)[0];

  res.json(deletedUser);
});



export default router;