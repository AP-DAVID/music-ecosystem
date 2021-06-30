import ConnectToDatabase from "../../../backend/server"
import Register from "../../../models/Register";
import nextConnect from "next-connect"
const bcrypt = require("bcrypt")

ConnectToDatabase();
const handler = nextConnect();


handler.get(async(req, res)=>{
    const {
        query:{id}
    }= req
    
    try {
        const registerr = await Register.findById(id)
        if(!registerr){
            const {password, updateAt, ...other} = regist._doc
            res.json({success: false, message:"No such user"})
        }
        res.status(200).json(registerr)
        } catch (error) {
            res.status(400).json({success:false, error:error})
        }
})






handler.put(async(req, res)=>{
    const {
        query:{id}
    }= req
    console.log(req.query.id)
    console.log(req.body.userId)
    
    if(req.body.userId === req.query.id || req.body.isAdmin){
        if(req.body.password){
        try{
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);

        }catch(err){
            return res.status(500).json(err)
        }
    }

    try{
        const register = await Register.findByIdAndUpdate(req.query.id,{
            $set : req.body,
        });
        res.status(200).json("Account has been succesfully updated")
    }catch(err){
        return res.status(500).json(err)
    }
}
    else{
       return res.status(403).json("You can only update your account");
    }

});
  
export default handler;