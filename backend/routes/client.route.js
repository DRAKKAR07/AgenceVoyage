const express = require("express")
const router = express.Router()

const Client = require("../models/client")


// afficher clients
router.get("/", async(req,res)=>{

    try{

        const clients = await Client.find()

        res.status(200).json(clients)

    }
    catch(error){

        res.status(404).json({
            message:error.message
        })

    }

})


// ajouter client
router.post("/", async(req,res)=>{

    const nouvclient = new Client(req.body)

    try{

        await nouvclient.save()

        res.status(200).json(nouvclient)

    }
    catch(error){

        res.status(404).json({
            message:error.message
        })

    }

})

module.exports = router