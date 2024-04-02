require('dotenv').config()
const express=require('express')
const app=express()
const mongoose=require('mongoose')
const cors=require('cors')
const port=process.env.PORT||3050
const{checkSchema}=require('express-validator')
const configureDB  = require('./config/db')

const productCltr = require('./app/controllers/product-cltr')
const customerCltr=require('./app/controllers/customer-cltr')
const invoicesCltr=require('./app/controllers/invoices-cltr')

const productValidationSchema=require('./app/validators/product-validation')

configureDB()
app.use(express.json())
app.use(cors())
app.post('/api/products',checkSchema(productValidationSchema),productCltr.create)
app.put('/api/products/:id',checkSchema(productValidationSchema),productCltr.update)
app.delete('/api/products/:id',productCltr.delete)
app.get('/api/products',productCltr.list)

app.post('/api/invoices',customerCltr.create)
app.put('/api/customers/:id',customerCltr.update)
app.delete('/api/customers/:id',customerCltr.delete)
app.get('/api/customers',customerCltr.list)

app.post('/api/invoices',invoicesCltr.create)
app.put('/api/invoices/:id',invoicesCltr.update)
app.delete('/api/invoices/:id',invoicesCltr.delete)
app.get('/api/invoices',invoicesCltr.list)
app.listen(port,()=>{
  console.log(`billing app is running on port number${port}`)
})
