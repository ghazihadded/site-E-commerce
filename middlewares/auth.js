const jwt=require('jsonwebtoken')

const auth=async(req,res,next)=>{
    const token = req.header('x-auth-token')
    if(!token) { return res.status(400).json([{msg:'Login first to access this resource'}])} 
  
    //const  {token}  = req.cookies
    
    try {
         const coded= await jwt.verify(token,process.env.SECRET_TOKEN)
         req.user=coded.user
         next()

    } catch (err) {
        res.status(400).json([{msg:"token not valid"}])
    }
}


module.exports=auth