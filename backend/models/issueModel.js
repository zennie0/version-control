import mongoose from "mongoose"

const IssueSchema =new mongoose.Schema({
  
 title:{
    type:String,
    required:true,
 }   ,
 description:{
    type:String,
required:true
 },
 status:{
    type:String,
    enum:["open","closed"],
    default:"open",
 },
 repository:{
    type:Schema.Types.ObjectID,
    ref:"Repository",
    required:true,
 }

});

const Issue = mongoose.model("Issue",IssueSchema);
export default Issue;