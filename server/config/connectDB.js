const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGOOSE_URI);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Connected to DB");
    });
    connection.on("error", (error) => {
      console.log("Something is wrong in mongodb ", error);
    });
  } catch (error) {
    console.log("something is wrong ", error);
  }
}

module.exports = connectDB
