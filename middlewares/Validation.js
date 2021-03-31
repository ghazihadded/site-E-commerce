const { body, validationResult } = require('express-validator');

 const registerProductRules=()=>[
    
        body('name','please enter your product name').notEmpty(),
        body('price','please enter your product price').isLength({max:6}),
        body('description','please enter your product description').notEmpty(),
        body('category','please enter your product category').notEmpty(),
        body('seller','please enter product seller').notEmpty(),
        body('stock','please enter product stock').isLength({max:5})
      ]

      const registerUser=()=>[
        body('name','please enter your  name').notEmpty(),
        body('email','please enter corerct email').isEmail(),
        body('password','password is require minimum 6 character').isLength({min:6}),
       
      ]
      const registerNewPassword=()=>[
       
        body('password','password is require minimum 6 character').isLength({min:6}),
        
       
      ]

      const orderRules=()=>[
        body('shippingInfo.address','enter your correct adress ').notEmpty().isLength({max:20}),
        body('shippingInfo.city','enter your correct city ').notEmpty().isLength({max:20}),
        body('shippingInfo.phone','enter your correct phone ').notEmpty().isLength({max:10}),
        body('shippingInfo.postalCode','enter your correct postal Code ').notEmpty().isLength({max:20}),
        body('shippingInfo.country','enter your correct country ').notEmpty().isLength({max:20}),
        
      ]

      const Login=()=>[
       
        body('email','please enter corerct email').isEmail(),
        body('password','please enter your password').notEmpty()
      ]
   
      const updatePassword=()=>[
        body('oldPassword','please enter your old password ').notEmpty(),
        body('password','password is require minimum 6 character').isLength({min:6}),
      ]
   const validator=(req,res,next)=>{
    const error= validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json(error.array());
    }else{
        next()
    }
   }   

   module.exports={
       registerProductRules,
       validator,
       registerUser,
       Login,
       updatePassword,
       orderRules,
       registerNewPassword,
   }

