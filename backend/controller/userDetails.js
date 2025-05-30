const userModel = require("../models/userModel");

async function userDetailController(req,res){
    try {
        console.log("user id", req.userId);
        const user=await userModel.findById(req.userId)

        res.status(200).json({
            data: user,
            error: false,
            success: true,
            message: "user detail"
        })

        console.log(user)
        
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}
module.exports=userDetailController
