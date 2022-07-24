// importation du "schema" créé dans mongoose importé du dossier "models"
// car il est réutilisé ici
const Thing = require('../models/thing');

// on exporte les méthodes créées au sein de chaque "router" dans une nouvelle fonction pour chaque méthode "router"

// on récupère la logique pour "créer" un article
exports.createThing = (req, res, next) => {
    
    // supprime l'id du champ de formulaire de la requête ( pas bon ) mongoDB va en générer automatiquement un autre 
    delete req.body._id;
    
    // on déclare le "schema" pour récuperer la valeur de chaque champ
    const thing = new Thing({
    
        // "..." copie les "champs" du corps de la requête
    ...req.body
    });
    // on enregistre l'objet dans la base avec la méthode "save()"
    thing.save()
.then(()=> res.status(201).json({message: 'Objet enregistré comme thing !!!'}))
.catch(error => res.status(400).json({error}))
}

// on récupère la logique pour "modifier" un article
exports.modifyThing = (req, res, next) => {
    // méthode updateOne pour modifier avec 2 arguments ( le 1er = _id de comparaison à modifier, le 2ème = la nouvelle version de l'objet avec le même _id )
    Thing.updateOne({ _id: req.params.id },{...req.body,_id: req.params.id })
    .then(() => res.status(200).json({message:'Objet modifié !!!'}))
    // error 404 pour dire que l'objet n'est pas trouvé
    .catch(error => res.status(400).json({ error }));
}

// on récupère la logique pour effacer un article
exports.deleteThing = (req, res, next) => {
    // méthode deleteOne pour supprimer avec l'id qui est pointée
    Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({message:'Objet supprimé !!!'}))
    // error 404 pour dire que l'objet n'est pas trouvé
    .catch(error => res.status(400).json({ error }));
}

// on récupère la logique pour afficher 1 seul article
exports.getOneThing = (req, res, next) => {
    // route pour accèder à la page de 1 seul produit
    Thing.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    // error 404 pour dire que l'objet n'est pas trouvé
    .catch(error => res.status(404).json({ error }));
}

// on récupère la méthode pour afficher touts les articles
exports.getAllThings = (req, res, next) => {
    Thing.find()
    // function "things" récupère toutes les requêtes PUT déposées
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
}