const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

/*
Skapar ett nytt schema för användare.
*/
const userSchema = new mongoose.Schema({

/*
Förnamn krävs och trim tar bort onödiga mellanslag. 
*/
  firstName: { type: String, required: true, trim: true },

/*
Efternamn krävs och trim tar bort onödiga mellanslag. 
*/
  lastName: { type: String, required: true, trim: true },

/*
E-post krävs, omvandlas till små bokstäver och trimmar.
*/
  email: { type: String, required: true, trim: true, lowercase: true },

/*
Lösenord krävs.
*/
  password: { type: String, required: true },

/*
Användarroll endast "user" eller "admin" tillåts, standard är "user".
*/
  role: {
    type: String,
    enum: ["user", "admin"], 
    default: "user",
  },

/*
Datum för senaste inloggning valfritt.
*/
  lastLogin: { type: Date }

/*
Timestamps lägger till fälten createdAt och updatedAt automatiskt. 
*/
}, { timestamps: true });


/*
Hook innan användare sparas krypterar lösenordet om det ändrats. 
*/
userSchema.pre("save", async function (next) {

/*
Hoppa om lösenord inte ändrats.
*/
  if (!this.isModified("password")) return next();

/*
Hashar lösenordet. 
*/
  this.password = await bcrypt.hash(this.password, 10);

/*
Fortsätt till nästa steg. 
*/
  next();
});


/*
Exporterar modullen. 
*/
module.exports = mongoose.model("User", userSchema);



