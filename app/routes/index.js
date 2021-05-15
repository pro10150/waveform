var express             = require('express'),
    router              = express.Router(),
    passport            = require('passport'),
    Artist              = require('../models/artist'),
    Album               = require('../models/album'),
    Song                = require('../models/song'),
    User                = require('../models/user'),
    SubscriptionDetail  = require('../models/subscriptionDetail'),
    Favorite            = require('../models/favorite');

router.get('/', isManager, function(req, res){
    Artist.find({$query: {}}).sort({popularity: -1}).limit(4).exec(function(err, allArtist){
        if(err){
            console.log(err);
        }
        else{
            Album.find({$query: {}}).sort({popularity: -1}).limit(4).exec(function(err, allAlbum){
                if(err){
                    console.log(err);
                }
                else{
                    Song.find({$query: {}}).sort({popularity: -1}).limit(4).exec(function(err, allSong){
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
                                        res.render('index/home.ejs', {artist: allArtist, album: allAlbum, song: allSong, fav: fav});
                                    }
                                })    
                            }
                            else{
                                res.render('index/home.ejs', {artist: allArtist, album: allAlbum, song: allSong});
                            }
                            
                        }
                    })
                }
            })
        }
    })
    
});

router.get('/artist/:artistId', isManager, function(req, res){
    let id = req.params.artistId;
    Artist.findByIdAndUpdate(id, {$inc: {'popularity' : 10}}).populate("albums").exec(function(err, searchedArtist){
        if(err){
            console.log(err);
        }
        else{
            res.render('index/artist.ejs',{id, artist: searchedArtist});
        }
    })
    
}); 

router.get('/album/:albumId', isManager, function(req, res){
    let artistId = req.params.artistId;
    let albumId = req.params.albumId;
    Album.findByIdAndUpdate(albumId,{$inc: {'popularity' : 10}}).populate("songs").exec(function(err, searchedAlbum){
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
                        res.render('index/album.ejs',{id: artistId,album: searchedAlbum, fav: fav});
                    }
                })    
            }
            else{
                res.render('index/album.ejs',{id: artistId,album: searchedAlbum});
            }
        }
    })
    
});

router.get('/song/:songId', isManager, function(req, res){
    let songId = req.params.songId;
    Song.findByIdAndUpdate(songId, {$inc: {'popularity' : 2}}).exec(function(err, song){
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
                        res.render('index/song.ejs', {song: song, fav: fav});
                    }
                })
            }
            else{
                res.render('index/song.ejs', {song: song});
            }
            
        }
    })
});

router.post('/song/:songId/download', isLoggedIn, isPremium, function(req, res){
    let id = req.params.songId;
    Song.findByIdAndUpdate(id, {$inc: {'popularity': 10}}).exec(function(err, song){
        if(err){
            console.log(err);
        }
        else{
            let path = "./public";
            res.download(path + song.audio, (err) => {
                if(err){
                    console.log(err);
                }
                else{
                    // res.redirect(res.get('referer'));
                }
                
            });
        }
    })
})

router.get('/login',function(req, res){
    res.render('index/login_screen.ejs');
});

router.post('/login', passport.authenticate('local', 
    {
        successRedirect: '/',
        failureRedirect: '/login'
    }), function(req, res){
});

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

router.get('/reset-password', function(req, res){
    res.render('index/reset_password.ejs');
})

router.post('/reset-password', function(req, res){
    User.findOne({username: req.body.username}).exec(function(err, user){
        if(err){
            console.log(err);
        }
        else{
            console.log(user);
            user.setPassword(req.body.password, function(err){
                if(err){
                    console.log(err);
                }
                else{
                    res.redirect('/login');
                }
            });
        }
    });
});

router.get('/register', function(req, res){
    res.render('index/register_screen.ejs');
});

router.post('/register', function(req, res){
    var newUser = new User({username: req.body.username, name: req.body.name, lastName: req.body.lastName, subscribe: false, status: 'user'});
    User.register(newUser, req.body.password, function(err, user){
        if(err) {
            console.log(err);
            return res.render('index/register');
        }
        passport.authenticate('local')(req, res, function(){
            res.redirect('/login');
        });
    });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}
function isManager(req, res, next){
    if(req.user){
        if(req.user.status === "manager"){
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
function isPremium(req, res, next){
    if(req.user){
        if(req.user.subscribe !== true){
            res.redirect(res.get('referer'));
        }
        else{
            return next();
        }
    }
}

module.exports = router;