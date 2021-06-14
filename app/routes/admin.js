var express             = require('express'),
    router              = express.Router(),
    passport            = require('passport'),
    multer              = require('multer'),
    path                = require('path'),
    coverStorage        = multer.diskStorage({
        destination: function(req, file, callback){
            callback(null,'./public/uploads/covers/');
        },
        filename: function(req, file, callback){
            callback(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
        }
    }),
    imageFilter         = function(req, file, callback){
        if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)){
            return callback(new Error('Only JPG, JPEG, PNG and GIF image files allowed!'), false);
        }
        callback(null, true);
    },
    audioStorage        = multer.diskStorage({
        destination: function(req, fule, callback){
            callback(null, './public/uploads/audios/');
        },
        filename: function(req, file, callback){
            callback(null, file.originalname + "-" + Date.now() + path.extname(file.originalname));
        }
    }),
    audioFilter         = function(req, file, callback){
        if(!file.originalname.match(/\.(m4a|flac|mp3|mp4|wav|wma|aac|aif|aiff)$/i)){
            return callback(new Error('Only M4A, FLAC, MP3, MP4, WAV, WMA, AAC, AIFF audio files allowed!'), false);
        }
        callback(null, true);
    },
    uploads             = multer({storage: coverStorage, fileFilter: imageFilter}),
    audioUploads        = multer({storage: audioStorage, fileFilter: audioFilter}),
    Grid                = require('gridfs-stream');
    fs                  = require('fs');
    Artist              = require('../models/artist'),
    Album               = require('../models/album'),
    Song                = require('../models/song'),
    User                = require('../models/user'),
    SubscriptionDetail  = require('../models/subscriptionDetail'),
    Favorite            = require('../models/favorite');

router.get('/',isLoggedIn, isUser, function(req, res){
    res.render('admin/home.ejs');
});
router.get('/music',isLoggedIn, isUser, function(req, res){
    Artist.find(function(err, managedArtist){
        if(err){
            console.log(err);
        }
        else{
            res.render('admin/music.ejs', {artists: managedArtist});
        }
    })
});
router.post('/music', isLoggedIn, isUser, function(req, res){
    res.redirect('/admin/music/search/' + req.body.artistKeyword);
})
router.get('/music/search/:keyword', isLoggedIn, isUser, function(req, res){
    let keyword = req.params.keyword;
    Artist.find({name: { $regex : new RegExp("^" + keyword, "i")}}).sort({popularity: -1}).exec(function(err, artist){
        if(err){
            console.log(err);
        }
        else{
            res.render('admin/music.ejs', {artists: artist})
        }
    })
})
router.get('/music/artist/:id', isLoggedIn, isUser, function(req, res){
    let artistId = req.params.id;
    Artist.find({_id: artistId}).populate('albums').exec(function(err, searchedArtist){
        if(err){
            console.log(err);
        }
        else{
            User.findById(searchedArtist[0].manager).exec(function(err,user){
                if(err){
                    console.log(err);
                }
                else{
                    console.log(user);
                    res.render('admin/artist.ejs', {artist: searchedArtist, user: user});
                }
            })
        }
    })
})
router.get('/music/artist/:id/edit', isLoggedIn, isUser, function(req, res){
    let id = req.params.id;
    Artist.find({_id: id}, function(err, searchedArtist){
        if(err){
            console.log(err);
        }
        else{
            res.render('admin/artist_edit.ejs',{artist: searchedArtist});
        }
    });
})
router.post('/music/artist/:id/edit', isLoggedIn, isUser, uploads.single('cover'), function(req, res){
    let id = req.params.id;
    if(typeof req.file !== "undefined"){
        req.body.artist.cover = "/uploads/covers/" + req.file.filename;
    }
    console.log(req.body.artist);
    Artist.findByIdAndUpdate(id, req.body.artist, function(err, searchedArtist){
        if(err){
            console.log(err);    
        }
        else{
            req.flash('success', 'Artist edited successfully');
            res.redirect('/admin/music/artist/' + id);        
        }
    });
});
router.post('/music/artist/:artistId/delete', function(req, res){
    let id = req.params.artistId;
    Artist.findByIdAndDelete(id, function(err, deletedArtist){
        if(err){
            console.log('error at 767');
        }
        else{
            Album.deleteMany({artistId: id}, function(err, oldContent){
                if(err){
                    console.log(err);
                }
                else{
                    Song.deleteMany({artistId: id}, function(err, oldContent){
                        if(err){
                            console.log(err);
                        }
                        else{
                            req.flash('success', 'Artist deleted successfully');
                            res.redirect('/admin/music');      
                        }
                    })
                }
            });
            
        }
    });
});
router.get('/music/artist/:artistId/album/:albumId', isUser, isLoggedIn, function(req, res){
    let albumId = req.params.albumId;
    let artistId = req.params.artistId;
    Artist.find({_id: artistId}, function(err, searchedArtist){
        if(err){
            console.log(err);
        }
        else{
            Album.find({_id: albumId}).populate('songs').exec(function(err, searchedAlbum){
                if(err){
                    console.log(err);
                }
                else{
                    res.render('admin/album.ejs',{artist: searchedArtist, album: searchedAlbum})   
                }
            } 
            );
        }
    }) ;

    // res.render('manager_album.ejs',{album, song});
});
router.get('/music/artist/:artistId/album/:albumId/edit', isUser, isLoggedIn, function(req, res){
    let id = req.params.albumId;
    Album.find({_id: id}, function(err, searchedAlbum){
        if(err){
            console.log(err);
        }
        else{
            res.render('admin/album_edit.ejs', {id: req.params.artistId, album: searchedAlbum});
        }
    })
    
});
router.post('/music/artist/:artistId/album/:albumId/edit', isLoggedIn, uploads.single('cover'), function(req, res){
    let id = req.params.albumId;
    if(typeof req.file !== "undefined"){
        req.body.album.cover = "/uploads/covers/" + req.file.filename;
    }
    Album.findByIdAndUpdate(id, req.body.album, function(err, editedAlbum){
        if(err){
            console.log(err);
        }
        else{
            if(req.body.album.cover){
                Song.updateMany({_id: editedAlbum.songs}, {cover: req.body.album.cover}).exec(function(err){
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log("yes");
                        req.flash('success', 'Album edited successfully');
                        res.redirect('/admin/music/artist/' + req.params.artistId + "/album/" + id);        
                    }
                })    
            }
            else{
                console.log("yes");
                req.flash('success', 'Album edited successfully');
                res.redirect('/admin/music/artist/' + req.params.artistId + "/album/" + id);  
            }
        }
    });
});
router.post('/music/artist/:artistId/album/:albumId/delete', isLoggedIn, function(req, res){
    let artistId = req.params.artistId;
    let id =req.params.albumId;
    Album.findByIdAndDelete(id, function(err, deletedAlbum){
        if(err){
            console.log(err);
        }
        else{
            Song.deleteMany({albumId: id}, function(err, oldContent){
                if(err){
                    console.log(err);
                }
                else{
                    req.flash('success', 'Album deleted successfully');
                    res.redirect('/manager/artist/' + artistId);        
                }
            });
        }
    })
});
router.get('/music/artist/:artistId/album/:albumId/song/:songId/edit', isUser, isLoggedIn, function(req, res){
    let albumId = req.params.albumId;
    let songId = req.params.songId;
    Album.find({_id: albumId}, function(err, editedAlbum){
        if(err){
            console.log(err);
        }
        else{
            Song.find({_id: songId}, function(err, editedSong){
                if(err){
                    console.log('error at get song edit');
                    
                }
                else{
                    res.render('admin/song_edit.ejs',{id: req.params.artistId, album: editedAlbum,song: editedSong});
                }
            })
        }
    });
});
router.post('/music/artist/:artistId/album/:albumId/song/:songId/edit', isLoggedIn, audioUploads.single('audio'), function(req, res){
    let songId = req.params.songId;
    if(typeof req.file !== "undefined"){
        req.body.song.audio = "/uploads/audios/" + req.file.filename;
    }
    Song.findByIdAndUpdate(songId, req.body.song, function(err, updatedSong){
        if(err){
            console.log(err);
        }
        else{
            req.flash("success", "Song edited successfully");
            res.redirect('/admin/music/artist/' + req.params.artistId + '/album/' + req.params.albumId);   
        }
    })
})
router.post('/music/artist/:artistId/album/:albumId/song/:songId/delete', isLoggedIn, function(req, res){
    let songId = req.params.songId;
    Song.findByIdAndDelete(songId, function(err, deletedSong){
        if(err){
            console.log(err);
        }
        else{
            req.flash("success", "Song deleted successfully!");
            res.redirect('/admin/music/artist/' + req.params.artistId + '/album/' + req.params.albumId);
        }
    })
})
router.get('/user',isLoggedIn, isUser, function(req, res){
    User.find().sort({status: -1, name: 1}).exec(function(err, allUser){
        if(err){
            console.log(err);
        }
        else{
            res.render('admin/user.ejs', {user: allUser});
        }
    })
    
});

router.get('/user/:id',isLoggedIn, isUser, function(req, res){
    User.findById(req.params.id).exec(function(err, searchedUser){
        if(err){
            console.log(err);
        }
        else{
            Activity.find({user: req.params.id}).exec(function(err, searchedActivity){
                if(err){
                    console.log(err);
                }
                else{
                    res.render('admin/user_detail.ejs', {user: searchedUser, activity: searchedActivity});
                }
            })
        }
    })
});

router.post('/user', function(req, res){
    res.redirect('/admin/user/search/' + req.body.userKeyword);
})

router.get('/user/search/:keyword', isLoggedIn, isUser, function(req, res){
    let keyword = req.params.keyword;
    User.find({$or:[{name: { $regex: new RegExp("^" + keyword, "i")}}, {lastName: { $regex: new RegExp("^" + keyword, "i")}}, {username: { $regex: new RegExp("^" + keyword, "i")}}]}).exec(function(err, user){
        if(err){
            console.log(err);
        }
        else{
            res.render('admin/user.ejs', {user: user});
        }
    })
})

router.get('/user/:id/edit', isLoggedIn, isUser, function(req, res){
    User.findById(req.params.id).exec(function(err, searchedUser){
        if(err){
            console.log(err);
        }
        else{
            res.render('admin/user_edit.ejs', {user: searchedUser});
        }
    })
});
router.post('/user/:id/delete', isLoggedIn, isUser, function(req, res){
    User.findByIdAndDelete(req.params.id).exec(function(err, deletedUser){
        if(err){
            console.log(err);
        }
        else{
            Activity.deleteMany({user: req.params.id}).exec(function(err, deletedActivity){
                if(err){
                    console.log(err);
                }
                else{
                    req.flash('success', 'User deleted successfully');
                    res.redirect('/admin/user');
                }
            })
        }
    })
})
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', "You need to log in first!");
    res.redirect('/login');
}
function isUser(req, res, next){
    if(req.user){
        if(req.user.status !== "admin"){
            req.flash('error', "Only admin can access this part of the site.");
            res.redirect("/");
        }
        else{
            next();
        }
    }
    else{
        req.flash('error', "You need to log in first!");
        res.redirect("/login");
    }
}

module.exports = router;