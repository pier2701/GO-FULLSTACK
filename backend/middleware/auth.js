// on importe la méthode du npm
const jwt = require("jsonwebtoken");
const { request } = require("../app");

// on exporte la méthode du jwt
module.exports = (req, res, next) => {
  // on gère la réponse ( promise ) avec un try/catch
  try {
    // on récupère que le token et on isole l'id avec la méthode "split" qui divisera notre [] au niveau de ' ' ( l'espace )
    const token = req.headers.authorization.split(" ")[1]; // [1] correspond à la 2ème partie qu'on voudra récupèrer

    // on décode le token récupéré avec la méthode "verify" de jwt
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET"); // token récupéré + la clé scrète

    // on récupère notre token décodé dans une constante
    const userId = decodedToken.userId;

    // on rajoute cette valeur à l'objet "req" qui accompagnera toutes les routes
    req.auth = {
      userId: userId,
    };
    //next();
  } catch (error) {
    res.status(401).json({ error });
  }
};

// on doit maintenant importer notre fichier "auth" dans le fichier des routes (stuff.js)
