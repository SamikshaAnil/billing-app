const Customer=require('../models/customer-model')
const{validationResult}=require('express-validator')
const customerCltr={}
customerCltr.create=async(req,res)=>{
    const errors=validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
    try{
        const{body}=req
        const customer=await Customer.create(body)
        res.status(201).json(customer)
    }
    catch(err){
        res.status(500).json({errors:'Internal server error'})
    }
}
customerCltr.list=async(req,res)=>{
    try{
        const customer=await Customer.find()
        res.status(201).json(customer)
    }
    catch(err){
        res.status(500).json({errors:'Internal server errror'})
    }
}
customerCltr.delete = async (req, res) => {
    try {
        const id = req.params.id
        const deletedCustomer = await Product.findByIdAndDelete(id)

        if (!deletedCustomer) {
            return res.status(404).json({ errors: 'Customer not found' })
        }
//deleteProduct 
        res.status(200).json(deletedCustomer)
    } catch (err) {
        console.log(err)
        res.status(500).json({ errors: 'Internal server error' })
    }
}
customerCltr.update = async (req, res) => {
    try {
        const id = req.params.id 
        const { body } = req
        const updatedCustomer = await Product.findByIdAndUpdate(id, body, { new: true })

        if (!updatedCustomer) {
            return res.status(404).json({ errors: 'Customer not found' })
        }

        res.status(200).json(updatedCustomer)
    } catch (err) {
        console.log(err)
        res.status(500).json({ errors: 'Internal server error' })
    }
}

module.exports=customerCltr