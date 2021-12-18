const mongoose = require("mongoose")
const category = require("./category")

const ChampionSchema = mongoose.Schema({
    nom : String,
    region : String,
    sortUltime : String,
    image: String,
    category:{type: mongoose.Schema.Types.ObjectId,ref:category}
})

module.exports = mongoose.model("champion", ChampionSchema)