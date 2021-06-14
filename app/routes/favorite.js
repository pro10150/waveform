var express             = require('express'),
    router              = express.Router(),
    lodash               = require('lodash');
    Artist              = require('../models/artist'),
    Album               = require('../models/album'),
    Song                = require('../models/song'),
    User                = require('../models/user'),
    SubscriptionDetail  = require('../models/subscriptionDetail'),
    Favorite            = require('../models/favorite'),
    Activity            = require('../models/activity');

router.get('/', isManager, isLoggedIn, function(req, res){
    songIdArray = []
    Favorite.find({id: req.user._id}).sort({viewCount: -1}).exec( function(err, searchedFavorite){
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
                        searchedFavorite.forEach(function(sf){
                            sf._id = sf.songId;
                        });
                        let merged = []

                        // result.forEach(function(aitem){
                        //     searchedFavorite.forEach(function(bitem){
                        //         if(aitem._id === bitem._id){
                        //             lodash.assign(result, searchedFavorite)
                        //         }
                        //     })
                        // })
                        merged = result;
                        // merged = lodash.values(merged);
                        // console.log(merged);
                        if(req.isAuthenticated()){
                            Favorite.find({id: req.user._id}, function(err, fav){
                                if(err){
                                    console.log(err);
                                }
                                else{
                                    res.render('favorite/favorite.ejs',{result: merged, fav: fav});
                                }
                            })    
                        }
                        else{
                            res.render('favorite/favorite.ejs',{result: merged});
                        }
                    }
                })
        }
    })
});

router.post('/', isManager, isLoggedIn, function(req, res){
    res.redirect('/favorite/search/' + req.body.favoriteKeyword);
})

router.get('/search/:keyword', isManager, isLoggedIn, function(req, res){
    let songIdArray = [];
    let keyword = req.params.keyword;
    console.log('yey');
    Favorite.find({id: req.user._id}).exec(function(err, fav){
        if(err){
            console.log(err);
        }
        else{
            fav.forEach(function(sf){
                songIdArray.push(sf.songId)
            })
            Song.find({$and: [{_id: {$in: songIdArray}}, {$or: [{title: {$regex: new RegExp("^" + keyword, "i")}}, {albumName: {$regex: new RegExp("^" + keyword, "i")}}, {artistName: {$regex: new RegExp("^" + keyword, "i")}}]}]}).exec(function(err, result){
                if(err){
                    console.log(err);
                }
                else{
                    res.render('favorite/favorite.ejs', {result: result, fav: fav});
                }
            });
        }
    })
})

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
                    Activity.create({user: req.user._id, date: Date.now(), detail: "add song to favorite: " + addedfavorite}, function(err, newActivity){
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
        }
    })
});

router.post('/:id/:songId', isLoggedIn, isManager, function(req, res){
    Favorite.findOneAndUpdate({id: req.params.id, songId: req.params.songId}, {$inc: {'viewCount' : 1}}).exec(function(err){
        if(err){
            console.log(err);
        }
        else{
            res.redirect('/song/' + req.params.songId);
        }
    })
})

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
                    Activity.create({user: req.user._id, date: Date.now(), detail: "delete song from favorite: " + deletedFavorite}, function(err){
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
        else if(req.user.status === "admin"){
            req.flash('error', "You are not a user. You are not allowed to go to the user side. Please login with different user")
            res.redirect("/admin");
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