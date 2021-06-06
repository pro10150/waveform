var express             = require('express'),
    router              = express.Router(),
    Artist              = require('../models/artist'),
    Album               = require('../models/album'),
    Song                = require('../models/song'),
    User                = require('../models/user'),
    SubscriptionDetail  = require('../models/subscriptionDetail'),
    Favorite            = require('../models/favorite');

router.get('/', isManager, isLoggedIn, function(req, res){
    songIdArray = []
    Favorite.find({id: req.user._id}, function(err, searchedFavorite){
        if(err){
            console.log(err);
        }
        else{
            searchedFavorite.forEach(function(sf){
                songIdArray.push(sf.songId)
            })
            console.log(songIdArray)
                Song.find({_id: {$in: songIdArray}}).exec(function(err, result){
                    if(err){
                        console.log(err);
                    }
                    else{
                        if(req.isAuthenticated()){
                            Favorite.find({id: req.user._id}, function(err, fav){
                                if(err){
                                    console.log(err);
                                }
                                else{
                                    res.render('favorite/favorite.ejs',{result, fav: fav});
                                }
                            })    
                        }
                        else{
                            res.render('favorite/favorite.ejs',{result});
                        }
                    }
                })
        }
    })
});

router.post('/:id/:songId/add', isLoggedIn, isManager, function(req, res){
    Favorite.create({id: req.params.id,songId: req.params.songId}, function(err, addedfavorite){
        if(err){
            console.log(err);
        }
        else{
            Song.findByIdAndUpdate(req.params.songId, {$inc: {popularity: 5}}, function(err, song){
                if(err){
                    console.log(err);
                }
                else{
                    req.flash('success', "Successfully added this song favorite list");
                    res.redirect(req.get('referer'));
                }
            })
        }
    })
});

router.post('/:id/:songId/delete', isLoggedIn, function(req, res){
    Favorite.findOneAndDelete({id:req.params.id, songId: req.params.songId}, function(err, deletedFavorite){
        if(err){
            console.log(err);
        }
        else{
            Song.findByIdAndUpdate(req.params.songId, {$inc: {popularity: -100}}, function(err, song){
                if(err){
                    console.log(err);
                }
                else{
                    req.flash('success', "Successfully removed this song from favorite list!");
                    res.redirect(req.get('referer'));
                }
            })
        }
    })
})

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'You need to log in first');
    res.redirect('/login');
}
function isManager(req, res, next){
    if(req.user){
        if(req.user.status === "manager"){
            req.flash('error', "You are not a user. You are not allowed to go to the user side. Please login with different user")
            res.redirect("/manager");
        }
        else{
            return next();
        }
    }
    else{
        return next();
    }
}


module.exports = router;