// on importe "multer"
const multer = require("multer");

// on se créé un dictionnaire pour générer l'extension au fichier
const MIME_TYPES = {
  // on indique les 3 != types
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

// on créé un objet de configuration pour multer avec "diskstorage" pour dire qu'on l'enregistre sur le disque
const storage = multer.diskStorage({
  // 1er élément = destination pour enregistrer les fichiers
  destination: (req, file, callback) => {
    callback(null, "images"); // null = pas d'erreur puis le nom du dossier
  },
  // 2ème élément indique le nom du fichier pour les différencier
  filename: (req, file, callback) => {
    // on génère le nouveau nom
    const name = file.originalname.split(" ").join("_"); // "split" sépare les noms avec des espaces puis "join" avec des _ à la place
    // on créé l'extension du fichier = dico MIME_TYPES
    const extension = MIME_TYPES[file.mimetype]; // on fait correspondre notre dico à l'élément envoyé par le frontend
    // on appelle le callback (null) et en 2ème argument le filename en entier
    callback(null, name + Date.now() + "." + extension); // génère un nom + la date + . + "jpg,jpeg ou png"
  },
});

// on exporte le module
module.exports = multer({ storage }).single("image"); // on exporte la méthode "multer", avec l'objet model "storage" et la méthode "single" pour un fichier unique de type "image"
