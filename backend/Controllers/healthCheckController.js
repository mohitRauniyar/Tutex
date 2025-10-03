export const healthCheckController = (req,res)=>{
    return res.status(200).json({message:"Running"})
}