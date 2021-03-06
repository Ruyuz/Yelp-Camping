var Campground = require("../modules/campground");
var Comment = require("../modules/comment");
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                req.flash("error", "Campground not found");
                res.redirect("back");
            } else {
                //does user own the campground?
                //we do not use === here because foundCampground.author.id is an object, res.user._id is a String
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "You are not allowed to do that!");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You have to loggin first!");
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next){
    console.log(req.isAuthenticated());
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            } else {
                //does user own the comment?
                //we do not use === here because foundComment.author.id is an object, res.user._id is a String
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "You are not allowed to do that!");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You have to loggin first!");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()){
        next();
    } else {
        req.flash("error", "Please Login First!");
        res.redirect("/login");
    }
};

module.exports = middlewareObj;