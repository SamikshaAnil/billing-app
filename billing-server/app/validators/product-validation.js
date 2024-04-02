const productValidationSchema={
    name:{
        notEmpty:{
            errorMessage:"productname is required"
        }
    },
    description:{
        notEmpty:{
            errorMessage:"description is required"
        }
    },
    price:{
        notEmpty:{
            errorMessage:"price is required"
        },
        isNumeric:{
            errorMessage:"It should be a number",
            options:{min:1}
        }
    },
    stockLevel:{
        notEmpty:{
            errorMessage:"stockLevel is required"
        },
        isNumeric:{
            errorMessage:"It should be a number",
            options:{min:1}
        }
    },
    reorderLevel:{
        notEmpty:{
            errorMessage:"reorderLevel is required"
        },
        isNumeric:{
            errorMessage:"It should be a number"
        }
    },
}
module.exports=productValidationSchema