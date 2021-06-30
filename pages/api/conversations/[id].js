import ConnectToDatabase from "../../../backend/server"
import Conversation from "../../../models/Conversation";
import nextConnect from "next-connect"


ConnectToDatabase();
const handler = nextConnect();

//gets conversation of the user
handler.get(async(req, res)=>{
    const {
        query:{id}
    }= req
    


        try{
            const conversation = await Conversation.find({
                members: { $in: [id] },
            });
            res.status(200).json(conversation);
        }catch(err){
            res.status(500).json(err)
        }
})



  
export default handler;