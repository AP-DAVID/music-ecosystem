import mongoose from 'mongoose';
import ConnectToDatabase from "../../../backend/server"
import nextConnect from "next-connect"
const path = require('path');
const crypto = require('crypto')
import Register from "../../../models/Register";
const Grid = require('gridfs-stream');
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
ConnectToDatabase();
var connection = mongoose.connection;

let gfs;

connection.once('open', () =>{
    gfs = Grid(connection.db, mongoose.mongo);
    gfs.collection('uploads');
})

const handler = nextConnect();

const mongoURI = `mongodb+srv://juwon:akintola@cluster0.sxegt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

export const config = {
    api : {
        bodyParser : {
            sizeLimit : '50mb',
        },
    },
}

const storage = new GridFsStorage({
    url : mongoURI,
    file : (req, file) =>{
        return new Promise((resolve, reject) =>{
            crypto.randomBytes(16, (err, buf) => {
                if(err){
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename : filename,
                    bucketName : 'uploads'
                };
                resolve(fileInfo);
            })
        })
    }
})
const upload = multer({ storage });










handler.post( upload.single('file'), (req, res)=>{
   res.json({file : req.file})
   console.log(req.file)
})











export default handler
