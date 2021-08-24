import mongoose from 'mongoose';
import ConnectToDatabase from "../../../backend/server"
import nextConnect from "next-connect"
import Register from "../../../models/Register";
const Grid = require('gridfs-stream');
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');



ConnectToDatabase();


var connection = mongoose.connection;


const gfs = Grid(connection.db, mongoose.mongo);
gfs.collection('uploads');
const handler = nextConnect();


const storage = new GridFsStorage({
    url: process.env.MONGODB_URI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          //랜덤생성된 이름 + 확장자
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
  });
const upload = multer({ storage });



handler.get(async(req, res)=>{
    gfs.files.find().toArray((err, files) => {
        // Check if files
        if (!files || files.length === 0) {
          return res.status(404).json({
            err: 'No files exist'
          });
        }
    
        // Files exist
        return res.json(files);
      });
})











export default handler
