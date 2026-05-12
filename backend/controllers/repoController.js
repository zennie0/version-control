export const createRepository = (req, res)=>{
    res.send("repo created!");
};


export const getAllRepositories = (req, res)=>{
    res.send("all repos fetched");
};
export const fetchRepositoryById = (req, res)=>{
    res.send("one repos fetched");
};
export const fetchRepositoryByName = (req, res)=>{
    res.send("one repos by name fetched");
};
export const fetchRepositoryForCurrentUser = (req, res)=>{
    res.send(" repos fetched for current user");
};

export const updateRepository = (req, res)=>{
    res.send("repo updated");
};
export const toggleVisibilityById = (req, res)=>{
    res.send("private or publice");
};
export const deleteRepositoryById = (req, res)=>{
    res.send("repo deleted");
};


