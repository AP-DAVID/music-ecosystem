
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
        !login && res.status(404).json("User not found");

        const validPassword = await bcrypt.compare(password, login.password);
        !validPassword && res.status(400).json("Wrong Password");
       
        res.status(200).json(login)
        console.log("Successfully logged in")
    } catch(err) {
        res.status(500).json(err)
        console.log("credentials Invalid")
    }
})


export default handler
