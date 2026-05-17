const express = require("express")
const router = express.Router()

const Voyage = require("../models/voyage")
const Destination = require("../models/destination")


// afficher liste voyages
router.get("/", async(req,res)=>{

    try{

        const voyages = await Voyage.find({}, null, {
            sort:{'_id':-1}
        })
        .populate("destinationID")
        .exec()

        res.status(200).json(voyages)

    }
    catch(error){

        res.status(404).json({
            message:error.message
        })

    }

})


// ajouter voyage
router.post("/", async(req,res)=>{

    const nouvvoyage = new Voyage(req.body)
    
    try{

        await nouvvoyage.save()
        await fetch(
            'http://localhost:5678/webhook-test/newvoyage',
            {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(nouvvoyage)
            }
        )
        res.status(200).json(nouvvoyage)

    }
    catch(error){

        res.status(404).json({
            message:error.message
        })

    }

})


// pagination
router.get("/pagination", async(req,res)=>{

    const page = req.query.page || 1
    const limit = req.query.limit || 5

    const offset = (page - 1) * limit

    try{

        const voyagesTot = await Voyage.countDocuments()

        const voyages = await Voyage.find({}, null, {
            sort:{'_id':-1}
        })
        .skip(offset)
        .limit(limit)

        res.status(200).json({
            voyages:voyages,
            tot:voyagesTot
        })

    }
    catch(error){

        res.status(404).json({
            message:error.message
        })

    }

})


// chercher voyage par id
router.get("/:id", async(req,res)=>{

    try{

        const voyage = await Voyage.findById(req.params.id)

        res.status(200).json(voyage)

    }
    catch(error){

        res.status(404).json({
            message:error.message
        })

    }

})


// modifier voyage
router.put("/:id", async(req,res)=>{

    try{

        const voyage = await Voyage.findByIdAndUpdate(
            req.params.id,
            {$set:req.body},
            {new:true}
        )

        const voyages = await Voyage.findById(voyage._id)
        .populate("destinationID")
        .exec()

        res.status(200).json(voyages)

    }
    catch(error){

        res.status(404).json({
            message:error.message
        })

    }

})


// supprimer voyage
router.delete("/:id", async(req,res)=>{

    try{

        await Voyage.findByIdAndDelete(req.params.id)

        res.json({
            message:"voyage supprimé"
        })

    }
    catch(error){

        res.status(404).json({
            message:error.message
        })

    }

})


// chercher voyages par destination
router.get("/destination/:destinationID", async(req,res)=>{

    try{

        const voyages = await Voyage.find({
            destinationID:req.params.destinationID
        }).exec()

        res.status(200).json(voyages)

    }
    catch(error){

        res.status(404).json({
            message:error.message
        })

    }

})


// chercher voyages par continent
router.get("/continent/:continentID", async(req,res)=>{

    try{

        // destinations du continent
        const destinations = await Destination.find({
            continentID:req.params.continentID
        }).exec()

        // tableau ids destinations
        const destinationIDs = destinations.map(
            destination => destination._id
        )

        // voyages correspondants
        const voyages = await Voyage.find({
            destinationID:{
                $in:destinationIDs
            }
        }).exec()

        res.status(200).json(voyages)

    }
    catch(error){

        res.status(404).json({
            message:error.message
        })

    }

})

module.exports = router