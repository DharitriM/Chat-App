const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/connectDB");
const router = require("./routes/index");
const cookiesParser = require("cookie-parser");


const app = express();
// Function to dynamically determine frontend URL from request headers
const getFrontendURL = (req) => {
  const referer = req.headers.referer || req.headers.origin;
  if (referer) {
    const url = new URL(referer);
    return `${url.protocol}//${url.hostname}:${url.port || 80}`;
  }
  return process.env.FRONTEND_URL || "http://localhost:3000"; // Fallback URL if no headers are present
};
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL,
//     credentials: true,
//   })
// );

// CORS middleware with dynamic origin handling
app.use((req, res, next) => {
  const origin = getFrontendURL(req);
  cors({
    origin: origin,
    credentials: true,
  })(req, res, next);
});
app.use(express.json());
app.use(cookiesParser());

const PORT = process.env.PORT || 8080;

app.get("/", (request, response) => {
  response.json({
    message: "server running at: " + PORT,
  });
});

// api endpoints
app.use("/api", router);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("server running at: " + PORT);
  });
});
