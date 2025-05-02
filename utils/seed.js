const Course = require("../models/Product");
const User = require("../models/User");
const Order = require("../models/Order");
const courses = require("../data/products");
const users = require("../data/users");
const orders = require("../data/orders");
const bcrypt = require("bcryptjs");
const seedDatabase = async () => {
  try {
    const courseCount = await Course.countDocuments();
    if (courseCount === 0) {
      console.log("No courses found in database. Seeding initial courses...");
      await Course.insertMany(courses);
      console.log("Successfully seeded courses");
    } else {
      console.log(`Database already contains ${courseCount} courses`);
    }
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log("No users found in database. Seeding initial users...");
      const hashedUsers = await Promise.all(
        users.map(async (user) => {
          const hashedPassword = await bcrypt.hash(user.password, 10);
          return { ...user, password: hashedPassword };
        })
      );
      await User.insertMany(hashedUsers);
      console.log("Successfully seeded users");
    } else {
      console.log(`Database already contains ${userCount} users`);
    }
    const orderCount = await Order.countDocuments();
    if (orderCount === 0) {
      console.log("No orders found in database. Seeding initial orders...");
      await Order.insertMany(orders);
      console.log("Successfully seeded orders");
    } else {
      console.log(`Database already contains ${orderCount} orders`);
    }
    return {
      coursesAdded: courseCount === 0 ? courses.length : 0,
      usersAdded: userCount === 0 ? users.length : 0,
      ordersAdded: orderCount === 0 ? orders.length : 0,
    };
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
};
const wipeAndReseed = async () => {
  try {
    await Course.deleteMany({});
    await User.deleteMany({});
    await Order.deleteMany({});
    const response = await seedDatabase();
    return response;
  } catch (error) {
    console.error("Error wiping database:", error);
    throw error;
  }
};
module.exports = {
  seedDatabase,
  wipeAndReseed,
};
