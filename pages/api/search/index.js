
import ConnectToDatabase from "../../../backend/server"
import Register from "../../../models/Register";
import nextConnect from "next-connect"

ConnectToDatabase();
const handler = nextConnect();


handler.post(async(req, res) =>{
    const {username} = req.body
    const boy = 404
    const form = {
        status: 404,
        }
    

    try {
        const search = await Register.findOne({username : username});
       
       if(!search){
           res.status(200).json(form);
           console.log("invalid user")
       }else{
           res.status(200).json(search)
           console.log("Successfully logged in")
       }

       
       
        
    } catch(err) {
        res.status(500).json(err)
        console.log("search input invalid")
    }
})


export default handler
