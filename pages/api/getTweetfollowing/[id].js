
import ConnectToDatabase from "../../../backend/server"
import Tweets from "../../../models/tweet";
import Register from "../../../models/Register";
import nextConnect from "next-connect"


ConnectToDatabase();
const handler = nextConnect();


handler.get(async(req, res) =>{
    const {
        query:{id}
    }= req
    
    try {
        const register = await Register.findById(id);
        if(!register){
            res.json({success: false, message:"No such user"})
        }
        else {
            const followingTweets= await [];

            const following = register.following;

            const bigger = await Promise.all(following.map(async (name) => {
                    const tweet = await Tweets.findOne({userId : name});
                    // await followingTweets.push(tweet)
                    return tweet
                 
                  
                

            }))
           
                console.log(bigger);
                res.status(200).json(bigger)
         
            


        }
  
    } catch (error) {
        res.status(400).json({success:false, error:error})
    }
})


export default handler
