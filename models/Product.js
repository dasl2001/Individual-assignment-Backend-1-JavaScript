const mongoose = require("mongoose");

/*
Skapar ett nytt schema för produkter.
*/
const productSchema = new mongoose.Schema({

/*
Produktens titel krävs, och trim tar bort mellanslag i början/slutet. 
*/
  title: { type: String, required: true, trim: true },

/*
Beskrivning av produkten krävs.
*/
  description: { type: String, required: true },

/*
Kategori som produkten tillhör krävs. 
*/
  category: { type: String, required: true },

/*
Pris krävs och får inte vara negativt,
*/
  price: { type: Number, required: true, min: 0 },

/*
Antal produkter i lager krävs.
*/
  stock: { type: Number, required: true },

/*
Lista med taggar valfritt.
*/
  tags: [{ type: String }],

/*
Betyg (från 0 till 5).
*/
  rating: { type: Number, min: 0, max: 5, default: 0 }

/*
timestamps lägger automatiskt till "createdAt" och "updatedAt".
*/
}, { timestamps: true });


/*
Exporterar modellen.
*/
module.exports = mongoose.model("Product", productSchema);

