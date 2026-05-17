const express = require("express")
const router = express.Router()

const Continent = require("../models/continent")

// afficher liste
router.get("/", async(req,res)=>{
    try{
        const continents = await Continent.find()
        res.status(200).json(continents)
    }
    catch(error){
        res.status(404).json({message:error.message})
    }
})

// ajouter
router.post("/", async(req,res)=>{
    const nouvcontinent = new Continent(req.body)

    try{
        await nouvcontinent.save()
        res.status(200).json(nouvcontinent)
    }
    catch(error){
        res.status(404).json({message:error.message})
    }
})

// modifier
router.put("/:id", async(req,res)=>{
    try{
        const continent = await Continent.findByIdAndUpdate(
            req.params.id,
            {$set:req.body},
            {new:true}
        )

        res.status(200).json(continent)
    }
    catch(error){
        res.status(404).json({message:error.message})
    }
})

// supprimer
router.delete("/:id", async(req,res)=>{
    try{
        await Continent.findByIdAndDelete(req.params.id)

        res.json({
            message:"continent supprimé"
        })
    }
    catch(error){
        res.status(404).json({message:error.message})
    }
})

module.exports = router