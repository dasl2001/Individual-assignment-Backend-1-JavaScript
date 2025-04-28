/*
 Importering av moduler.
*/
const users = require("./users");
const products = require("./products");
const { faker } = require("@faker-js/faker");

/*
Skapar datum.
*/
const generateDates = (completed = false, cancelled = false) => {
  const today = new Date();
  const lastYear = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
  const purchasedAt = faker.date.between({
    from: lastYear,
    to: today,
  });
  let twoWeeksAfterPurchased = new Date(purchasedAt.getTime() + 14 * 24 * 60 * 60 * 1000);
  if (twoWeeksAfterPurchased > today) {
    twoWeeksAfterPurchased = today;
  }
  const completedAt = completed ? faker.date.between({
    from: purchasedAt,
    to: twoWeeksAfterPurchased,
  }) : null; 
  const cancelledAt = cancelled ? faker.date.between({
    from: purchasedAt,
    to: twoWeeksAfterPurchased,
  }) : null;
  return { purchasedAt, completedAt, cancelledAt };
};

/*
Skapar ordrar.
*/
const generateOrders = () => {
  const orders = [
    {
      user: users[0]._id, 
      products: [
        { product: products[0]._id, quantity: 2 }, 
        { product: products[3]._id, quantity: 1 }, 
      ],
      status: "completed",
      paymentMethod: "credit_card",
      paymentStatus: "completed",
      notes: "Order #1 - Tomatoes and Greek Yogurt",
      totalPrice: (2 * products[0].price) + (1 * products[3].price),
      ...generateDates(true),
    },

    {
      user: users[1]._id,
      products: [
        { product: products[1]._id, quantity: 1 }, 
      ],
      status: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      notes: "Order #2 - Bananas",
      totalPrice: 1 * products[1].price,
      ...generateDates(),
    },

    {
      user: users[2]._id,
      products: [
        { product: products[2]._id, quantity: 3 }, 
      ],
      status: "completed",
      paymentMethod: "bank_transfer",
      paymentStatus: "completed",
      notes: "Order #3 - Green Apples",
      totalPrice: 3 * products[2].price,
      ...generateDates(true),
    },

    {
      user: users[3]._id,
      products: [
        { product: products[4]._id, quantity: 1 }, 
        { product: products[0]._id, quantity: 1 }, 
      ],
      status: "completed",
      paymentMethod: "credit_card",
      paymentStatus: "completed",
      notes: "Order #4 - Ground Beef and Tomatoes",
      totalPrice: (1 * products[4].price) + (1 * products[0].price),
      ...generateDates(true),
    },

    {
      user: users[4]._id,
      products: [
        { product: products[3]._id, quantity: 2 }, 
      ],
      status: "cancelled",
      paymentMethod: "credit_card",
      paymentStatus: "failed",
      notes: "Order #5 - Greek Yogurt (cancelled)",
      totalPrice: 2 * products[3].price,
      ...generateDates(false, true),
    },

    {
      user: users[5]._id,
      products: [
        { product: products[2]._id, quantity: 1 }, 
        { product: products[1]._id, quantity: 2 }, 
      ],
      status: "completed",
      paymentMethod: "debit_card",
      paymentStatus: "completed",
      notes: "Order #6 - Green Apples and Bananas",
      totalPrice: (1 * products[2].price) + (2 * products[1].price),
      ...generateDates(true),
    },
  ];


/*
Rundar av totalPrice till 2 decimaler
*/
  orders.forEach(order => {
    order.totalPrice = Number(order.totalPrice.toFixed(2));
  });

  return orders;
};

module.exports = generateOrders();




