var express             = require('express'),
    router              = express.Router(),
    Artist              = require('../models/artist'),
    Album               = require('../models/album'),
    Song                = require('../models/song'),
    User                = require('../models/user'),
    SubscriptionDetail  = require('../models/subscriptionDetail'),
    Favorite            = require('../models/favorite');

router.get('/', isLoggedIn, function(req, res){
    // let artist = [
    //     {artistName: 'AJR',artistId: 'AT-00001', artistCover: 'https://s3-us-west-2.amazonaws.com/paradigm-media-library/music_artists/ajr-20190501.jpg'},
    //     {artistName: 'Imagine Dragon',artistId: 'AT-00002', artistCover: 'https://mpics.mgronline.com/pics/Images/561000011690001.JPEG'},
    //     {artistName: 'All Time Low',artistId: 'AT-00003', artistCover: 'https://www.upsetmagazine.com/images/article/Artist-Images/A/All-Time-Low/Upset%20Cover%20Shoot%20Apr20/_crop1500x1000/All-Time-Low_London_February-2020_199.jpg'},
    //     {artistName: 'Maroon 5',artistId: 'AT-00004', artistCover: 'https://i.pinimg.com/originals/49/01/8f/49018fd5d24c32a141d556f5a00a8324.jpg'}
    // ];

    Artist.find({manager: req.user._id}, function(err, managedArtist){
        if(err){
            console.log(err);
        }
        else{
            res.render('index/home.ejs', {artists: managedArtist});
        }
    })
    
    // res.render('manager_home.ejs',{user,artist});
});

router.post('/', function(req, res){
    let name = req.body.name;
    let imgUrl = req.body.imgUrl;
    let popularity = 0;
    console.log(name);
    let newArtist = {name: name, cover: imgUrl, popularity: popularity,manager: req.user._id};
    Artist.create(newArtist, function(err, newlyCreated){
        if(err){
            console.log(err);
        }
        else{
            console.log(newlyCreated);
            res.redirect('/manager');
        }
    })
})

router.get('/artist/add', isLoggedIn, function(req, res){
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
            console.log(searchedArtist);
            res.render('manager/artist.ejs', {artist: searchedArtist});
        }
    })
});

router.get('/artist/:artistId/add', isLoggedIn, function(req, res){
    let id = req.params.artistId;
    res.render('manager/album_add.ejs',{id});
});

router.post('/artist/:artistId/add', function(req, res){
    let id = req.params.artistId;
    let name = req.body.name;
    let cover = req.body.cover;
    let popularity = 0;
    let newAlbum = {name: name, cover: cover, popularity: popularity};
    Album.create(newAlbum, function(err, newlyCreated){
        if(err){
            console.log(err);
        }
        else{
            console.log("YEET");
            Artist.updateOne({_id: id}, {$push: {albums: newlyCreated._id}}, function(err, addedAlbum){
                if(err){
                    console.log(err);
                }
                else{
                    console.log(addedAlbum);
                    res.redirect('/manager/artist/' + id);
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
                    console.log('error at 773');
                    console.log(err);
                }
                else{
                    res.redirect('/manager');
                }
            });
            
        }
    });
});

router.get('/artist/:artistId/edit', isLoggedIn, function(req ,res){
    let id = req.params.artistId;
    Artist.find({_id: id}, function(err, searchedArtist){
        if(err){
            console.log('error at get artist edit' );
            console.log(err);
        }
        else{
            res.render('manager/artist_edit.ejs',{artist: searchedArtist});
        }
    });

    
});

router.post('/artist/:artistId/edit', function(req, res){
    let id = req.params.artistId;
    let name = req.body.name;
    let cover = req.body.cover;
    Artist.findByIdAndUpdate(id,{name: name, cover: cover}, function(err, searchedArtist){
        if(err){
            console.log(err);    
        }
        else{
            console.log('artist updated');
            res.redirect('/manager/artist/' + id);
        }
    });
});


router.get('/artist/:artistId/album/:albumId', isLoggedIn, function(req, res){
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

router.get('/artist/:artistId/album/:albumId/edit', isLoggedIn, function(req, res){
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

router.post('/artist/:artistId/album/:albumId/edit', function(req, res){
    let id = req.params.albumId;
    let name = req.body.name;
    let cover = req.body.cover;
    Album.findByIdAndUpdate(id, {name: name, cover: cover}, function(err, editedAlbum){
        if(err){
            console.log(err);
        }
        else{
            console.log('edit album');
            res.redirect('/manager/artist/' + req.params.artistId + "/album/" + id);
        }
    });
});

router.get('/artist/:artistId/album/:albumId/add', isLoggedIn, function(req, res){
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

router.post('/artist/:artistId/album/:albumId/add', function(req, res){
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

router.post('/artist/:artistId/album/:albumId/delete', function(req, res){
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
                    res.redirect('/manager/artist/' + artistId);
                }
            });
        }
    })
});

router.get('/artist/:artistId/album/:albumId/song/:songId/edit', isLoggedIn, function(req, res){
    let albumId = req.params.albumId;
    let songId = req.params.songId;
    Album.find({_id: albumId}, function(err, editedAlbum){
        if(err){
            console.log(err);
        }
        else{
            console.log('edit song album');
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

router.post('/artist/:artistId/album/:albumId/song/:songId/edit', function(req, res){
    let songId = req.params.songId;
    let title = req.body.title;
    let lyrics = req.body.lyrics;
    Song.findByIdAndUpdate(songId, {title: title, lyrics: lyrics}, function(err, updatedSong){
        if(err){
            console.log(err);
        }
        else{
            console.log('song updated');
            res.redirect('/manager/artist/' + req.params.artistId + '/album/' + req.params.albumId);
        }
    })
})

router.post('/artist/:artistId/album/:albumId/song/:songId/delete', function(req, res){
    let songId = req.params.songId;
    Song.findByIdAndDelete(songId, function(err, deletedSong){
        if(err){
            console.log(err);
        }
        else{
            console.log('song deleted');
            res.redirect('/manager/artist/' + req.params.artistId + '/album/' + req.params.albumId);
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