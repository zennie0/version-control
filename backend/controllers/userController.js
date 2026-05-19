import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {MongoClient, ReturnDocument} from "mongodb";
import dotenv from "dotenv";

import {ObjectId} from "mongodb"

dotenv.config();
const uri = process.env.MONGO_URI;
let client;

async function connectClient(){
    if(!client){
        client = new MongoClient(uri);
             await client.connect();
    }
}





export  const signup =async (req,res)=>{
    const {username,password,email} = req.body;
try{
    await connectClient();
    const db = client.db("gitUser");
    const userCollection = db.collection("users");
    
    const user = await userCollection.findOne({username});
    if(user){
        return res.status(400).json({message:"user already exist"});

    }
    const salt= await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);


    const newUser ={
        username,
       password: hashedPassword,
        email,
        repositories :[],
        followedUsers:[],
        starRepos:[]

    }

    const result = await userCollection.insertOne(newUser);
    const token =jwt.sign({id:result.insertId},process.env.JWT_SECRET_KEY,{expiresIn:"1h"});

    res.json({token});
}catch(err){
console.error("Error during signup: ",err.message);
res.status(500).send(err.message)
}

};



export const login = async (req,res)=>{
const {email,password} = req.body;
try{
    await connectClient();
  const db = client.db("gitUser");
    const userCollection = db.collection("users");

     
    const user = await userCollection.findOne({email});
    if(!user){
        return res.status(400).json({message:"invalid credentials"});

    }

    const isMatch= await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json({message:"invalid credentials"});
    }
    
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:"1h"});
    res.json({token,userId:user._id});


}catch(err)
{console.error("Error during login: ",err.message)
    res.status(500).send(err.message)
}
};

export const getAllUsers= async (req,res)=>{
try{
  await connectClient();
  const db = client.db("gitUser");
    const userCollection = db.collection("users");
    const users = await userCollection.find({}).toArray();
    res.json(users);

}catch(err){
    console.error("Error during fetching users: ",err.message)
    res.status(500).send(err.message)

}
};

export const getUserProfile = async (req,res)=>{
    const currentID = req.params.id;
    try{
          await connectClient();
        const db = client.db("gitUser");
    const userCollection = db.collection("users");
   const user = await userCollection.findOne({
    _id : new ObjectId(currentID)
});
   if(!user){
        return res.status(400).json({message:"user not fond"});

    }
res.json(user)

    }catch(err){
    console.error("Error during fetching users: ",err.message)
    res.status(500).send(err.message)

}
};

export const updateUserProfile =async (req,res)=>{
 const currentID = req.params.id;
 const {email,password}= req.body;

try{
    await connectClient();
        const db = client.db("gitUser");
    const userCollection = db.collection("users");
let updateFields= {};
if(password){
    const salt= await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    updateFields.password =hashedPassword;
}
if(email){
    
    updateFields.email =email;
}

const result = await userCollection.findOneAndUpdate({
    _id:new ObjectId(currentID),

},{$set:updateFields},
{returnDocument:"after"});
if(!result.value)
{
    return res.status(400).json({message:"user not fond"});

}
res.send(result.value)
}catch(err){
    console.error("Error during updating users: ",err.message)
    res.status(500).send(err.message)
}

};
 export const deleteUserProfile =async (req,res)=>{
     const currentID = req.params.id;
     try{
     await connectClient();
        const db = client.db("gitUser");
    const userCollection = db.collection("users");

    const result = await userCollection.deleteOne({
        _id:new ObjectId(currentID)
    });

    if(result.deleteCount==0){
       return res.status(400).json({message:"user not fond"});

    }
    res.json("userdeleted");
     }catch(err){
        console.error("Error during updating users: ",err.message)
    res.status(500).send(err.message)
     }
};

