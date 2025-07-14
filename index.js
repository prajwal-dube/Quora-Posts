const express = require("express");
const app = express();
const port = 8080;
const path = require("path");     // What is use of this 
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");

app.use(express.urlencoded({extended : true }));
app.use(methodOverride("_method"));


app.set("view engine", "ejs");    // Use of this ?
app.set("views", path.join(__dirname, "/views"));    // Use of this ?

app.use(express.static(path.join(__dirname, "public")));   // Use of this ?

let posts = [
    {   id : uuidv4(),
        username : "Prajwal Dube ",
        content : "I love coding",
    },
    {   id : uuidv4(),
        username : "Parth ",
        content : "I love cricket , cricket is my go to game",
    },
    {   id : uuidv4(),
        username : "Pramod  ",
        content : "I got selected for my internship",
    },

];

app.get("/posts", (req, res) => {         // This is to get request , like we can see ( All View )
    res.render("index.ejs", {posts});
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {        // This  is to post  request , like we can post it ( Add New )
    let {username , content } = req.body;
    let id = uuidv4();
    posts.push ({id,username, content});
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {        // This  is to post  request , like we can post it ( Add New )
    let {id} =req.params;
    console.log(id);
    let post = posts.find((p) => id == p.id);
    res.render("show.ejs", {post});
});

app.patch("/posts/:id", (req, res) => {
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs",{post});
})

app.delete("/posts/:id",(req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});

app.listen(port , () => {
    console.log("Listening to port : 8080");
});

