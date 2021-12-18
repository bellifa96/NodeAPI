const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const userModel = require("./bdd/champion")
const bodyParser = require("body-parser")
const categoryModel = require("./bdd/category")
//const db = mongoose.connect("mongodb://localhost/initMongo",{useNewUrlParser:true})




app.use(cors())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())


app.get("/", function(req,res){
    res.writeHead(200, {"Content-Type": "text/html"})
    res.end("<h1>Bienvenue</h1>")
})

app.get("/liste", function(req,res){
    res.writeHead(200, {"Content-Type": "text/html"})
    res.end(`<h1>Bienvenue sur la page d'accueil</h1>`)
})
app.get("/champion/:numPage", function(req,res){
    const {numPage} = req.params

    res.writeHead(200, {"Content-Type": "text/html"})
    res.end(`<h1>Bienvenue Nodemon npm start sur la page numero : ${numPage}</h1>`)
})

app.get("/champion/:id", function(req,res){
    const {id} = req.params

    if(isNaN(parseInt(id))){
        res.writeHead(400, {"Content-Type": "text/html"})
        res.end("Wrong id format")
        return null
    }
    let selectUser = users.filter(user=>(user.id === parseInt(id)))

    if(selectUser.length === 0){
        res.writeHead(404, {"Content-Type": "text/html"})
        res.end("No user found")
        return null
    }

    res.status(200).json(selectUser[0])
})

app.get("/champion", async function(req,res){

    res.status(200).json({id:datas["_id"]})
})

app.post("/champion", async function(req,res){
    const {nom, prenom, age, category} = req.body

    const datas = await userModel.create({
        nom,
        region,
        sortUltime,
        image,
        category
    })
    res.status(201).json({id:datas["_id"]})
})

app.put("/champion/:id", async function(req,res){
    // La modification d'un utilisateur
})

app.delete("/champion/:id", async function(req,res){
    // La suppression
})

app.get("/category", async function(req,res){
    categoryModel.find({}, function(err, categories){
        res.status(200).json(categories)
    })
})

module.exports = app