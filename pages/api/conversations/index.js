
import ConnectToDatabase from "../../../backend/server"
import Conversation from "../../../models/Conversation";
import nextConnect from "next-connect"

ConnectToDatabase();
const handler = nextConnect();


handler.post(async(req, res) =>{

    try{
        const conversation = await Conversation.find({
            members: [req.body.senderId, req.body.receiverId]
        });

        const conversation2 = await Conversation.find({
            members: [req.body.receiverId, req.body.senderId]
        });
        

        if(conversation.length != 0 || conversation2.length != 0){
            console.log(conversation.length);
            res.status(200).json(conversation);
        }

        else if(conversation.length === 0 || conversation2.length === 0){
            try{
            const newConversation = new Conversation({
                members: [req.body.senderId, req.body.receiverId]
            });
    
                if(newConversation){
                    const savedConversation = await newConversation.save()
                    res.status(200).json(savedConversation)
                }

                else if(!newConversation){
                    res.status(200).json("nah man ")
                }
            }catch(err){
                res.status(500).json("no man trust me")
            }
    
        }else{
            res.status(200).json("nope man")
        }

    }catch(err){
        res.status(500).json("dead guy")
    }
   
   


   
})


export default handler
