const mongoose=require('mongoose')
const{Schema,model}= mongoose
const ProductSchema=new Schema({
    name:String,
    description:String,
    price:Number,
    stockLevel:String,
    reorderLevel:String,

})
const Product=model('Product',ProductSchema)
module.exports=Product