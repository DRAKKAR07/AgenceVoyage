const express = require("express")
const router = express.Router()

const Destination = require("../models/destination")

// afficher destinations
router.get("/", async(req,res)=>{
    try{

        const destinations = await Destination.find()
        .populate("continentID")
        .exec()

        res.status(200).json(destinations)

    }
    catch(error){
        res.status(404).json({
            message:error.message
        })
    }
})


// ajouter destination
router.post("/", async(req,res)=>{

    const nouvdestination = new Destination(req.body)

    try{

        await nouvdestination.save()

        res.status(200).json(nouvdestination)

    }
    catch(error){

        res.status(404).json({
            message:error.message
        })

    }

})


// chercher destination par id
router.get("/:id", async(req,res)=>{

    try{

        const destination = await Destination.findById(req.params.id)
        .populate("continentID")

        res.status(200).json(destination)

    }
    catch(error){

        res.status(404).json({
            message:error.message
        })

    }

})


// modifier
router.put("/:id", async(req,res)=>{

    try{

        const destination = await Destination.findByIdAndUpdate(
            req.params.id,
            {$set:req.body},
            {new:true}
        )

        res.status(200).json(destination)

    }
    catch(error){

        res.status(404).json({
            message:error.message
        })

    }

})


// supprimer
router.delete("/:id", async(req,res)=>{

    try{

        await Destination.findByIdAndDelete(req.params.id)

        res.json({
            message:"destination supprimée"
        })

    }
    catch(error){

        res.status(404).json({
            message:error.message
        })

    }

})


// chercher destinations par continent
router.get("/continent/:continentID", async(req,res)=>{

    try{

        const destinations = await Destination.find({
            continentID:req.params.continentID
        })

        res.status(200).json(destinations)

    }
    catch(error){

        res.status(404).json({
            message:error.message
        })

    }

})

module.exports = router