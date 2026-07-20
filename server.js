import express from "express";
import usersRouter from "./routes/userRouter.js";
import {logger, checkAPIKey} from "./Middleware/middle.js"
import { errorHandler } from "./Middleware/errorHandler.js";
const app = express();
const port = 3000;



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

app.get("/test-error", (req, res, next) => {
  const error = new Error("Testing the error handler");

  next(error);
});

app.use("/api/users",checkAPIKey, usersRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
