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
        Register.find({}, function (err, username){
            if(err){
               res.send("Something went wrong")
            }
            res.status(200).json(username)
        })
        
    } catch (error) {
            res.status(400).json({success:false, error:error})
        }
})



  
export default handler;