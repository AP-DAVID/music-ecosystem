import ConnectToDatabase from "../../../backend/server"
import Tweets from "../../../models/tweet";
import nextConnect from "next-connect"
const bcrypt = require("bcrypt")

ConnectToDatabase();
const handler = nextConnect();


handler.get(async(req, res)=>{
    const {
        query:{id}
    }= req
    
    try {
        const tweets = await Tweets.find({userId : id})
        if(!tweets){
            res.json({success: false, message:"No such user"})
        }
        res.status(200).json(tweets)
    } catch (error) {
        res.status(400).json({success:false, error:error})
    }
})


export const config = {
    api: {
      bodyParser: {
        sizeLimit: '4mb',
      },
    },
  } 


handler.delete(async(req, res)=>{
    const {
        query:{id}
    }= req
    
    try {
        const tweet = await Tweets.findByIdAndDelete(id);
        !tweet && res.status(404).json("tweet doesn't exist");
        
        res.status(200).json("tweet deleted")
        console.log("tweet deleted")
        
    } catch (error) {
            res.status(400).json({success:false, error:error})
        }
})








  
export default handler;