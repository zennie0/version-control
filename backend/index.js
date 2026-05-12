import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import http from "http";
import {Server} from "socket.io";
import mainRouter from "./routes/main.router.js"


dotenv.config();

import yargs from "yargs";
import {hideBin} from "yargs/helpers";
import {initRepo} from "./controllers/init.js";
import {addRepo} from "./controllers/add.js";
import {pullRepo} from "./controllers/pull.js";
import {commitRepo} from "./controllers/commit.js";
import {pushRepo} from "./controllers/push.js";
import {revertRepo} from "./controllers/revert.js";

yargs(hideBin(process.argv))
.command('begin',"Starts a new server",{},startServer)
.command('init',"Initialize a new repository",{},initRepo)
.command('add <file>',"adding repository",(yargs)=>{
    yargs.positional("file",{
        describe:"File to add to the staging area ",
        type:"string",
    })
},
(argv)=>{
    addRepo(argv.file);
}
)
.command('commit <message>',"commit  the staged files",
    (yargs)=>{
        yargs.positional("message",{
            describe:"commit message",
            type:"string",
        })
    },commitRepo)
.command('push',"push commit to s3",{},pushRepo)   
.command('pull',"pull  pull commit  from s3",{},pullRepo) 
.command('revert <commitID>',"revert to a specific commit",(yargs)=>{
    yargs.positional("commitID",{
        describe:"Commit ID to revert to ",
        type:"string",
    })
},
(argv)=>{
    revertRepo(argv.commitID);
}
)
.parse();

function startServer(){
    const app = express();
    const port = process.env.PORT || 3000;

    app.use(bodyParser.json());
    app.use(express.json());

    const mongoURI= process.env.MONGO_URI;

    mongoose.connect(mongoURI)
    .then(()=> console.log("mongoDB connected!"))
    .catch((err)=>console.error("Unable to connect: ",err));

app.use(cors({origin:"*"}));

app.use("/",mainRouter);

let user ="test";

const httpServer = http.createServer(app);
const io = new Server(httpServer,{
    cors:{
        origin:"*",
        methods:["GET","POST"],
    },
});


io.on("connection", (socket)=>{
socket.on("joinRoom", (userID)=>{
    user = userID;
    console.log("=====");
    console.log(user);
    console.log("=====");
    socket.join(userID);
})
});

const db = mongoose.connection;

db.once("open", async()=>{
    console.log("CRUD operations called");
    //crud operations
});

httpServer.listen(port, ()=>{
    console.log(`Server is running on PORT ${port}`)

})


}
