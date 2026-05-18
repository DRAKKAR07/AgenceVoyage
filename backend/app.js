require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.DATABASE)
.then(() => console.log("Connexion MongoDB réussie"))
.catch((err) => console.log(err))

const continentRoute = require("./routes/continent.route")
const destinationRoute = require("./routes/destination.route")
const voyageRoute = require("./routes/voyage.route")
const clientRoute = require("./routes/client.route")

app.use("/api/continents", continentRoute)
app.use("/api/destinations", destinationRoute)
app.use("/api/voyages", voyageRoute)
app.use("/api/clients", clientRoute)

app.get("/", (req,res)=>{
    res.send("API Agence Voyage test test")
})

const PORT = process.env.PORT || 3001

app.listen(PORT, ()=>{
    console.log(`Serveur lancé sur port ${PORT}`)
})