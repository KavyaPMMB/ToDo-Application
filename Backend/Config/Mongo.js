const mongoose=require('mongoose')

const connnection=async()=>{
    try{

        const connect=await mongoose.connect("mongodb+srv://kavyapmmb1:Kavyap278035@cluster0.i4po8ud.mongodb.net/todo?retryWrites=true&w=majority",
        {
        useNewUrlParser:true,
        useUnifiedTopology:true,

        })
        console.log("Database is running")
    }

    catch(err){
        console.log(`error:${err}`);
        process.exit();


    }
}
module.exports=connnection