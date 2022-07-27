// on importe toujours express pour récupérer ses méthodes
const express = require("express");

// on utlise la méthode "routeur" de "express"
const router = express.Router();

// on importe la méthode d'authentification
const auth = require("../middleware/auth");

// on importe la méthode "multer"
const multer = require("../middleware/multer-config");

// importation du "stuffControllers" créé le dossier "controllers"
const stuffCtrl = require("../controllers/stuff");

// on utilisera les mêmes routes que pour les requêtes, on remplacera "app" par "router"

// le " / " du fichier "stuff" sera la route vers laquelle nous intercepterons les requêtes de type POST
router.post("/", auth, multer, stuffCtrl.createThing); // ajout de "auth" AVANT les actions de route
// ajout de "multer" avant "auth"

// route de type PUT request pour modifier un article
router.put("/:id", auth, multer, stuffCtrl.modifyThing);

// route de type DELETE request pour supprimer un article
router.delete("/:id", auth, stuffCtrl.deleteThing);

// route de type GET pour 1 seul objet/article avec requête "params" de l'id
router.get("/:id", auth, stuffCtrl.getOneThing);

// api/stuff sera la route vers laquelle nous intercepterons les requêtes de type GET de touts les objets/articles
router.get("/", auth, stuffCtrl.getAllThings);

// on réexporte la méthode "router" déclarer au début
module.exports = router;
