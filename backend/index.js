import yargs from "yargs";
import {hideBin} from "yargs/helpers";
import {initRepo} from "./controllers/init.js";
import {addRepo} from "./controllers/add.js";
import {pullRepo} from "./controllers/pull.js";
import {commitRepo} from "./controllers/commit.js";
import {pushRepo} from "./controllers/push.js";
import {revertRepo} from "./controllers/revert.js";

yargs(hideBin(process.argv))
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
    commitRepo(argv.message);
}
)
.parse();
