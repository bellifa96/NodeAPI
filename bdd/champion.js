const mongoose = require("mongoose")
const category = require("./category")

const championSchema = mongoose.Schema({
    nom : String,
    region : String,
    sortUltime : String,
    image: String,
    category:{type: mongoose.Schema.Types.ObjectId,ref:category}
})

module.exports = mongoose.model("Champion", championSchema)
