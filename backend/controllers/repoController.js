import mongoose from "mongoose";
import Repository from "../models/repoModel.js";
import User from "../models/userModel.js";
import Issue from "../models/issueModel.js";


//create repo
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

//getAllRepo

export const getAllRepositories =async  (req, res)=>{
    try{

        const repositories = await Repository.find({})
        .populate("owner")
        .populate("issues");
        res.json(repositories);


    }catch(err){
        console.error("Error during fetching all repositories: ",err.message)
    res.status(500).send(err.message)
    }
};

//open individual repo by id

export const fetchRepositoryById =async  (req, res)=>{
    const repoID = req.params.id;

        try{
             
            const repository = Repository.find({_id:repoID})
            .populate("owner")
            .populate("issues")
          

            res.json(repository);



    }catch(err){
        console.error("Error during fetching the repo: ",err.message)
    res.status(500).send(err.message)
    }
};

//open repo by name

export const fetchRepositoryByName =async  (req, res)=>{
       const {name} = req.params;

        try{
             
            const repository =await Repository.find({name})
            .populate("owner")
            .populate("issues")
          

            res.json(repository);



    }catch(err){
        console.error("Error during fetching the repo: ",err.message)
    res.status(500).send(err.message)
    }
};

//open repo for curr user

export const fetchRepositoryForCurrentUser =async  (req, res)=>{
     const userId=req.user;
       try{

        const repositories = await Repository.find({owner:userId});

        if(!repositories || repositories.length==0){
            return res.status(404).json({error:"User Repositories not found"})
        }

        res.json({message:"Repositories found!",repositories})
    }catch(err){
        console.error("Error during fetching current user repo : ",err.message)
    res.status(500).send(err.message)
    }
};


//updating repo

export const updateRepository =async  (req, res)=>{
   const {id} = req.params;
   const {content,description}= req.body;

       try{
        const repository = await Repository.findById({id});
 if(!repository || repository.length==0){
            return res.status(404).json({error:"User repository not found"})
        }
        repository.content.push(content);
        repository.description=description;
        const updatedRepo = await repository.save();
        res.json({message:"repo updated!",
         repository:updatedRepo
        })
      
    }catch(err){
        console.error("Error updating the repo: ",err.message)
    res.status(500).send(err.message)
    }
};
export const toggleVisibilityById =async  (req, res)=>{
       const {id} = req.params;
       try{
        const repository = await Repository.findById({id});
 if(!repository || repository.length==0){
            return res.status(404).json({error:"User repository not found"})
        }
       repository.visibility = !repository.visibility;
        const updatedRepo = await repository.save();
        res.json({message:"repo visibilty changed!",
         repository:updatedRepo
        })
      
    }catch(err){
        console.error("Error updating the repo: ",err.message)
    res.status(500).send(err.message)
    }
};
export const deleteRepositoryById = async (req, res)=>{
    const {id}= req.params;
        try{
 const repo = await Repository.findByIdAndDelete(id);
 if(!repo){
    return res.status(404).json({error:"Repository not found for deleteing"})
 }

 res.json({message:"Repo deleted"});

    }catch(err){
        console.error("Error during deleting repo: ",err.message)
    res.status(500).send(err.message)
    }

}
