import ConnectToDatabase from "../../../backend/server";
import Register from "../../../models/Register";
import nextConnect from "next-connect";

ConnectToDatabase();
const handler = nextConnect();

handler.put(async (req, res) => {
  const {
    query: { id },
  } = req;

  if (req.body.userId !== id) {
    try {
      const user = await Register.findById(id);
      const currentUser = await Register.findById(req.body.userId);

      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { following: id } });
        res.status(200).json("user has been followed");
      }

      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { following: id } });
        res.stus(200).json("user has been unfollowed");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    return res.status(403).json("You can only update your account");
  }
});

export default handler;
