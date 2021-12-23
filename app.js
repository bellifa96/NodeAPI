const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const Champion = require("./bdd/champion")
const Category = require("./bdd/category")

const bodyParser = require("body-parser")


const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb://localhost:27017/apiLOL';
const db = mongoose.connect(uri,{useNewUrlParser:true});


console.log(db)

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())


app.get("/api", function (req, res) {
    res.writeHead(200, {"Content-Type": "text/html"})
    res.end(`<h1>Bienvenue sur la page d'accueil</h1>`)
})

app.get("/api/champion/list", function (req, res) {
    Champion.find({}, function (err, champions) {
        if (err) throw err;
        res.status(200).json(champions)
    })
})
app.get("/api/champion/page/:numPage", function (req, res) {
    const {numPage} = req.params

    res.writeHead(200, {"Content-Type": "text/html"})
    res.end(`<h1>Bienvenue Nodemon npm start sur la page numero : ${numPage}</h1>`)
})

app.get("/api/champion/:id", function (req, res) {
    const {id} = req.params

    let getChampion = Champion.find({'_id':id}, function(err, champion) {
        if (err)  res.status(200).json(err.message);
        res.status(200).json(champion)
    })


})

/************** champion CRUD *********/


app.post("/api/add/champion", async function (req, res) {
    const {nom, region, sortUltime, image,category} = req.body
    console.log(req.body)
    const datas = await Champion.create({
        nom,
        region,
        sortUltime,
        image,
        category
    })
    res.status(201).json({id: datas["_id"]})
})

app.put("/api/champion/:id", async function (req, res) {
    let {id} = req.params
    let {nom,region,sortUltime,image,category} = req.body
    console.log(req)
    let newvalues = { $set: {nom,region,sortUltime,image,category} };
    Champion.updateOne({'_id':id},newvalues, function (err, category) {
        if (err) console.log(err);
        res.status(200).json(category)
    })})

app.delete("/api/champion/:id", async function (req, res) {
    const {id} = req.params
    Champion.deleteOne({'_id':id}, function (err, champion) {
        res.status(200).json(champion)
    })})


/************** category CRUD *********/


app.get("/api/add/category", async function (req, res) {


    const {nom}= req.query
    console.log(nom)
    const datas = await Category.create({
        nom,
    })
    res.status(201).json({id: datas["_id"]})
})


app.post("/api/add/category", async function (req, res) {
    const {nom} = req.body
    console.log(nom)
    const datas = await Category.create({
        nom,
    })
    res.status(201).json({id: datas["nom"]})
})


app.delete("/api/category/:id", async function (req, res) {

    const {id} = req.params
    Category.deleteOne({'_id':id}, function (err, categories) {
        res.status(200).json(categories)
    })
})

app.get("/api/category/list", async function (req, res) {
    Category.find({}, function (err, categories) {
        res.status(200).json(categories)
    })
})
app.get("/api/category/:id", async function (req, res) {
    const {id} = req.params
    Category.find({'_id':id}, function (err, categories) {
        res.status(200).json(categories)
    })
})
app.get("/api/category/byname/:name", async function (req, res) {
    const {name} = req.params
    Category.find({'nom':name}, function (err, categories) {
        res.status(200).json(categories)
    })
})

app.listen(8080, () => {
    console.log("Serveur à l'écoute sur le port 8080")
})
