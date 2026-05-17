const mongoose = require("mongoose")

const continentSchema = mongoose.Schema({
    nomcontinent:{
        type:String,
        required:true,
        unique:true
    },
    imagecontinent:{
        type:String
    }
})

module.exports = mongoose.model("continent", continentSchema)