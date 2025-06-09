const { Router } = require("express");

const controller = require("../controllers/dashboard");
const { auth } = require("../middleware/auth");

const router = new Router();

// page dashboard
router.get("/", auth, controller.getPageDashboard);

// handel delete news
router.get("/deleteNews/:id", auth, controller.deleteNews);

// page add news
router.get("/addNews", auth, controller.getPageAddNews);

// handel add news
router.post("/addNews", auth, controller.handelAddNews);

// page create ad
router.get("/createAd", auth, controller.getPageCreateAd);

// handel create ad
router.post("/createAd", auth, controller.handelcreateAd);

// handel upload file
router.post("/uploadFile", auth, controller.uploadFile);

// page manage ad
router.get("/ad", auth, controller.getPageAd);

// handel delete ad
router.get("/deleteAd/:id", auth, controller.deleteAd);

// page manage bot
router.get("/manageBot", auth, controller.getPageManageBot);

// handel change status bot
router.get("/changeStatusBot/:name", auth, controller.handelChangeStatusBot);

// get page amar
router.get("/amar", auth, controller.getPageAmar)

module.exports = router;
