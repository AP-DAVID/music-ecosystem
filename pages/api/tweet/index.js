
import ConnectToDatabase from "../../../backend/server"
import  Tweets from "../../../models/tweet";
import nextConnect from "next-connect"


ConnectToDatabase();
const handler = nextConnect();

handler.get(async(req, res)=>{
  try {
    const tweets  =  await Tweets.find({})
    res.status(200).json(tweets)
  } catch (error) {
    res.status(400).json({success: false, error: error})
  }
})

handler.post(async(req, res) =>{
    const {userId, picture, followers, following, date, music, text, likes} = req.body
  
    

    try {
    


          const newTweet = await Tweets.create(
              { 
                  userId: userId, 
                  picture : picture, 
                  followers : followers, 
                  following : following,
                  music : music,
                  date : date,
                  text : text,
                  likes : likes
              }
              
            );
          newTweet.save()
          res.status(201).json(newTweet)

    } catch (error) {
        console.error(error)
    }
})


export default handler
