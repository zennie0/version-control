import mongoose from "mongoose";
import Repository from "../models/repoModel.js";
import User from "../models/userModel.js";
import Issue from "../models/issueModel.js";



export const createRepository = async (req, res)=>{
    const {owner,name,issues,content,description,visibility}=req.body;

   try{
    if(!name){
        return res.status(400).json({error:"Repo name is required!"});
    }
    if(!mongoose.Types.ObjectId.isValid(owner)){
        return res.status(400).json({error:"user not found!"});
    }

    const newRepository = new Repository({
        name,
        description,
        visibility,
        owner,
        content,
        issues,
    });

    const result = await newRepository.save();

    res.status(201).json({
        message:"Repository created!", repositoryID:result._id,
    });

    }catch(err){
        console.error("Error during Repo creation: ",err.message)
    res.status(500).send(err.message)
    }
};


export const getAllRepositories =async  (req, res)=>{
    res.send("all repos fetched");
};
export const fetchRepositoryById =async  (req, res)=>{
    res.send("one repos fetched");
};
export const fetchRepositoryByName =async  (req, res)=>{
    res.send("one repos by name fetched");
};
export const fetchRepositoryForCurrentUser =async  (req, res)=>{
    res.send(" repos fetched for current user");
};

export const updateRepository =async  (req, res)=>{
    res.send("repo updated");
};
export const toggleVisibilityById =async  (req, res)=>{
    res.send("private or publice");
};
export const deleteRepositoryById = async (req, res)=>{
    res.send("repo deleted");
};


