var express             = require('express'),
    router              = express.Router(),
    Artist              = require('../models/artist'),
    Album               = require('../models/album'),
    Song                = require('../models/song'),
    User                = require('../models/user'),
    SubscriptionDetail  = require('../models/subscriptionDetail'),
    Favorite            = require('../models/favorite');

router.get('/', isLoggedIn, function(req, res){
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

router.post('/:id/:songId/add', function(req, res){
    Favorite.create({id: req.params.id,songId: req.params.songId}, function(err, addedfavorite){
        if(err){
            console.log(err);
        }
        else{
            Song.findByIdAndUpdate(req.params.songId, {$inc: {popularity: 100}}, function(err, song){
                if(err){
                    console.log(err);
                }
                else{
                }
            })
        }
    })
});

router.post('/:id/:songId/delete', function(req, res){
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
                }
            })
        }
    })
})

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;