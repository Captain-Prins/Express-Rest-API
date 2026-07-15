import express from "express";
import usersRouter from "./routes/userRouter.js";
const app = express();
const port = 3000;



function logger(req, res, next) {
  const now = new Date().toLocaleDateString();
  console.log(`[${now}] \t ${req.method} \t ${req.url}`);
  next();
}
app.use(logger);
app.use(express.json());


app.get("/", (req, res) => {
  res.send("hello from Express!");
});

app.get("/about", (req, res) => {
  res.send("hello from about section");
});
//CRUD GET with filter
// app.get("/api/users", (req, res) => {
//   const { role, name, mode } = req.query;

//   const filterUser= users.filter((user) =>{
//     if(mode=="or"){
//       //OR logic
//       return (role && user.role===role)||
//              (name && user.name === name)
//     }else{
//       //AND logic
//       return (!role || user.role===role) &&
//              (!name || user.name === name)     
//     }
//   })
//   res.json(filterUser);
//   //return the correct response
//   // res.json(users);
// });

//CRUD GET with ID
// app.get("/api/users/:id", (req, res) => {
//   //get the Id from param
//   const userId = parseInt(req.params.id);

//   //compare the Id from param and Id from array/API
//   const user = users.find((user) => user.id == userId);

//   //check if the user is existing
//   if (!user) {
//     return res.status(404).json({
//       error: "user not found",
//     });
//   }

//   //return the correct response
//   res.json(user);
// });

//CRUD POST
// app.post("/api/users", (req, res) => {
//   //storing the name and role
//   const { name, role } = req.body;
//   //validating the name and role because it is required
//   if (!name || !role) {
//     return res.status(404).json({
//       error: "Name and Role are required",
//     });
//   }
//   //creating a new number
//   const newId =
//     users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;

//   //craetng the user object
//   const newUser = {
//     id: newId,
//     name,
//     role,
//   };

//   //saving the object to new array
//   users.push(newUser);

//   //sending the corect response
//   res.status(201).json(newUser);
// });

//CRUD PUT
// app.put("/api/users/:id", (req, res) => {
//   const userId = parseInt(req.params.id);
//   const user = users.find((user) => user.id === userId);

//   if (!user) {
//     return res.status(400).json({
//       error: "user not found",
//     });
//   }

//   const { name, role } = req.body;

//   if (!name || !role) {
//     return res.status(400).json({
//       error: "name and role are required",
//     });
//   }

//   //udating the role and name
//   user.name = name;
//   user.role = role;

//   res.json(user);
// });

//CRUD DELETE
// app.delete("/api/users/:id", (req, res) => {
//   const userId = parseInt(req.params.id);

//   const userIndex = users.findIndex((user) => user.id === userId);

//   if (userIndex === -1) {
//     return res.status(400).json({
//       error: "user not found",
//     });
//   }

//   //delete the line
//   const deleteUser = users.splice(userIndex, 1)[0];

//   res.json(deleteUser);
// });

app.use("/api/users", usersRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
