const Invoice=require('../models/invoices-model')
const Product=require('../controllers/product-cltr')
const{validationResult}=require('express-validator')
const invoicesCltr={}
invoicesCltr.create=async(req,res)=>{
    const errors=validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
    try{
        const{body}=req
        const invoiceObj={...body}

        // const products=await Promise.all(invoiceObj.lineitems.map((ele)=>{return Product.findById(ele.product)}))
        // const products=await Product.find().where('_id').in(productIds)
        const products=await Product.find({_id:[...products]})
        for(let i=0; i <products.length;i++){
            invoiceObj.lineitems[i].price=products[i].price
        }
        invoiceObj.grossTotal=invoiceObj.lineitems.reduce((acc,cv)=>{
            return acc +cv.price*cv.quantity
        },0)

        const deductions=invoiceObj.grossTotal*invoiceObj.discount/100
        const addition=invoiceObj.grossTotal*invoiceObj.taxes/100

        invoiceObj.netTotal=invoiceObj.grossTotal-deductions+addition
        invoiceObj.outstandingBalance=invoiceObj.netTotal
        const invoice=await Invoice.create(invoiceObj)
        res.status(201).json(invoice)
    }
    catch(err){
        res.status(500).json({errors:'Internal server error'})
    }
}
invoicesCltr.list=async(req,res)=>{
    try{
        const invoice=await Invoice.find()
        res.status(201).json(invoice)
    }
    catch(err){
        res.status(500).json({errors:'Internal server errror'})
    }
}
invoicesCltr.delete = async (req, res) => {
    try {
        const id = req.params.id
        const deletedInvoice = await Product.findByIdAndDelete(id)

        if (!deletedInvoice) {
            return res.status(404).json({ errors: 'invoice not found' })
        }
//deleteProduct 
        res.status(200).json(deletedInvoice)
    } catch (err) {
        console.log(err)
        res.status(500).json({ errors: 'Internal server error' })
    }
}
invoicesCltr.update = async (req, res) => {
    try {
        const id = req.params.id 
        const { body } = req
        const updatedInvoice = await Product.findByIdAndUpdate(id, body, { new: true })

        if (!updatedInvoice) {
            return res.status(404).json({ errors: 'Invoice not found' })
        }

        res.status(200).json(updatedInvoice)
    } catch (err) {
        console.log(err)
        res.status(500).json({ errors: 'Internal server error' })
    }
}

module.exports=invoicesCltr