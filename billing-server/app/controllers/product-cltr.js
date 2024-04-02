const Product=require('../models/product-models')
const{validationResult}=require('express-validator')
const productCltr={}
productCltr.create=async(req,res)=>{
    const errors=validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
    try{
        const{body}=req
        const product=await Product.create(body)
        res.status(201).json(product)
    }
    catch(err){
        res.status(500).json({errors:'Internal server error'})
    }
}
productCltr.list=async(req,res)=>{
    try{
        const product=await Product.find()
        res.status(201).json(product)
    }
    catch(err){
        res.status(500).json({errors:'Internal server errror'})
    }
}
productCltr.delete = async (req, res) => {
    try {
        const id = req.params.id
        const deletedProduct = await Product.findByIdAndDelete(id)

        if (!deletedProduct) {
            return res.status(404).json({ errors: 'Product not found' })
        }
//deleteProduct 
        res.status(200).json(deletedProduct)
    } catch (err) {
        console.log(err)
        res.status(500).json({ errors: 'Internal server error' })
    }
}
productCltr.update = async (req, res) => {
    try {
        const id = req.params.id 
        const { body } = req
        const updatedProduct = await Product.findByIdAndUpdate(id, body, { new: true })

        if (!updatedProduct) {
            return res.status(404).json({ errors: 'Product not found' })
        }

        res.status(200).json(updatedProduct)
    } catch (err) {
        console.log(err)
        res.status(500).json({ errors: 'Internal server error' })
    }
}

module.exports=productCltr