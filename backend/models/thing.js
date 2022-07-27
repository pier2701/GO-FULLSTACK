// importer le module mongoose qui va créer un model "schema" pour structurer notre doc/schema
const mongoose = require("mongoose");

// contruction du "schema" pour notre model réutilisable
const thingSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  price: { type: Number, required: true },
});

// on exporte le model pour l'utliser, 1er argument 'Thing' (nom du model), 2ème argument thingSchema (model/schema)
module.exports = mongoose.model("Thing", thingSchema);
