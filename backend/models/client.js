const mongoose = require("mongoose")

const clientSchema = mongoose.Schema({

    nom:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    }

})

module.exports = mongoose.model("client", clientSchema)