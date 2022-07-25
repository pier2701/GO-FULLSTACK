// on déclare et importe toujours express pour récupérer ses méthodes
const express = require("express");

// on utlise la méthode "routeur" de "express"
const router = express.Router();

// on déclare la function "controllers" pour les différentes routes du "user"
const userCtrl = require("../controllers/user");
const { route } = require("./stuff");

// on récupére les 2 méthodes/functions/middlewares du "controlllers/user"
// le frontend "post" les données, donc on utilise la méthode POST
router.post("/signup", userCtrl.signup); // "/signup" sera la route attndue par le frontend
router.post("/login", userCtrl.login); // "/login" sera la route attndue par le frontend

// on exporte ce routeur spécifique pour les "users"
module.exports = router;
