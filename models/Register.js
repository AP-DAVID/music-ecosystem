const mongoose = require('mongoose');

const RegisterSchema = new mongoose.Schema({
    username : {
       type : String,
       required : [true, 'Please add a name'],
       min : 3,
       max : 20,
       unique : true,
       trim: true,
       lowercase: true 
   },
   section : {
       type : String,
       required : true,
   },
   email:{
       type : String,
       required : true,
       max : 50,
       unique : true,
       trim: true

   },
   password:{
       type: String,
       required : true,
       min : 6
   },
   description :{
       type : String,
       default : ""

   },
   phonenumber :{
       type : Number,
       default : 0
   },
   age :{
       type : Number,
       default : 0
   },
   followers:{
        type : Array,
        default : []
   },
   following:{
        type : Array,
        default : []
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    city: {
      type: String,
      max: 50,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
   isloggedin : {
       type : Boolean,
       default : false
   }
   

}, 
{timestamps : true}
);
module.exports = mongoose.models.Register || mongoose.model('Register', RegisterSchema)