import express from "express";

const app = express();
const port = 3000;

const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bobs" },
];

function logger(req,res,next){
    const now = new Date().toLocaleString();
    console.log(`[${now}]\t ${req.method}\t ${req.url}`);
    next();
}




function checkAPIKey(req, res, next) {
  const APIKey = req.header("x-api-key");
  console.log("Header received:", APIKey);
  if (APIKey !== "12345") {
    return res.status(404).json({
      error: "API key is incorrect",
    });
  }

  next();
}

app.use(logger);
app.use(express.json());

app.get("/api/users", checkAPIKey, (req, res) => {

  res.json(users);
});

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
