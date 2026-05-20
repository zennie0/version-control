import mongoose from "mongoose";
import Repository from "../models/repoModel.js";
import User from "../models/userModel.js";
import Issue from "../models/issueModel.js";


export const createIssue = async (req, res)=>{
   const {title,description}= req.body;
   const {id} = req.params;

    try{
        const issue = new Issue({
            title,
            description,
            repository:id,
        });
        await issue.save();
        res.status(201).json(issue);

    }catch(err){
        console.error("Error during issue creation: ",err.message)
    res.status(500).send(err.message)
    }

};
export const updateIssueById = async (req, res)=>{
   const {id} = req.params;
   const {title,description}= req.body;
 try{
    const issue= await Issue.findById(id);
    if(!issue){
        return res.status(404).json({error:"Issue not found"});
    }
     
    issue.title =title;
    issue.description= description;
    issue.status = status;

    await issue.save();
    res.json(issue);
        
    
    }catch(err){
        console.error("Error during issue updation: ",err.message)
    res.status(500).send(err.message)
    }


};
export const deleteIssueById = async (req, res)=>{
    const {id} = req.params;
    try{
        const issue = Issue.findByIdAndDelete(id);
         if(!issue){
        return res.status(404).json({error:"Issue not found"});
    }
    res.json({message:"Issue Deleted"})

    }catch(err){
        console.error("Error during issue deletion: ",err.message)
    res.status(500).send(err.message)
    }
};
export const getAllIssues =async  (req, res)=>{
    const {id} = req.params;
    try{
        const issues =Issue.find({repository:id});
if(!issues){
        return res.status(404).json({error:"Issue not found"});
    }
        res.json(200).json(issues);

    }catch(err){
        console.error("Error during issue fetching: ",err.message)
    res.status(500).send(err.message)
    }
};

export const getIssueById =async  (req, res)=>{
    const {id} =req.params;
   try{
        const issue = await Issue.findById(id);
        if(!issues){
        return res.status(404).json({error:"Issue not found"});
    }
 res.json(200).json(issues);
    }catch(err){
        console.error("Error during issue creation: ",err.message)
    res.status(500).send(err.message)
    }
};



