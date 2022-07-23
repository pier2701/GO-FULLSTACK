/** paramétrage du FRAMEWORK Express qui facilitera l'analyse des demandes **/

// la constante qui permet d'importer le module "express"
const { application } = require('express');
const express = require('express');

// la constante déclarée permet de créer une application "express"
const app = express();

/** utilisation de Middlewares et de la fonction next() pour passer au middleware suivant **/

// middleware qui intercepte les requêtes utilisateur POUR LES RENDRE EXPLOITABLE sous format "json"
app.use(express.json());

// middleware de "headers", général appliqué à toutes les routes/requêtes, qui 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// api/stuff sera la route vers laquelle nous intercepterons les requêtes de type POST
app.post('/api/stuff', (req, res, next) => {
    // le corps de la requête est bien sous format json
    console.log(req.body);
    // postman confirme bien le status de la CREATION D'OBJET ( 201 )
    res.status(201).json({
        message: "objet créé !"
    });
});

// api/stuff sera la route vers laquelle nous intercepterons les requêtes de type GET des objets/articles
app.get('/api/stuff', (req, res, next) => {
    const stuff = [
        {
            _id: 'oeihfzeoi',
            title: 'Mon premier objet',
            description: 'Les infos de mon premier objet',
            imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
            price: 4900,
            userId: 'qsomihvqios',
        },
        {
            _id: 'oeihfzeomoihi',
            title: 'Mon deuxième objet',
            description: 'Les infos de mon deuxième objet',
            imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
            price: 2900,
            userId: 'qsomihvqios',
        },
    ];
    // envoie des données sous format json avec retour de requête REUSSIE ( 200 ) dans postman
    res.status(200).json(stuff);
});

// exporter l'application pour pouvoir l'utiliser depuis les autres fichiers
module.exports = app;

// déclaration de constante pour importer l'application mongoose
const mongoose = require('mongoose');

// connection avec userId et mdp ( + adresse fourni lors de la création de l'userId) dans le lien
mongoose.connect('mongodb+srv://Peter2701:DataBase2701@cluster0.pc1zmj6.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB Atlas réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));