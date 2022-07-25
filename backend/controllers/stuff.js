// importation du "schema" créé dans mongoose importé du dossier "models"
// car il est réutilisé ici
const Thing = require("../models/thing").default.default;

// on déclare la méthode "fse"
const fse = require("fs-extra");
const { request } = require("../app");
const thing = require("../models/thing");

// on exporte les méthodes créées au sein de chaque "router" dans une nouvelle fonction pour chaque méthode "router"

// on récupère la logique pour "créer" un article
exports.createThing = (req, res, next) => {
  // on va "parsé" l'objet json de "req"
  const thingObject = JSON.parse(req.body.thing);

  // on va supprimer 2 éléments dans cet objet :
  // _id ( car l'id sera généré automatiquement par mongoDB ) et userId ( il ne faut pas faire confiance à l'user )
  // on utlisera l'id du Token de l'user pour renforcer la sécurité du site
  delete thingObject._id;
  delete thingObject.userId;

  // on va créer un nouvel objet "Thing"
  const thing = new Thing({
    ...thingObject, // model d'objet sans les 2 éléments
    userId: req.auth.userId, // on extrait notre id du token de la méthode "auth"
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`, // on reconstitue l'URL en faisant appelle aux "propriétés" de l'objet "req"
  });

  // on enregistre l'objet dans la base avec la méthode "save()"
  thing
    .save()
    .then(() =>
      res.status(201).json({ message: "Objet enregistré comme thing !!!" })
    )
    .catch((error) => res.status(400).json({ error }));
};

// on récupère la logique pour "modifier" un article
exports.modifyThing = (req, res, next) => {
  // méthode updateOne pour modifier avec 2 arguments =>
  // le 1er = _id de comparaison à modifier, le 2ème = la nouvelle version de l'objet avec le même _id
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet modifié !!!" }))
    // error 404 pour dire que l'objet n'est pas trouvé
    .catch((error) => res.status(400).json({ error }));
};

// on récupère la logique pour effacer un article
exports.deleteThing = (req, res, next) => {
  // méthode deleteOne pour supprimer avec l'id qui est pointée
  Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet supprimé !!!" }))
    // error 404 pour dire que l'objet n'est pas trouvé
    .catch((error) => res.status(400).json({ error }));
};

// on récupère la logique pour afficher 1 seul article
exports.getOneThing = (req, res, next) => {
  // route pour accèder à la page de 1 seul produit
  Thing.findOne({ _id: req.params.id })
    .then((thing) => res.status(200).json(thing))
    // error 404 pour dire que l'objet n'est pas trouvé
    .catch((error) => res.status(404).json({ error }));
};

// on récupère la méthode pour afficher touts les articles
exports.getAllThings = (req, res, next) => {
  Thing.find()
    // function "things" récupère toutes les requêtes PUT déposées
    .then((things) => res.status(200).json(things))
    .catch((error) => res.status(400).json({ error }));
};
