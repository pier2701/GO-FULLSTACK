/** paramétrage du FRAMEWORK Express qui facilitera l'analyse des demandes **/

// la constante qui permet d'importer le module "express"
//const {application}= require('express');
const express = require("express");

// la constante déclarée permet de créer une application "express"
const app = express();

// déclaration de constante pour importer l'application mongoose
const mongoose = require("mongoose");

// on importe le module "path" pour interagir avec les routes de fichiers "image"
const path = require("node:path");

// on importe la méthode "router" créée dans le fichier "stuff.js" avec TOUTES les routes/requêtes
const stuffRoutes = require("./routes/stuff");

// on importe la méthode "router" créée pour les "users"
const userRoutes = require("./routes/user");

// connection à mongoDB à travers mongoose avec userId et mdp ( + adresse fourni lors de la création de l'userId) dans le lien
mongoose
  .connect(
    "mongodb+srv://Peter2701:DataBase2701@cluster0.pc1zmj6.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connexion à MongoDB Atlas réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

/** utilisation de Middlewares et de la fonction next() pour passer au middleware suivant **/

// middleware qui intercepte les requêtes utilisateur POUR LES RENDRE EXPLOITABLE sous format "json"
app.use(express.json());

// middleware de "headers", général appliqué à toutes les routes/requêtes, qui
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// mise en place de l'app de "stuffRoutes" avec le chemin vers "api/stuff" ET le routeur mis en place
app.use("/api/stuff", stuffRoutes);

// mise en place de l'app de "userRoutes" avec le chemin attendu par le "frontend" "api/auth et le routeur pour les != chemins "user"
app.use("/api/auth", userRoutes);

// mise en place d'une route pour les fichiers "static" (images)
app.use("/images", express.static(path.join(__dirname, "images")));

// exporter l'application pour pouvoir l'utiliser depuis les autres fichiers
module.exports = app;
