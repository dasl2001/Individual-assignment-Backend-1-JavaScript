const mongoose = require("mongoose");

/*
Definierar ett nytt schema för Order.
*/
const orderSchema = new mongoose.Schema({

/*
Referens till den användare som gjort beställningen.
*/
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

/*
En lista med produkter i ordern, varje med produkt-id och antal.
*/
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 }
    }
  ],

/*
Total summa att betala för hela ordern.
*/
  totalPrice: { type: Number, required: true },

/*
Orderstatus: pågående, klar eller avbruten.
*/
  status: { type: String, enum: ["pending", "completed", "cancelled"], default: "pending" },

/*
Betalningsmetod.
*/
  paymentMethod: { type: String, required: true },

/*
Status på betalningen.
*/
  paymentStatus: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },

/*
När ordern gjordes.
*/
  purchasedAt: { type: Date, default: Date.now },

/*
När ordern slutfördes.
*/
  completedAt: { type: Date },

/*
När ordern avbröts.
*/
  cancelledAt: { type: Date },

/*
Anteckningar. 
*/
  notes: { type: String, trim: true }
});


/*
Middleware körs innan ordern sparas.
Om status ändras till completed sätt completedAt.
Om status ändras till cancelled sätt cancelledAt.
*/
orderSchema.pre("save", function (next) {
  if (this.isModified("status")) {
    if (this.status === "completed") this.completedAt = Date.now();
    else if (this.status === "cancelled") this.cancelledAt = Date.now();
  }

/*
Spara
*/
  next();
});


/*
Exporterar modullen
*/
module.exports = mongoose.model("Order", orderSchema);

