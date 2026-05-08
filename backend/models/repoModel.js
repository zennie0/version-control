import mongoose from "mongoose"

const RepositorySchema =new mongoose.Schema({
  name:{
    type:String,
require:true,
unique:true,
  },
  description:{
    type:String
  },
  content:[
    {
        type:String,

    },
  ],
visibility:{
    type:Boolean,

},
owner:{
    type:Schema.Type.ObjectId,
    ref:"User",
    required:true,
},
issues:[
    {
        type:Schema.Type.ObjectId,
        ref:"Issue"
    }
]
});

const Repository = mongoose.model("Repository",RepositorySchema);
export default Repository;