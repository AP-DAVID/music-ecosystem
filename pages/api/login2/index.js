
import ConnectToDatabase from "../../../backend/server"
import Register from "../../../models/Register";
import nextConnect from "next-connect"
const bcrypt = require("bcrypt")

ConnectToDatabase();
const handler = nextConnect();


handler.post(async(req, res) =>{
    const {email, password} = req.body
    

    try {
        const login = await Register.findOne({email : email});
        if(!login){
            res.status(400).json("User not found");
        }
        if(login){
            const validPassword = await bcrypt.compare(password, login.password);
            if(!validPassword){
                res.status(400).json("Wrong Password");
            }else{
                res.status(200).json(login)
            }
            
        }
        
    } catch(err) {
        res.status(500).json(err)
        console.log("credentials Invalid")
    }
})


export default handler
