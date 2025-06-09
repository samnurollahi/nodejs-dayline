exports.auth = (req, res, next) => {
    if(req.isAuthenticated()) {
        next()
    }else {
        res.redirect("/")
    }
}