const customerValidationSchema={
    name:{
        notEmpty:{
            errorMessage:'* name is required'
        }
    },
    contact:{
        notEmpty:{
            errorMessage:'* contact is required'
        }
    },
    outstandingBalance:{
        notEmpty:{
            errorMessage:'* outStandingBalance is required'
        }
    },
    purchaseHistory:{
        notEmpty:{
            errorMessage:'* purchsehistory is required'
        }
    },
    paymentHistory:{
        notEmpty:{
            errorMessage:"* paymentHistory is required"
        }
    }
}
module.exports=customerValidationSchema