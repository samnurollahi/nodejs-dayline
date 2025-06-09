const axios = require("axios");
const { JSDOM } = require("jsdom");

const News = require("../models/news");
const Bot = require("../models/bot")

console.log("run robot");

async function getHamShahri() {
  let nameNews = await News.findOne({manbagName: "همشهری"}).sort({createAt: -1}) ?? {}
  let limit = false;

  if(!nameNews.title) {
    nameNews = "تصاویری از تاکسی‌های فرودگاه مهرآباد در ۵۰ سال پیش"
  }else {
    nameNews = nameNews.title
  }


  axios
    .get("https://www.hamshahrionline.ir/archive")
    .then((result) => {
      const dom = new JSDOM(result.data);
      const doc = dom.window.document;

      let news = doc.querySelectorAll(".news");
      news = Array.from(news);
      news.forEach(async (item) => {
        let newsObj = {};
        newsObj.img = item.querySelector("img").src;
        newsObj.urlNews = `https://www.hamshahrionline.ir${item.querySelector("a").href}`;
        newsObj.title = item.querySelector("h3 a").textContent;
        newsObj.manbagName = "همشهری";
        newsObj.manbagIcon = "hamshahri";
        newsObj.createAt = new Date();

        if (newsObj.title == nameNews) {
          limit = true;
        } else if (limit) {
          return ;
        } else {
          console.log(newsObj.title);
          await News.create(newsObj);
        }
      });
    })
    .catch((err) => {
      console.log(err);
    })
}

async function getIrna() {
  let nameNews = await News.findOne({manbagName: "ایرنا"}).sort({createAt: -1}) ?? {}
  let limit = false;

  if(!nameNews.title) {
    nameNews = "تصاویری از تاکسی‌های فرودگاه مهرآباد در ۵۰ سال پیش"
  }else {
    nameNews = nameNews.title
  }

  axios
    .get("https://www.irna.ir/archive")
    .then((result) => {
      const dom = new JSDOM(result.data);
      const doc = dom.window.document;
      let news = doc.querySelectorAll(".news");

      news = Array.from(news);

      news.forEach(async (item) => {
        let newsObj = {};
        newsObj.img = item.querySelector("img").src;
        newsObj.urlNews = `https://www.irna.ir${item.querySelector("a").href}`;
        newsObj.title = item.querySelector("h3 a").textContent;
        newsObj.manbagName = "ایرنا";
        newsObj.manbagIcon = "irna";
        newsObj.createAt = new Date();

        if (newsObj.title == nameNews) {
          limit = true;
        } else if (limit) {
          return ;
        } else {
          console.log(newsObj.title);
          await News.create(newsObj);
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

async function getIsna() {
  let nameNews = await News.findOne({manbagName: "ایسنا"}).sort({createAt: -1}) ?? {}
  let limit = false;

  if(!nameNews.title) {
    nameNews = "تصاویری از تاکسی‌های فرودگاه مهرآباد در ۵۰ سال پیش"
  }else {
    nameNews = nameNews.title
  }

  axios
    .get("https://www.isna.ir/page/archive.xhtml")
    .then((result) => {
      const dom = new JSDOM(result.data);
      const doc = dom.window.document;
      let news = doc.querySelectorAll(".received");

      news = Array.from(news);

      news.forEach(async (item) => {
        let newsObj = {};
        newsObj.img = item.querySelector("img").src;
        newsObj.urlNews =  `https://www.isna.ir${item.querySelector("a").href}`;
        newsObj.title = item.querySelector("h3 a").textContent;
        newsObj.manbagName = "ایسنا";
        newsObj.manbagIcon = "isna";
        newsObj.createAt = new Date();

        if (newsObj.title == nameNews) {
          limit = true;
        } else if (limit) {
          return true;
        } else {
          console.log(newsObj.title);
          await News.create(newsObj);
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

async function getMashregh() {
  let nameNews = await News.findOne({manbagName: "مشرق"}).sort({createAt: -1}) ?? {}
  let limit = false;

  if(!nameNews.title) {
    nameNews = "تصاویری از تاکسی‌های فرودگاه مهرآباد در ۵۰ سال پیش"
  }else {
    nameNews = nameNews.title
  }

  axios
    .get(
      "https://www.mashreghnews.ir/archive/pl/40/%D8%A7%D8%AE%D8%A8%D8%A7%D8%B1-%D9%88%DB%8C%DA%98%D9%87"
    )
    .then((result) => {
      const dom = new JSDOM(result.data);
      const doc = dom.window.document;
      let news = doc.querySelectorAll(".news");

      news = Array.from(news);

      news.forEach(async (item) => {
        let newsObj = {};
        newsObj.img = item.querySelector("img").src;
        newsObj.urlNews =  `https://www.mashreghnews.ir${item.querySelector("a").href}`;
        newsObj.title = item.querySelector("h3 a").textContent;
        newsObj.manbagName = "مشرق";
        newsObj.manbagIcon = "mashregh";
        newsObj.createAt = new Date();

        if (newsObj.title == nameNews) {
          limit = true;
        } else if (limit) {
          return true;
        } else {
          console.log(newsObj.title);
          await News.create(newsObj);
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

async function getKabarOnline() {
  let nameNews = await News.findOne({manbagName: "خبر انلاین"}).sort({createAt: -1}) ?? {}
  let limit = false;

  if(!nameNews.title) {
    nameNews = "تصاویری از تاکسی‌های فرودگاه مهرآباد در ۵۰ سال پیش"
  }else {
    nameNews = nameNews.title
  }

  axios
    .get(
      "https://www.khabaronline.ir/archive"
    )
    .then((result) => {
      const dom = new JSDOM(result.data);
      const doc = dom.window.document;
      let news = doc.querySelectorAll(".News");

      news = Array.from(news);

      news.forEach(async (item) => {
        let newsObj = {};
        newsObj.img = item.querySelector("img").src;
        newsObj.urlNews =  `https://www.khabaronline.ir${item.querySelector("a").href}`;
        newsObj.title = item.querySelector("h3 a").textContent;
        newsObj.manbagName = "خبر انلاین";
        newsObj.manbagIcon = "kabaronline";
        newsObj.createAt = new Date();

        if (newsObj.title == nameNews) {
          limit = true;
        } else if (limit) {
          return true;
        } else {
          console.log(newsObj.title);
          await News.create(newsObj);
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

setInterval(async () => {
  let bot = await Bot.find()
  bot = bot[0]
  if(bot.hamShahri) {
    getHamShahri()
  }
  if(bot.irna) {
    getIrna()
  }
  if(bot.isna) {
    getIsna()
  }
  if(bot.mashregh) {
    getMashregh()
  }
  if(bot.khabarOnline) {
    getKabarOnline()
  }
}, 1_800_000)
