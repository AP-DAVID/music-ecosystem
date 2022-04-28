import ConnectToDatabase from "../../../backend/server";
import Message from "../../../models/Message";
import nextConnect from "next-connect";

ConnectToDatabase();
const handler = nextConnect();

handler.get(async (req, res) => {
  const {
    query: { id },
  } = req;

  try {
    const messages = await Message.find({
      conversationId: id,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default handler;
