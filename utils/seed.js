/*
Importering. 
*/
const Course = require("../models/Product");
const User = require("../models/User");
const Order = require("../models/Order");
const courses = require("../data/products");
const users = require("../data/users");
const orders = require("../data/orders");
const bcrypt = require("bcryptjs");

const seedDatabase = async () => {
  try {
    
/*
Kolla om det finns produkter.
*/
    const courseCount = await Course.countDocuments();
    if (courseCount === 0) {
      console.log("No courses found in database. Seeding initial courses...");

/*
Lägg till produkterna.
*/
      await Course.insertMany(courses);
      console.log("Successfully seeded courses");
    } else {
      console.log(`Database already contains ${courseCount} courses`);
    }

/*
Kolla om det finns användare.
*/
    const userCount = await User.countDocuments();

    if (userCount === 0) {
      console.log("No users found in database. Seeding initial users...");

/*
Hasha lösenord och lägg tillbaka hashen i objektet. 
*/
      const hashedUsers = await Promise.all(
        users.map(async (user) => {
          const hashedPassword = await bcrypt.hash(user.password, 10);
          return { ...user, password: hashedPassword };
        })
      );

/*
Lägg till användarna.
*/
      await User.insertMany(hashedUsers);
      console.log("Successfully seeded users");
    } else {
      console.log(`Database already contains ${userCount} users`);
    }

/*
Kolla om det finns ordrar och lägg till ordrarna. 
*/
    const orderCount = await Order.countDocuments();
    if (orderCount === 0) {
      console.log("No orders found in database. Seeding initial orders...");
      await Order.insertMany(orders);
      console.log("Successfully seeded orders");
    } else {
      console.log(`Database already contains ${orderCount} orders`);
    }

/*
Returnera summering om vad som lades till.
*/
    return {
      coursesAdded: courseCount === 0 ? courses.length : 0,
      usersAdded: userCount === 0 ? users.length : 0,
      ordersAdded: orderCount === 0 ? orders.length : 0,
    };
  } catch (error) {
    console.error("Error seeding database:", error);

/*
kickar vidare felet.
*/
    throw error;
  }
};

const wipeAndReseed = async () => {
  try {
/*
Radera all data från produkterna, användarna och ordrarna.
*/
    await Course.deleteMany({});
    await User.deleteMany({});
    await Order.deleteMany({});

/*
Kör seed-funktionen igen.
*/
    const response = await seedDatabase();

    return response;
  } catch (error) {
    console.error("Error wiping database:", error);
    throw error;
  }
};

/*
Exportera funktionerna. 
*/
module.exports = {
  seedDatabase,
  wipeAndReseed,
};
