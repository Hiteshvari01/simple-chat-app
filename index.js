const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require('path');
const methodOverride = require('method-override');
const Chat = require("./models/chat.js");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));  // <-- method-override middleware

main().then(() => {
    console.log("connection successful");
}).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

// index route
app.get("/chats", async (req, res) => {
    let chats = await Chat.find();
    res.render("index.ejs", { chats });
});

// new route
app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
});

// create route
app.post("/chats", (req, res) => {
    let { from, to, msg } = req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date()
    });
    newChat.save()
        .then(() => {
            console.log("chat was saved");
            res.redirect("/chats");
        })
        .catch(err => {
            console.log(err);
            res.redirect("/chats");
        });
});

// edit route (show edit form)
app.get("/chats/:id/edit", async (req, res) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", { chat });
});

// update route (PUT)
app.put("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let {msg : Newmsg } = req.body;
    let updatedChat=await Chat.findByIdAndUpdate(
        id, { msg: Newmsg },
        {runValidators:true,new:true}
    );
    res.redirect("/chats");
});
// destroy route 
app.delete("/chats/:id",async (req,res)=>{
    let{id}=req.params;
    let deletedChat= await Chat.findByIdAndDelete(id);
    res.redirect("/chats");

})



app.get("/", (req, res) => {
    res.send("root is working");
});

app.listen(8080, () => {
    console.log("server is listening on port 8080");
});
