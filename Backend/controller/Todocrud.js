const todoo = require("./Todoscheema");


const createtodo = async (req,res)=>{
   const  {task,date,status}=req.body;
   const  createtodotask = await todoo.create({task,date,status}) 
   res.json(createtodotask)


     
}


const gettodo=async(req,res)=>{
    const gettask=await todoo.find()
    res.json(gettask)
}

const deletetodo=async (req,res)=>{
    const taskid=req.params.id
     const Deletetask=await todoo.findByIdAndRemove({_id:taskid})
     res.json("deleted")
 }
  
 const UpdateTodo=async (req,res)=>{

    const  {task,date,status}=req.body;
    const _id=req.params.id
     const UpdateTask=await todoo.findByIdAndUpdate(_id,{task,date,status})
     res.json(UpdateTask)
 }

 const getsingletask=async(req,res)=>{
    const taskid=req.params.id
    const task=await todoo.find({_id:taskid})
    res.json(task)
}







module.exports={createtodo,gettodo,deletetodo,UpdateTodo,getsingletask}