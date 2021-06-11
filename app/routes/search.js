var express             = require('express'),
    router              = express.Router(),
    Artist              = require('../models/artist'),
    Album               = require('../models/album'),
    Song                = require('../models/song'),
    User                = require('../models/user'),
    SubscriptionDetail  = require('../models/subscriptionDetail'),
    Favorite            = require('../models/favorite'),
    Activity            = require('../models/activity');

router.post('/', function(req, res){
    res.redirect('/search/' + req.body.keyword);
})

router.get('/:keyword', function(req,res){
    let keyword = req.params.keyword;
    Artist.find({name: { $regex : new RegExp("^" + keyword, "i")}}).sort({popularity: -1}).limit(4).exec(function(err, searchedArtist){
        if(err){
            console.log(err);
        }
        else{
            Album.find({name: {$regex: new RegExp("^" + keyword, "i")}}).sort({popularity: -1}).limit(4).exec(function(err, searchedAlbum){
                if(err){
                    console.log(err);
                }
                else{
                    Song.find({title: {$regex: new RegExp("^" + keyword, "i")}}).sort({popularity: -1}).limit(5).exec(function(err, searchedSong){
                        if(err){
                            console.log(err);
                        }
                        else{
                            let topResult = [];
                            let top = [];
                            if(searchedArtist[0]){
                                topResult.push(searchedArtist[0]);
                            }
                            if(searchedAlbum[0]){
                                topResult.push(searchedAlbum[0]);
                            }
                            if(searchedSong[0]){
                                topResult.push(searchedSong[0]);
                            }
                            
                            if(topResult.length > 1){
                                if(topResult.length === 2){
                                    if(topResult[0].popularity > topResult[1].popularity){
                                        top = topResult[0];
                                    }
                                    else{
                                        top = topResult[1];
                                    }
                                }
                                else{
                                    if(topResult[0].popularity > topResult[1].popularity){
                                        if(topResult[0].popularity > topResult[2].popularity){
                                            top = topResult[0];
                                        }
                                        else{
                                            top = topResult[2];
                                        }
                                    }
                                    else{
                                        if(topResult[1].popularity > topResult[2].popularity){
                                            top = topResult[1];
                                        }
                                        else{
                                            top = topResult[2];
                                        }
                                    }
                                }
                            }
                            else{
                                if(topResult.length === 1){
                                    top = topResult[0];
                                }
                            }
                            if(req.isAuthenticated()){
                                Favorite.find({id: req.user._id}, function(err, fav){
                                    if(err){
                                        console.log(err);
                                    }
                                    else{
                                        Activity.create({user: req.user._id, date: Date.now(), detail: "search: " + keyword}, function(err){
                                            if(err){
                                                console.log(err);
                                            }
                                            else{
                                                res.render('search/search.ejs',{keyword,topResult: top,topSong: searchedSong,topAlbum: searchedAlbum,topArtist: searchedArtist, fav: fav});
                                            }
                                        })
                                    }
                                })    
                            }
                            else{
                                res.render('search/search.ejs',{keyword,topResult: top,topSong: searchedSong,topAlbum: searchedAlbum,topArtist: searchedArtist});
                            }
                        }
                    })
                }
            })
        }
        
    })
});

router.get('/:searchKeyword/song', function(req, res){
    let keyword = req.params.searchKeyword;
    Song.find({title: {$regex: new RegExp("^" + keyword, "i")}}).sort({popularity: -1}). exec(function(err, topSong){
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
                        Activity.create({user: req.user._id, date: Date.now(), detail: "view searched song: " + keyword}, function(err){
                            if(err){
                                console.log(err);
                            }
                            else{
                                res.render('search/song.ejs',{keyword,topSong, fav: fav});
                            }
                        })
                    }
                })    
            }
            else{
                res.render('search/song.ejs',{keyword,topSong});
            }
            
        }
    })
    
});

router.get('/:searchKeyword/artist', function(req, res){
    let keyword = req.params.searchKeyword;
    Artist.find({name: {$regex: new RegExp("^" + keyword, "i")}}).sort({popularity: -1}). exec(function(err, topArtist){
        if(err){
            console.log(err);
        }
        else{
            if(req.isAuthenticated()){
                Activity.create({user: req.user._id, date: Date.now(), detail: "view searched artist: " + keyword}, function(err){
                    if(err){
                        console.log(err);
                    }
                    else{
                        res.render('search/artist.ejs',{keyword,topArtist});
                    }
                })
            }
            else{
                res.render('search/artist.ejs',{keyword,topArtist});
            }
        }
    });
    
});

router.get('/:searchKeyword/album', function(req, res){
    let keyword = req.params.searchKeyword;
    Album.find({name: {$regex: new RegExp("^" + keyword, "i")}}).sort({popularity: -1}). exec(function(err, topAlbum){
        if(err){
            console.log(err);
        }
        else{
            if(req.isAuthenticated()){
                Activity.create({user: req.user._id, date: Date.now(), detail: "view searched album: " + keyword}, function(err){
                    if(err){
                        console.log(err);
                    }
                    else{
                        res.render('search/album.ejs',{keyword,topAlbum});
                    }
                })
            }
            else{
                res.render('search/album.ejs',{keyword,topAlbum});
            }
        }
    });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;
