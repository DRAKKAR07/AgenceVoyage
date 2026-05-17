const mongoose = require("mongoose")

const voyageSchema = mongoose.Schema({

    reference:{
        type:String,
        required:true,
        unique:true
    },

    titre:{
        type:String,
        required:true
    },

    prix:{
        type:Number
    },

    dateDepart:{
        type:Date,
        required:true
    },
    duree:{
        type:String
    },

    hotel:{
        type:String
    },

    imagevoyage:{
        type:String
    },

    destinationID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"destination"
    }

})

module.exports = mongoose.model("voyage", voyageSchema)