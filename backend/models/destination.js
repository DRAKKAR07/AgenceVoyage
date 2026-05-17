const mongoose = require("mongoose")

const destinationSchema = mongoose.Schema({

    nomdestination:{
        type:String,
        required:true
    },

    imagedestination:{
        type:String
    },

    continentID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"continent"
    }

})

module.exports = mongoose.model("destination", destinationSchema)