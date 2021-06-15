var express             = require('express'),
    router              = express.Router(),
    passport            = require('passport'),
    nodemailer          = require('nodemailer'),
    Artist              = require('../models/artist'),
    Album               = require('../models/album'),
    Song                = require('../models/song'),
    User                = require('../models/user'),
    SubscriptionDetail  = require('../models/subscriptionDetail'),
    Favorite            = require('../models/favorite'),
    Activity            = require('../models/activity');

const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: 'pk1176@outlook.com',
        pass: 'pro3083711'
    }
});


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
            if(req.isAuthenticated()){
                Activity.create({user: req.user._id, date: Date.now(), detail: "view artist: " + searchedArtist}, function(err, newActivity){
                    if(err){
                        console.log(err);
                    }
                    else{
                        res.render('index/artist.ejs',{id, artist: searchedArtist});
                    }
                })
            }
            else{
                res.render('index/artist.ejs',{id, artist: searchedArtist});
            }
        }
    })
    
}); 

router.get('/artist', isManager, function(req, res){
    Artist.find().sort({popularity: -1}).exec(function(err, artist){
        if(err){
            console.log(err);
        }
        else{
            res.render('index/all-artist.ejs',{artist: artist});
        }
    })
})

router.get('/album', isManager, function(req, res){
    Album.find().sort({popularity: -1}).exec(function(err, album){
        if(err){
            console.log(err);
        }
        else{
            res.render('index/all-album.ejs',{album: album});
        }
    })
})

router.get('/song', isManager, function(req, res){
    Song.find().sort({popularity: -1}).exec(function(err, song){
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
                        res.render('index/all-song.ejs',{song: song, fav: fav});
                    }
                })    
            }
            else{
                res.render('index/all-song.ejs',{song: song});
            }
        }
    })
})

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
                        Activity.create({user: req.user._id, date: Date.now(), detail: "view album: " + searchedAlbum}, function(err, newActivity){
                            if(err){
                                console.log(err);
                            }
                            else{
                                res.render('index/album.ejs',{id: artistId,album: searchedAlbum, fav: fav});
                            }
                        })
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
                        Activity.create({user: req.user._id, date: Date.now(), detail: "view song: " + song}, function(err, newActivity){
                            if(err){
                                console.log(err);
                            }
                            else{
                                res.render('index/song.ejs', {song: song, fav: fav});
                            }
                        })
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
                    Activity.create({user: req.user._id, date:Date.now(), detail: "download song: " + song}, function(err, newActivity){
                        if(err){
                            console.log(err);
                        }
                        else{
                        }
                    })
                }
                
            });
        }
    })
})

router.get('/login',function(req, res){
    if(!req.isAuthenticated()){
        res.render('index/login_screen.ejs');
    }
});

router.post('/login', passport.authenticate('local', 
    {
        successRedirect: '/',
        failureRedirect: '/login',
        successFlash: true,
        failureFlash: true,
        successFlash: 'Successfully logged in',
        failureFlash: 'Invalid username or password'
    }), function(req, res){
});

router.get('/logout', function(req, res){
    req.logout();
    req.flash('success', 'Logged out successfully');
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
            let href = "<p><a style='color: #67948D;' href='http://localhost:3000/reset-password/" + user._id + "'>Reset password <a><p>"
            let from = "Waveform <pk1176@outlook.com>"
            console.log(href);
            let mailOptions = {
                from: from,
                to: req.body.username,
                subject: 'Reset your password',
                html: ` <p><h1>Hello.</h1></p>
                        <p>We have recieved your request to reset a password, you can reset your Waveform password by clicking the link below<p>
                ` + href + 
                '<p>If you didn\'t request a password reset, feel free to reset this email and carry on enjoying your musical journey on our site!. It will not affect you in anyway!<p>' +
                '<p>All the best,<p>' +
                '<p>The Waveform Team<p>'
            }
            transporter.sendMail(mailOptions, function(err, info){
                if(err){
                    console.log(err);
                }
                else{
                    req.flash('success', 'We have sent you the link to reset your password through your email.')
                    res.redirect('/reset-password');
                    console.log(info);
                }
            })      
        }
    });
});

router.get('/reset-password/:id', function(req, res){
    res.render('index/confirm_reset_password.ejs', {id: req.params.id});
});

router.post('/reset-password/:id', function(req, res){
    User.findById(req.params.id).exec(function(err, user){
        if(err){
            console.log(err);
        }
        else{
            user.setPassword(req.body.password, function(err){
                if(err){
                    console.log(err);
                }
                else{
                    user.save(function(err){
                        if(err){
                            console.log(err);
                        }
                        else{
                            Activity.create({user: req.params.id, date: Date.now(), detail: "reset password"}, function(err){
                                if(err){
                                    console.log(err);
                                }
                                else{
                                    req.flash('success', 'Successfully reset your password');
                                    res.redirect('/login');
                                }
                            })
                        }
                    })
                    
                }
            });
        }
    })
});

router.get('/register', function(req, res){
    res.render('index/register_screen.ejs');
});

router.post('/register', function(req, res){
    var newUser = new User({username: req.body.username, name: req.body.name, lastName: req.body.lastName, subscribe: false, status: 'user'});
    User.register(newUser, req.body.password, function(err, user){
        if(err) {
            req.flash('error', err.message);
            return res.render('index/register_screen.ejs');
        }
        passport.authenticate('local')(req, res, function(){
            req.flash('success', 'Registered successfully');
            res.redirect('/login');
        });
    });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.flash("error", "You need to sign in first");
    console.log("check");
    res.redirect('/login');
}
function isManager(req, res, next){
    if(req.user){
        if(req.user.status === "manager"){
            res.redirect("/manager");
        }
        else if(req.user.status === "admin"){
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