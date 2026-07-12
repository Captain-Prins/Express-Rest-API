import express from "express";

const app = express();
const port = 3000;

function logger(req,res,next){

    const now = new Date().toLocaleDateString();
    console.log(`[${now}] \t ${req.method} \t ${req.url}`)
    next();
}

app.use(logger);

app.get("/", (req,res) =>{
    res.send("hello from Express!");
});

~
app.get("/about",(req,res) =>{
    res.send("hello from about section");
})

app.get("/api/users",(req,res) =>{
    res.json([
        {id:1,name:"joseph",role:"student"},
        {id:2,name:"jeff",role:"teacher"},
    ])
})


app.listen(port, () =>{
    console.log(`Server running at http://localhost:${port}`);
})





