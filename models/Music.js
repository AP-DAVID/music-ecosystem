const mongoose = require("mongoose");

const MusicsSchema = new mongoose.Schema(
  {
    userId :{
        type : String,
        required : true
    },
    picture : {
        type : String,
    },
    music  : {
        type : String,
        default : ""
    },
    name : {
        type : String,
    },
    artist : {
        type : String,
        default : ""
    },
    likes : {
        type : Array,
        default : []
    },
    comment : {
        type : Array,
        default : []
    },
    date: {
        type: Date,
        default: Date.now
    },
    

  },
  { timestamps: true }
);

module.exports = mongoose.models.Musics || mongoose.model("Musics", MusicsSchema);