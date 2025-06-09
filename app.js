const path = require("path");

// const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const flash = require("connect-flash");
// const cors = require("cors")
const moment = require("jalali-moment")

const News = require("./models/news");
const passport = require("passport");
const Ad = require("./models/ad");
const UserData = require("./models/userData");

// config env
// dotenv.config({ path: "./config/config.env" });

const app = express();

// midd
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(flash());
// app.use(cors())

// config morgan
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

// connect db
require("./config/db");

// config passport
require("./config/passport");

// ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// config sesion
app.use(
  session({
    secret: process.env.SESSION,
    resave: false,
    saveUninitialized: false,
  })
);

// passport
app.use(passport.initialize());
app.use(passport.session());

// routes
app.get("/", async (req, res) => {
  const news = await News.find().sort({ createAt: -1 }).limit(20);
  const ad = await Ad.find();
  const bannerOne = ad[Math.floor(Math.random() * (ad.length - 1))] ?? false
  const bannerTow = ad[Math.floor(Math.random() * (ad.length - 1))] ?? false

  formatDate = (date) => {
    return moment(date).locale("fa").format("D MMM YYYY");
  };

  res.render("index.ejs", { news, bannerOne, bannerTow, formatDate });
});
app.post("/getNews", async (req, res) => {
  let page = req.body.page;

  const news = await News.find()
    .sort({ createAt: -1 })
    .skip(page * 21)
    .limit(20);
  const ad = await Ad.find();
  const bannerOne = ad[Math.floor(Math.random() * (ad.length - 1))];

  res.status(200).json({ status: 200, result: news, bannerOne });
});
app.get("/login", async (req, res, next) => {
  res.render("login.ejs");
});
app.post("/login", async (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/",
  })(req, res, next);
});
app.post("/userData", async (req, res) => {
  await UserData.create({
    ip: req.ip,
    date: new Date(),
  });

  res.status(201).send();
});
app.use("/dashboard", require("./routes/dashboard"));

app.listen(process.env.PORT, (err) => {
  if (err) console.log(err);
  else {
    console.log("start in port", process.env.PORT);
    // run robot
    require("./robot/robot");
  }
});
