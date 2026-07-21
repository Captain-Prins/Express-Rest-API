import express from "express";
import usersRouter from "./routes/userRouter.js";
import { logger, checkAPIKey } from "./Middleware/middle.js";
import { errorHandler } from "./Middleware/errorHandler.js";
import { notFound } from "./middleware/notFound.js";
import cors from "cors";
const app = express();
const port = 3000;

//global middleware
app.use(logger);
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);
app.use(express.json());

//general routes
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

//UserRoutes
app.use("/api/users", usersRouter);

// Unknown route handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
