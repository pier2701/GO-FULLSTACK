// importation du "schema" créé dans mongoose importé du dossier "models"
// car il est réutilisé ici
const Thing = require("../models/thing");

const { json } = require("express");
// on déclare la méthode "fse"
const fse = require("fs-extra");

// on exporte les méthodes créées au sein de chaque "router" dans une nouvelle fonction pour chaque méthode "router"

// on récupère la logique pour "créer" un article
exports.createThing = (req, res, next) => {
  // on va "parsé" l'objet json de "req"
  const thingObject = JSON.parse(req.body.thing);

  // on va supprimer 2 éléments dans cet objet :
  // _id ( car l'id sera généré automatiquement par mongoDB ) et userId ( il ne faut pas faire confiance à l'user )
  // on utlisera l'id du Token de l'user pour renforcer la sécurité du site
  delete thingObject._id;
  delete thingObject._userId;

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
    .then(() => {
      res.status(201).json({ message: "Objet enregistré comme thing !!!" });
    })
    .catch((error) => res.status(400).json({ error }));
};

// on récupère la logique pour "modifier" un article
exports.modifyThing = (req, res, next) => {
  // on passe par la condition ternaire pour voir s'il y a un champ "file" dans notre "req"
  const thingObject = req.file
    ? {
        ...JSON.parse(req.body.thing), // si oui, on parse pour récupèrer l'objet
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`, // on reconstitue l'URL en faisant appelle aux "propriétés" de l'objet "req"
      }
    : { ...req.boody }; // sinon on récupère l'objet directemnt dans le corps de la requête
  // on supprime le userId pour eviter qu'un user créé un objet pour la réattribuer à quelqu'un d'autre
  delete thingObject._userId;

  // on compare l'objet user avec notre BD pour confirmer que l'objet lui appartient bien
  Thing.findOne({ _id: req.params.id })
    .then((thing) => {
      if (thing.userId != req.auth.userId) {
        // si Id est != de l'id du token => erreur 401 "authentificateur"
        res.status(401).json({ message: "Non-autorisé" });
      } else {
        // méthode updateOne pour modifier avec 2 arguments =>
        // le 1er = _id de comparaison à modifier, le 2ème = la nouvelle version de l'objet avec le même _id
        Thing.updateOne(
          { _id: req.params.id },
          { ...thingObject, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Objet modifié !!!" }))
          // error 401 pour dire que l'objet n'est pas trouvé
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => res.status(400).json({ error })); // si l'ojet ne lui appartient pas
};

// on récupère la logique pour effacer un article
exports.deleteThing = (req, res, next) => {
  // on compare le "create-user" et le "delete-user" qui fait la requête
  Thing.findOne({ _id: req.params.id })
    .then((thing) => {
      if (thing.userId != req.auth.userId) {
        // on compare le 'userId' avec celui du token
        // si la comparaison n'es pas bonne => error 401
        res.status(401).json({ message: "Not authorized" });
      } else {
        const filename = thing.imageUrl.split("/images/")[1]; // on récupère le nom du fichier
        fse.unlink(`images/${filename}`, () => {
          // "unlink" permet de supprimer le fichier dans le système de fichier
          // méthode deleteOne pour supprimer avec l'id qui est pointée
          Thing.deleteOne({ _id: req.params.id }) // puis on delete l'objet dans la base de données
            .then(() => {
              res.status(200).json({ message: "Objet supprimé !!!" });
            })
            // error 401 pour dire que l'objet n'est pas trouvé
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

// on récupère la logique pour afficher 1 seul article
exports.getOneThing = (req, res, next) => {
  // route pour accèder à la page de 1 seul produit
  Thing.findOne({ _id: req.params.id })
    .then((thing) => res.status(200).json(thing))
    // error 401 pour dire que l'objet n'est pas trouvé
    .catch((error) => res.status(401).json({ error }));
};

// on récupère la méthode pour afficher touts les articles
exports.getAllThings = (req, res, next) => {
  Thing.find()
    // function "things" récupère toutes les requêtes PUT déposées
    .then((things) => res.status(200).json(things))
    .catch((error) => res.status(400).json({ error }));
};
