const mongoose = require("mongoose");
const chat = require("./models/chat.js");
main().then(()=>{
    console.log("connection successful");

})
    .catch(err => console.log(err));
    
    async function main() {
      await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
let Allchats=[
    {
    from:"neha",
    to:"priya",
    msg:"send me your exam sheet",
    created_at:new Date(), 
    },
    {
    from:"ittu",
    to:"pooja",
    msg:"send me your photos",
    created_at:new Date(), 
    },
    {
    from:"seema",
    to:"paro",
    msg:"send me your voice",
    created_at:new Date(), 
    },
    {
    from:"gopal",
    to:"om",
    msg:"send me your exam papper",
    created_at:new Date(), 
    },
    {
    from:"om",
    to:"som",
    msg:"send me your exam notes",
    created_at:new Date(), 
    },
    
];
chat.insertMany(Allchats);
    