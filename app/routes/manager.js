const song = require('../models/song');

var express             = require('express'),
    router              = express.Router(),
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

router.get('/', isUser, isLoggedIn, function(req, res){

    Artist.find({manager: req.user._id}, function(err, managedArtist){
        if(err){
            console.log(err);
        }
        else{
            res.render('manager/home.ejs', {artists: managedArtist});
        }
    })
    
});

router.post('/', isLoggedIn, uploads.single("imgUrl"), function(req, res){
    let name = req.body.name;
    let imgUrl = req.body.imgUrl;
    let popularity = 0;
    console.log(req.file);
    let newArtist = {name: name, popularity: popularity,manager: req.user._id};
    newArtist.cover = "/uploads/covers/" + req.file.filename;
    Artist.create(newArtist, function(err, newlyCreated){
        if(err){
            console.log(err);
        }
        else{
            res.redirect('/manager');
        }
    })
})

router.get('/artist/add', isUser, isLoggedIn, function(req, res){
    res.render('manager/artist_add.ejs');
});

router.get('/artist/:artistId', isLoggedIn, function(req, res){
    // let artist = {artistName: 'AJR',artistId: 'AT-00001', artistCover: 'https://s3-us-west-2.amazonaws.com/paradigm-media-library/music_artists/ajr-20190501.jpg'};
    let artistId = req.params.artistId;
    Artist.find({_id: artistId}).populate('albums').exec(function(err, searchedArtist){
        if(err){
            console.log(err);
        }
        else{
            res.render('manager/artist.ejs', {artist: searchedArtist});
        }
    })
});

router.get('/artist/:artistId/add', isUser, isLoggedIn, function(req, res){
    let id = req.params.artistId;
    res.render('manager/album_add.ejs',{id});
});

router.post('/artist/:artistId/add', isLoggedIn, uploads.single('cover'), function(req, res){
    req.body.album.artistId = req.params.artistId;
    req.body.album.popularity = 0;
    req.body.album.cover = "/uploads/covers/" + req.file.filename;
    Album.create(req.body.album, function(err, newlyCreated){
        if(err){
            console.log(err);
        }
        else{
            Artist.updateOne({_id: req.params.artistId}, {$push: {albums: newlyCreated._id}}, function(err, addedAlbum){
                if(err){
                    console.log(err);
                }
                else{
                    req.flash('success', 'Artist added successfully');
                    res.redirect('/manager/artist/' + req.params.artistId);
                }
            })
            
        }
    });
});

router.post('/artist/:artistId/delete', function(req, res){
    let id = req.params.artistId;
    Artist.findByIdAndDelete(id, function(err, oldContent){
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
                            res.redirect('/manager');
                        }
                    })
                }
            });
            
        }
    });
});

router.get('/artist/:artistId/edit', isUser, isLoggedIn, function(req ,res){
    let id = req.params.artistId;
    Artist.find({_id: id}, function(err, searchedArtist){
        if(err){
            console.log(err);
        }
        else{
            res.render('manager/artist_edit.ejs',{artist: searchedArtist});
        }
    });

    
});

router.post('/artist/:artistId/edit', isLoggedIn, uploads.single('cover'), function(req, res){
    let id = req.params.artistId;
    if(typeof req.file !== "undefined"){
        req.body.artist.cover = "/uploads/covers/" + req.file.filename;
    }
    Artist.findByIdAndUpdate(id, req.body.artist, function(err, searchedArtist){
        if(err){
            console.log(err);    
        }
        else{
            req.flash('success', 'Artist edited successfully');
            res.redirect('/manager/artist/' + id);
        }
    });
});


router.get('/artist/:artistId/album/:albumId', isUser, isLoggedIn, function(req, res){
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
                    res.render('manager/album.ejs',{artist: searchedArtist, album: searchedAlbum})
                }
            } 
            );
        }
    }) ;

    // res.render('manager_album.ejs',{album, song});
});

router.get('/artist/:artistId/album/:albumId/edit', isUser, isLoggedIn, function(req, res){
    let id = req.params.albumId;
    Album.find({_id: id}, function(err, searchedAlbum){
        if(err){
            console.log(err);
        }
        else{
            res.render('manager/album_edit.ejs', {id: req.params.artistId, album: searchedAlbum});
        }
    })
    
});

router.post('/artist/:artistId/album/:albumId/edit', isLoggedIn, uploads.single('cover'), function(req, res){
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
                        req.flash('success', 'Album edited successfully');
                        res.redirect('/manager/artist/' + req.params.artistId + "/album/" + id);
                    }
                })    
            }
            else{
                req.flash('success', 'Album edited successfully');
                res.redirect('/manager/artist/' + req.params.artistId + "/album/" + id);    
            }
            
            
        }
    });
});

router.get('/artist/:artistId/album/:albumId/add', isUser, isLoggedIn, function(req, res){
    let albumId = req.params.albumId;
    Album.find({_id: albumId}, function(err, searchedAlbum){
        if(err){
            console.log(err);
        }
        else{
            res.render('manager/song_add.ejs',{id: req.params.artistId, album: searchedAlbum});

        }
    });
    // res.render('manager_song_add.ejs',{album});
});

router.post('/artist/:artistId/album/:albumId/add', isLoggedIn, audioUploads.single('audio'), function(req, res){
    let artistId = req.params.artistId;
    let albumId = req.params.albumId;
    let title = req.body.title;
    let lyrics = req.body.lyrics;
    let popularity = 0;
    let artistName = "";
    let albumName = "";
    let cover = "";
    
    Artist.find({_id: artistId}, function(err, searchedArtist){
        if(err){
            console.log(err)
        }
        else{
            artistName = searchedArtist[0].name;
            Album.find({_id: albumId}, function(err, searchedAlbum){
                if(err){
                    console.log(err)
                }
                else{
                    albumName = searchedAlbum[0].name;
                    cover = searchedAlbum[0].cover;
                    let newSong = {title: title, lyrics: lyrics, popularity: popularity, artistId: artistId, artistName: artistName, albumId: albumId, albumName: albumName, cover: cover};
                    newSong.audio = "/uploads/audios/" + req.file.filename;
                    Song.create(newSong, function(err, newlyCreated){
                        if(err){
                            console.log(err);
                        }
                        else{
                            Album.updateOne({_id: albumId}, {$push: {songs: newlyCreated._id}}, function(err, addedSong){
                                if(err){
                                    console.log(err);
                                }
                                else{
                                    req.flash('success', 'Song added successfully');
                                    res.redirect('/manager/artist/' + artistId + "/album/" + albumId);
                                }
                            })
                            
                        }
                    });
                }
            });
        }
    });
    
});

router.post('/artist/:artistId/album/:albumId/delete', isLoggedIn, function(req, res){
    let artistId = req.params.artistId;
    let id =req.params.albumId;
    Album.findByIdAndDelete(id, function(err, oldContent){
        if(err){
            console.log(err);
        }
        else{
            console.log(oldContent);
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

router.get('/artist/:artistId/album/:albumId/song/:songId/edit', isUser, isLoggedIn, function(req, res){
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
                    res.render('manager/song_edit.ejs',{id: req.params.artistId, album: editedAlbum,song: editedSong});
                }
            })
        }
    });
});

router.post('/artist/:artistId/album/:albumId/song/:songId/edit', isLoggedIn, audioUploads.single('audio'), function(req, res){
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
            res.redirect('/manager/artist/' + req.params.artistId + '/album/' + req.params.albumId);
        }
    })
})

router.post('/artist/:artistId/album/:albumId/song/:songId/delete', isLoggedIn, function(req, res){
    let songId = req.params.songId;
    Song.findByIdAndDelete(songId, function(err, deletedSong){
        if(err){
            console.log(err);
        }
        else{
            req.flash("success", "Song deleted successfully!");
            res.redirect('/manager/artist/' + req.params.artistId + '/album/' + req.params.albumId);
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
        if(req.user.status === "user"){
            req.flash('error', "Only user with manager permission can do this. Either register as manager via profile tab or bugger off!");
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