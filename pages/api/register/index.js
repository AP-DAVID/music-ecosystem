
import ConnectToDatabase from "../../../backend/server"
import Register from "../../../models/Register";
import nextConnect from "next-connect"
const bcrypt = require("bcrypt")

ConnectToDatabase();
const handler = nextConnect();

handler.get(async(req, res)=>{
  try {
    const registers  =  await Register.find({})
    res.status(200).json(registers)
  } catch (error) {
    res.status(400).json({success: false, error: error})
  }
})

handler.post(async(req, res) =>{
    const { username, email, password, section} = req.body
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)
    

    try {
        const usernamefind = await Register.findOne({username : username});
        if(usernamefind){
            res.status(200).json("User found");
        }

        const emailfind = await Register.findOne({email : email});
        if(emailfind){
            res.status(200).json("email exist");
        }

        if(!usernamefind && !emailfind){
          const newRegister = await Register.create({ username: username , email: email, section : section,  password : hashedPassword});
          newRegister.save()
          res.status(201).json(newRegister)
        }
    } catch (error) {
        console.error(error)
    }
})


export default handler
