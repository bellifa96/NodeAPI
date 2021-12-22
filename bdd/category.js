const mongoose = require("mongoose")
const categorySchema = mongoose.Schema({
    nom : String
})

module.exports = mongoose.model("Category", categorySchema)
