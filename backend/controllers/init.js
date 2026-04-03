import fs from "fs/promises"; ///file system from node
import path from "path"; // for cwd


export async function initRepo(){
const repoPath = path.resolve(process.cwd(),".mygit");
const commitPath = path.join(repoPath,"commits")

try{
    await fs.mkdir(repoPath,{recursive:true});
    await fs.mkdir(commitPath,{recursive:true});
 await fs.writeFile(
    path.join(repoPath,"config.json"),
    JSON.stringify({bucket:process.env.S3_BUCKET})
 );
 console.log("repo initialized");
}catch(err){
    console.err("Error initializing the repository",err)
}

}

