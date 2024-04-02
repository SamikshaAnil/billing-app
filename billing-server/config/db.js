const mongoose =require('mongoose')
const configureDB=(async()=>{
    try{
        const db=await mongoose.connect('mongodb://127.0.0.1:27017/billing-app')
        console.log("connected to db",db.connections[0].name)
    }
    catch(err){
        console.log("db not connected ",err)
    }
})
module.exports= configureDB