const moment = require("jalali-moment");
const multer = require("multer");

const News = require("../models/news");
const Ad = require("../models/ad");
const Bot = require("../models/bot");
const userData = require("../models/userData")

exports.getPageDashboard = async (req, res) => {
  const news = await News.find().sort({ createAt: -1 }).limit(20);

  formatDate = (date) => {
    return moment(date).locale("fa").format("D MMM YYYY");
  };
  res.render("admin/dashboard", { news, formatDate });
};

exports.deleteNews = async (req, res) => {
  await News.findByIdAndDelete(req.params.id);
  res.redirect("back");
};

exports.getPageAddNews = (req, res) => {
  let msg = req.flash("msg");
  res.render("admin/createNews", { msg });
};

exports.handelAddNews = async (req, res) => {
  await News.create({
    createAt: new Date(),
    img: req.body.img,
    manbagName: req.body.manbag,
    manbagIcon: req.body.manbag,
    title: req.body.title,
    urlNews: req.body.urlNews,
  });

  req.flash("msg", "خبر اضافه شد");
  res.redirect("back");
};

exports.getPageCreateAd = (req, res) => {
  res.render("admin/createAd", { msg: "" });
};

exports.uploadFile = async (req, res) => {
  let fileName = null;

  const uplaod = multer({
    dest: "./uploads",
    fileFilter: (req, file, cb) => {
      cb(null, true);
    },
    storage: multer.diskStorage({
      filename: (req, file, cb) => {
        fileName = `${Date.now()}_${file.originalname}`;
        cb(null, fileName);
      },
      destination: (req, file, cb) => {
        cb(null, "./public/uploads");
      },
    }),
  }).single("file");

  uplaod(req, res, (err) => {
    if (err) console.log(err);
    else res.status(201).json({ status: 201, result: fileName });
  });
};

exports.handelcreateAd = async (req, res) => {
  console.log(req.body);

  await Ad.create({
    createAt: new Date(),
    img: req.body.img,
    url: req.body.url,
  });

  res.status(201).json({ status: 201 });
};

exports.getPageAd = async (req, res) => {
  const ads = await Ad.find().sort({ createAt: -1 });

  formatDate = (date) => {
    return moment(date).locale("fa").format("D MMM YYYY");
  };
  res.render("admin/mangeAd", { ads, formatDate });
};

exports.deleteAd = async (req, res) => {
  await Ad.findByIdAndDelete(req.params.id);
  res.redirect("back");
};

exports.getPageManageBot = async (req, res) => {
  let bots = await Bot.find();

  formatDate = (date) => {
    return moment(date).locale("fa").format("D MMM YYYY");
  };
  console.log(bots[0])
  res.render("admin/mangeBot", { bots, formatDate });
};

exports.handelChangeStatusBot = async (req, res) => {
  let bots = await Bot.find();
  bots = bots[0];

  bots[req.params.name] = bots[req.params.name] ? false : true;
  await Bot.findByIdAndUpdate(bots._id, bots);

  res.redirect("back");
};

exports.getPageAmar = async (req, res) => {
  const today = new Date();
  const tenDaysAgo = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 10
  );
  const visites = await userData.find({
    date: {
      $gte: tenDaysAgo,
      $lt: today,
    },
  });
  let ipTow = [];
  let views = [];
  let itemView = [];
  for (let i = 0; i < 10; i++) {
    itemView = [
      ...visites.filter((item) => {
        if (!ipTow.includes(item.ip)) {
          if (
            item.date.getDate() == today.getDate() - i &&
            item.date.getMonth() == today.getMonth() &&
            item.date.getFullYear() == today.getFullYear()
          ) {
            ipTow.push(item.ip);
            return item;
          }
        }
      }),
    ];
    views.push(itemView.length);
    ipTow = [];
  }

  res.render("admin/amar", {
    views,
  });
};
