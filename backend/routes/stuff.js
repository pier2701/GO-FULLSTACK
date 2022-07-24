// on importe toujours express pour récupérer ses méthodes
const express = require ('express');

// on utlise la méthode "routeur" de "express"
const router = express.Router();

// importation du "stuffControllers" créé le dossier "controllers"
const stuffCtrl = require("../controllers/stuff");


// on utilisera les mêmes routes que pour les requêtes, on remplacera "app" par "router"

// le " / " du fichier "stuff" sera la route vers laquelle nous intercepterons les requêtes de type POST
router.post('/', stuffCtrl.createThing);

// route de type PUT request pour modifier un article
router.put('/:id', stuffCtrl.modifyThing);

// route de type DELETE request pour supprimer un article
router.delete('/:id', stuffCtrl.deleteThing);

// route de type GET pour 1 seul objet/article avec requête "params" de l'id
router.get('/:id', stuffCtrl.getOneThing);

// api/stuff sera la route vers laquelle nous intercepterons les requêtes de type GET de touts les objets/articles
router.get('/', stuffCtrl.getAllThings);

// on réexporte la méthode "router" déclarer au début
module.exports = router;