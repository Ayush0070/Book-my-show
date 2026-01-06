const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");

const buildPath = path.join(__dirname, "../client/dist");
app.use(express.static(buildPath));

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

require("dotenv").config();
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
app.use(helmet());
// app.use({ contentSecurityPolicy: false });

const connectDB = require("./config/db");
const userRouter = require("./routes/userRoutes");
const loginRouter = require("./routes/loginRoutes");
const movieRouter = require("./routes/movieRoutes");
const theatreRouter = require("./routes/theatreRoutes");
const showRouter = require("./routes/showRoutes");
const bookingRouter = require("./routes/bookingRoutes");

connectDB();
app.use(express.json());
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes",
});
app.use("/api", apiLimiter);

app.use("/api/users", userRouter);
app.use("/api/users", loginRouter);
app.use("/api/movies", movieRouter);
app.use("/api/theatres", theatreRouter);
app.use("/api/shows", showRouter);
app.use("/api/bookings", bookingRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
