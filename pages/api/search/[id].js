import ConnectToDatabase from "../../../backend/server"
import Register from "../../../models/Register";
import nextConnect from "next-connect"


ConnectToDatabase();
const handler = nextConnect();


handler.get(async(req, res)=>{
    const {
        query:{id}
    }= req
    
    try {
        const loginn = await Register.findOne({username : id});
        !loginn && res.status(404).json("User not found");
        
        res.status(200).json(loginn)
        console.log("Successfully logged in")
        
    } catch (error) {
            res.status(400).json({success:false, error:error})
    }
})










  
export default handler;