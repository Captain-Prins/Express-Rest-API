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


app.use("/api/users", usersRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
