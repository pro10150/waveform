const favorite = require('./models/favorite');

const   express             = require('express'),
        app                 = express(),
        bodyParser          = require('body-parser'),
        mongoose            = require('mongoose'),
        passport            = require('passport'),
        LocalStrategy       = require('passport-local'),
        Artist              = require('./models/artist'),
        Album               = require('./models/album'),
        Song                = require('./models/song'),
        User                = require('./models/user'),
        SubscriptionDetail  = require('./models/subscriptionDetail'),
        Favorite            = require('./models/favorite'),
        seedDB              = require('./seed');

// seedDB();
mongoose.connect('mongodb://localhost/waveform');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.use(require('express-session')({
    secret: 'secret is always secret.',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
});

// let artistSchema = new mongoose.Schema({
//     name: String,
//     cover: String,
//     popularity: Number
// });

// let albumSchema = new mongoose.Schema({
//     artistId: String,
//     name: String,
//     cover: String,
//     popularity: Number
// });

// let songSchema = new mongoose.Schema({
//     artistId: String,
//     albumId: String,
//     title: String,
//     lyrics: String,
//     popularity: Number
// });

// let artist = mongoose.model('artists', artistSchema);
// let album = mongoose.model('albums', albumSchema);
// let song = mongoose.model('songs', songSchema);

// artist.create(
//     {
//         name: 'AJR',
//         cover: 'https://s3-us-west-2.amazonaws.com/paradigm-media-library/music_artists/ajr-20190501.jpg',
//         popularity: 0
//     },
//     function(err, artist){
//         if(err){
//             console.log(err);
//         }
//         else{
//             console.log('New data added');
//             console.log(artist);
//         }
//     }
// );

// album.create(
//     {
//         artistId: '607f20ba5e581f1ecdf2c821',
//         name: 'Living Room',
//         cover: 'http://images.genius.com/5a3527f335351f4ce9e09d92920321a4.640x640x1.jpg',
//         popularity: 0
//     },
//     {
//         artistId: '607f20ba5e581f1ecdf2c821',
//         name: 'The Click',
//         cover: 'https://c.min.ms/t/d/member/c/19/19174/pagegallery/1499703294/1dad936c.jpg',
//         popularity: 0
//     },
//     {
//         artistId: '607f20ba5e581f1ecdf2c821',
//         name: 'Neotheater',
//         cover: 'https://pbs.twimg.com/media/D5vBebOWwAANB1I.jpg',
//         popularity: 0
//     },
//     function(err, album){
//         if(err){
//             console.log(err);
//         }
//         else{
//             console.log('New data Added');
//             console.log(album);
//         }
//     }
// );

// song.create(
//     {
//         artistId: '607f20ba5e581f1ecdf2c821',
//         albumId: '607f212a2094171eda0c87d3',
//         title: 'Next Up Forever',
//         lyrics: "Your eyes are open\
//         So never close them\
//         You\'ll sail the ocean\
//         Finding where you should be\
//         And if you\'re broken\
//         You\'ll make your own thing\
//         You\'ll make it so big\
//         For all the world to see\
//         You\'ll make it so damn big\
//         For all the world to see\
//         I\'m kinda scared to drop this album\
//         Let\'s push it back another week\
//         I wanna be next up forever\
//         Find a way to never hit my peak\
//         I kinda wish I was still a virgin\
//         Time to finally see what sex is like\
//         I wanna be next up forever\
//         Forever I\'ll be second in line\
//         Someday they\'ll be talking about me\
//         Right now they\'re just walking around me\
//         My God\, are you growing without me?\
//         Somebody help me (somebody help me)\
//         Someday they\'ll be talking about me\
//         Right now they\'re just walking around me\
//         My God, are you growing without me?\
//         Somebody help me (somebody help me, somebody help me, somebody help me)\
//         This is my imagination\
//         This is how it looks and sounds\
//         But I gotta go so much bigger\
//         So they can never shut me down\
//         I\'m kinda scared of graduation\
//         \'Cause who am I when this is done?\
//         I wanna be next up forever\
//         So the best is always yet to come\
//         Someday they\'ll be talking about me\
//         Right now they\'re just walking around me\
//         My God, are you growing without me?\
//         Somebody help me (somebody help me)\
//         Someday they\'ll be talking about me\
//         Right now they\'re just walking around me\
//         My God\, are you growing without me?\
//         Somebody help me (somebody help me, somebody help me, somebody help me)\
//         I gotta go so much bigger\
//         So everybody\'s proud of me\
//         Welcome to the Neotheater\
//         Won\'t everybody take their seats?\
//         And I\'ll be next up forever\
//         \'Cause I don\'t know what\'s coming next\
//         I know I gotta grow up sometime\
//         But I don\'t think I\'m ready yet\
//         I know I gotta grow up sometime\
//         But I\'m not fucking ready yet\
//         Your eyes are open\
//         So never close them\
//         You\'ll sail the ocean\
//         Finding where you should be\
//         And if you\'re broken\
//         You\'ll make your own thing\
//         You\'ll make it so big\
//         For all the world to see\
//         You\'ll make it so damn big\
//         For all the world to see",
//         popularity: 0
//     },
//     {
//         artistId: '607f20ba5e581f1ecdf2c821',
//         albumId: '607f212a2094171eda0c87d3',
//         title: 'Birthday Party',
//         lyrics: '',
//         popularity: 0
//     },
//     {
//         artistId: '607f20ba5e581f1ecdf2c821',
//         albumId: '607f212a2094171eda0c87d3',
//         title: '100 Bad Days',
//         lyrics: '',
//         popularity: 0
//     },
//     {
//         artistId: '607f20ba5e581f1ecdf2c821',
//         albumId: '607f212a2094171eda0c87d3',
//         title: 'Don\'t Throw out My Legos',
//         lyrics: '',
//         popularity: 0
//     },
//     {
//         artistId: '607f20ba5e581f1ecdf2c821',
//         albumId: '607f212a2094171eda0c87d3',
//         title: 'Break My Face',
//         lyrics: '',
//         popularity: 0
//     },
//     {
//         artistId: '607f20ba5e581f1ecdf2c821',
//         albumId: '607f212a2094171eda0c87d3',
//         title: 'Turning Out Pt. ii',
//         lyrics: '',
//         popularity: 0
//     },
//     {
//         artistId: '607f20ba5e581f1ecdf2c821',
//         albumId: '607f212a2094171eda0c87d3',
//         title: 'The Entertainment\'t Here',
//         lyrics: '',
//         popularity: 0
//     },
//     {
//         artistId: '607f20ba5e581f1ecdf2c821',
//         albumId: '607f212a2094171eda0c87d3',
//         title: 'Karma',
//         lyrics: '',
//         popularity: 0
//     },
//     {
//         artistId: '607f20ba5e581f1ecdf2c821',
//         albumId: '607f212a2094171eda0c87d3',
//         title: 'Beats',
//         lyrics: '',
//         popularity: 0
//     },
//     function(err, song){
//         if(err){
//             console.log(err);
//         }
//         else{
//             console.log('New Data Added');
//             console.log(song);
//         }
//     }
// );

// let artist = {artistName: 'AJR',artistId: 'AT-00001', artistCover: 'https://s3-us-west-2.amazonaws.com/paradigm-media-library/music_artists/ajr-20190501.jpg'};

let user = {
        id: 'UR-00001',
        name: 'Noppakun',
        lastName: 'Anantakitthawon',
        profilePicture: 'https://i.redd.it/utsm4wj5rg121.jpg',
        subscribe: false,
        status: 'user'  
    };
    
app.get('/', function(req, res){

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
                                        res.render('home.ejs', {artist: allArtist, album: allAlbum, song: allSong, fav: fav});
                                    }
                                })    
                            }
                            else{
                                res.render('home.ejs', {artist: allArtist, album: allAlbum, song: allSong});
                            }
                            
                        }
                    })
                }
            })
        }
    })
    
});

app.get('/artist/:artistId', function(req, res){
    let id = req.params.artistId;
    Artist.findByIdAndUpdate(id, {$inc: {'popularity' : 10}}).populate("albums").exec(function(err, searchedArtist){
        if(err){
            console.log(err);
        }
        else{
            res.render('artist.ejs',{id, artist: searchedArtist});
        }
    })
    
}); 

app.get('/album/:albumId', function(req, res){
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
                        res.render('album.ejs',{id: artistId,album: searchedAlbum, fav: fav});
                    }
                })    
            }
            else{
                res.render('album.ejs',{id: artistId,album: searchedAlbum});
            }
        }
    })
    
});

app.post('/search', function(req, res){
    res.redirect('/search/' + req.body.keyword);
})

app.get('/search/:keyword', function(req,res){
    let keyword = req.params.keyword;
    Artist.find({name: { $regex : keyword,$options:'i' }}).sort({popularity: -1}).limit(4).exec(function(err, searchedArtist){
        if(err){
            console.log(err);
        }
        else{
            Album.find({name: {$regex: keyword,$options:'i'}}).sort({popularity: -1}).limit(4).exec(function(err, searchedAlbum){
                if(err){
                    console.log(err);
                }
                else{
                    Song.find({title: {$regex: keyword,$options:'i'}}).sort({popularity: -1}).limit(5).exec(function(err, searchedSong){
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
                            console.log(topResult[0])
                            console.log(top)
                            if(req.isAuthenticated()){
                                Favorite.find({id: req.user._id}, function(err, fav){
                                    if(err){
                                        console.log(err);
                                    }
                                    else{
                                        res.render('search.ejs',{keyword,topResult: top,topSong: searchedSong,topAlbum: searchedAlbum,topArtist: searchedArtist, fav: fav});
                                    }
                                })    
                            }
                            else{
                                res.render('search.ejs',{keyword,topResult: top,topSong: searchedSong,topAlbum: searchedAlbum,topArtist: searchedArtist});
                            }
                        }
                    })
                }
            })
        }
        
    })
});

app.get('/search/:searchKeyword/song', function(req, res){
    let keyword = req.params.searchKeyword;
    Song.find({title: {$regex: keyword,$options:'i'}}).sort({popularity: -1}). exec(function(err, topSong){
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
                        res.render('search_song.ejs',{keyword,topSong, fav: fav});
                    }
                })    
            }
            else{
                res.render('search_song.ejs',{keyword,topSong});
            }
            
        }
    })
    
});

app.get('/search/:searchKeyword/artist', function(req, res){
    let keyword = req.params.searchKeyword;
    Artist.find({name: {$regex: keyword,$options:'i'}}).sort({popularity: -1}). exec(function(err, topArtist){
        if(err){
            console.log(err);
        }
        else{
            res.render('search_artist.ejs',{keyword,topArtist});
        }
    });
    
});

app.get('/search/:searchKeyword/album', function(req, res){
    let keyword = req.params.searchKeyword;
    Album.find({name: {$regex: keyword,$options:'i'}}).sort({popularity: -1}). exec(function(err, topAlbum){
        if(err){
            console.log(err);
        }
        else{
            res.render('search_album.ejs',{keyword,topAlbum});
        }
    });
});

app.get('/login',function(req, res){
    res.render('login_screen.ejs');
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

app.post('/login', passport.authenticate('local', 
    {
        successRedirect: '/',
        failureRedirect: '/login'
    }), function(req, res){
});

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

app.get('/manager', isLoggedIn, function(req, res){
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
            res.render('manager_home.ejs', {artists: managedArtist});
        }
    })
    
    // res.render('manager_home.ejs',{user,artist});
});

app.post('/manager', function(req, res){
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

app.get('/manager/artist/add', isLoggedIn, function(req, res){
    res.render('manager_artist_add.ejs');
});

app.get('/manager/artist/:artistId', isLoggedIn, function(req, res){
    // let artist = {artistName: 'AJR',artistId: 'AT-00001', artistCover: 'https://s3-us-west-2.amazonaws.com/paradigm-media-library/music_artists/ajr-20190501.jpg'};
    let artistId = req.params.artistId;
    Artist.find({_id: artistId}).populate('albums').exec(function(err, searchedArtist){
        if(err){
            console.log(err);
        }
        else{
            console.log(searchedArtist);
            res.render('manager_artist.ejs', {artist: searchedArtist});
        }
    })
});

app.get('/manager/artist/:artistId/add', isLoggedIn, function(req, res){
    let id = req.params.artistId;
    res.render('manager_album_add.ejs',{id});
});

app.post('/manager/artist/:artistId/add', function(req, res){
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

app.post('/manager/artist/:artistId/delete', function(req, res){
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

app.get('/manager/artist/:artistId/edit', isLoggedIn, function(req ,res){
    let id = req.params.artistId;
    Artist.find({_id: id}, function(err, searchedArtist){
        if(err){
            console.log('error at get artist edit' );
            console.log(err);
        }
        else{
            res.render('manager_artist_edit.ejs',{artist: searchedArtist});
        }
    });

    
});

app.post('/manager/artist/:artistId/edit', function(req, res){
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


app.get('/manager/artist/:artistId/album/:albumId', isLoggedIn, function(req, res){
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
                    res.render('manager_album.ejs',{artist: searchedArtist, album: searchedAlbum})
                }
            } 
            );
        }
    }) ;

    // res.render('manager_album.ejs',{album, song});
});

app.get('/manager/artist/:artistId/album/:albumId/edit', isLoggedIn, function(req, res){
    let id = req.params.albumId;
    Album.find({_id: id}, function(err, searchedAlbum){
        if(err){
            console.log(err);
        }
        else{
            res.render('manager_album_edit.ejs', {id: req.params.artistId, album: searchedAlbum});
        }
    })
    
});

app.post('/manager/artist/:artistId/album/:albumId/edit', function(req, res){
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

app.get('/manager/artist/:artistId/album/:albumId/add', isLoggedIn, function(req, res){
    let albumId = req.params.albumId;
    Album.find({_id: albumId}, function(err, searchedAlbum){
        if(err){
            console.log(err);
        }
        else{
            res.render('manager_song_add.ejs',{id: req.params.artistId, album: searchedAlbum});

        }
    });
    // res.render('manager_song_add.ejs',{album});
});

app.post('/manager/artist/:artistId/album/:albumId/add', function(req, res){
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

app.post('/manager/artist/:artistId/album/:albumId/delete', function(req, res){
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

app.get('/manager/artist/:artistId/album/:albumId/song/:songId/edit', isLoggedIn, function(req, res){
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
                    res.render('manager_song_edit.ejs',{id: req.params.artistId, album: editedAlbum,song: editedSong});
                }
            })
        }
    });
});

app.post('/manager/artist/:artistId/album/:albumId/song/:songId/edit', function(req, res){
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

app.post('/manager/artist/:artistId/album/:albumId/song/:songId/delete', function(req, res){
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

app.get('/register', function(req, res){
    res.render('register_screen.ejs');
});

app.post('/register', function(req, res){
    var newUser = new User({username: req.body.username, name: req.body.name, lastName: req.body.lastName, subscribe: false, status: 'user'});
    User.register(newUser, req.body.password, function(err, user){
        if(err) {
            console.log(err);
            return res.render('register');
        }
        passport.authenticate('local')(req, res, function(){
            res.redirect('/login');
        });
    });
});

app.get('/profile', isLoggedIn, function(req, res){
    
    res.render('user_profile.ejs',{user});
});

app.get('/profile/subscribe-protal', isLoggedIn, function(req, res){
    res.render('user_profile_subscribe.ejs',{user});
});

app.post('/profile/subscribe', function(req, res){
    let newSubscriptionDetail = {id: req.body.id, ccn: req.body.ccn, name: req.body.name, expiredMonth: req.body.month, expiredYear: req.body.year, cvv: req.body.cvv}
    console.log("test");
    User.findByIdAndUpdate(req.body.id, {subscribe: true}, function(err, user){
        if(err){
            console.log(err);
        }
        else{
            SubscriptionDetail.create(newSubscriptionDetail, function(err, newSubscription){
                if(err){
                    console.log(err);
                }
                else{
                    console.log(newSubscription);
                    res.redirect('/profile');
                }
            });        
        }
    });
});

app.post('/profile/unsubscribe', function(req, res){
    User.findByIdAndUpdate(req.body.userId, {subscribe: false}, function(err, user){
        if(err){
            console.log(err);
        }
        else{
            SubscriptionDetail.findOneAndDelete({id: req.body.userId}, function(err, subscribe){
                if(err){
                    console.log(err);
                }
                else{
                    res.redirect('/profile');
                }
            })
        }
    })
})

app.get('/profile/edit', isLoggedIn, function(req, res){
    res.render('user_profile_edit.ejs');
});

app.post('/profile/edit', function(req, res){
    User.findByIdAndUpdate(req.body.id,{profilePicture: req.body.url, name: req.body.name, lastName: req.body.lastName}, function(err, user){
        if(err){
            console.log(err);
        }
        else{
            console.log(user);
            console.log(req.body.id);
            res.redirect('/profile');
        }
    });
});

app.get('/favorite', isLoggedIn, function(req, res){
    songIdArray = []
    favorite.find({id: req.user._id}, function(err, searchedFavorite){
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
                                    res.render('user_fav.ejs',{result, fav: fav});
                                }
                            })    
                        }
                        else{
                            res.render('user_fav.ejs',{result});
                        }
                    }
                })
        }
    })
});

app.post('/favorite/:id/:songId/add', function(req, res){
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

app.post('/favorite/:id/:songId/delete', function(req, res){
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

app.get('*', function(req, res){
    res.render('page_not_found.ejs');
});

app.listen('3000', function(req, res){
    console.log('Server is running');
});