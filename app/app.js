
const   express     = require('express'),
        app         = express(),
        bodyParser  = require('body-parser'),
        mongoose    = require('mongoose'),
        Artist      = require('./models/artist'),
        Album       = require('./models/album'),
        Song        = require('./models/song'),
        seedDB      = require('./seed');

// seedDB();
mongoose.connect('mongodb://localhost/waveform');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

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
                            res.render('home.ejs', {artist: allArtist, album: allAlbum, song: allSong});
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

app.get('/artist/:artistId/album/:albumId', function(req, res){
    let artistId = req.params.artistId;
    let albumId = req.params.albumId;
    Album.findByIdAndUpdate(albumId,{$inc: {'popularity' : 10}}).populate("songs").exec(function(err, searchedAlbum){
        if(err){
            console.log(err);
        }
        else{
            res.render('album.ejs',{id: artistId,album: searchedAlbum});
        }
    })
    
});

app.get('/search/:searchKeyword', function(req,res){
    let keyword = req.params.searchKeyword;
    let topResult = {
        type: 'song',
        songTitle: 'All I Want',
        songId: 'SN-01010',
        albumName: 'In A Perfect World',
        albumId: 'AL-01010',
        artistName: 'Kodaline',
        artistId: 'AT-01010',
        cover: 'https://backinblackrecords.com/wp-content/uploads/2020/07/R-4663580-1423115022-4492.jpeg.jpg'
    };
    let topSong = [
        {
            songTitle: 'All I Want',
            songId: 'SN-01010',
            albumName: 'In A Perfect World',
            albumId: 'AL-01010',
            artistName: 'Kodaline',
            artistId: 'AT-01010',
            cover: 'https://backinblackrecords.com/wp-content/uploads/2020/07/R-4663580-1423115022-4492.jpeg.jpg'
        },
        {
            songTitle: 'All We Know',
            songId: 'SN-01011',
            albumName: 'All We Know',
            albumId: 'AL-01011',
            artistName: 'The Chainsmoker, Phoebe Ryan',
            artistId: 'AT-01011',
            cover: 'https://reaplyrics.files.wordpress.com/2016/09/chainsmokers-all-we-know-cover-413x413.jpg'
        },
        {
            songTitle: 'All of Me',
            songId: 'SN-01012',
            albumName: 'Love In The Future',
            albumId: 'AL-01012',
            artistName: 'John Legend',
            artistId: 'AT-01012',
            cover: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/64/John_Legend_Love_in_the_Future.jpg/220px-John_Legend_Love_in_the_Future.jpg'
        },
        {
            songTitle: 'all the kids are depressed',
            songId: 'SN-01013',
            albumName: 'glisten',
            albumId: 'AL-01013',
            artistName: 'Jeremy Zucker',
            artistId: 'AT-01013',
            cover: 'https://e-cdns-images.dzcdn.net/images/cover/0cd5c37cfab0055b6085295062ef25fa/500x500.jpg'
        },
        {
            songTitle: 'all the kids are depressed',
            songId: 'SN-01014',
            albumName: 'Crying In Bed',
            albumId: 'AL-01014',
            artistName: 'Jeremy Zucker',
            artistId: 'AT-01013',
            cover: 'https://direct.rhapsody.com/imageserver/images/alb.567596131/500x500.jpg'
        },
        // {
        //     songTitle: 'all the good girls go to hell',
        //     songId: 'SN-01015',
        //     albumName: 'WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?',
        //     albumId: 'AL-01015',
        //     artistName: 'Billie Eilish',
        //     artistId: 'AT-01014',
        //     cover: 'https://upload.wikimedia.org/wikipedia/en/3/38/When_We_All_Fall_Asleep%2C_Where_Do_We_Go%3F.png'
        // }
    ];
    let topArtist = [
        {
            artistName: 'All Time Low',
            artistId: 'AT-00003',
            cover: 'https://www.upsetmagazine.com/images/article/Artist-Images/A/All-Time-Low/Upset%20Cover%20Shoot%20Apr20/_crop1500x1000/All-Time-Low_London_February-2020_199.jpg'
        },
        {
            artistName: 'The All-American Rejects',
            artistId: 'AT-01010',
            cover: 'https://pbs.twimg.com/profile_images/1151022574639316992/RcWkcN_p.png'
        },
        {
            artistName: 'ALLY',
            artistId: 'AT-01015',
            cover: 'https://i0.wp.com/www.korseries.com/wp-content/uploads/2020/02/how-to-love-ally-mv-teaser.jpg?fit=1000%2C596&ssl=1'
        },
        {
            artistName: 'All-4-One',
            artistId: 'AT-01016',
            cover: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/55/All-4-One_-_No_Regrets.jpg/220px-All-4-One_-_No_Regrets.jpg'
        },
        // {
        //     artistName: 'All That Remains',
        //     artistId: 'AT-01017',
        //     cover: 'http://www.teroradio.com/2011/uploads/news/38507.jpg'
        // }
    ];
    let topAlbum =[
        {
            albumName: 'All Fall Down',
            albumId: 'AL-01016',
            artistName: 'Alan Walker',
            artistId: 'AT-01018',
            cover: 'data:image/jpeg;base64,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'
        },
        {
            albumName: 'All We Know',
            albumId: 'AL-01011',
            artistName: 'The Chainsmokers',
            artistId: '01011',
            cover: 'https://reaplyrics.files.wordpress.com/2016/09/chainsmokers-all-we-know-cover-413x413.jpg'
        },
        {
            albumName: 'All Rise',
            albumId: 'AL-01017',
            artistName: 'Blue',
            artistId: 'AT-01019',
            cover: 'https://upload.wikimedia.org/wikipedia/en/c/c7/All_Rise.jpg'
        },
        {
            albumName: 'All The Little Lights',
            albumId: 'AL-01018',
            artistName: 'Passenger',
            artistId: 'AT-01020',
            cover: 'https://img.discogs.com/jZPp7uIGExhUSIyrjr0kizXaleU=/fit-in/600x593/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-4069522-1415089203-3603.jpeg.jpg'
        },
        // {
        //     albumName: 'All That We Needed',
        //     albumId: 'AL-01019',
        //     artistName: 'Plain White T\'s',
        //     artistId: 'AT-01021',
        //     cover: "https://upload.wikimedia.org/wikipedia/en/0/08/All_That_We_Needed_%28album_cover%29.JPG"
        // }
    ];
    res.render('search.ejs',{keyword,topResult,topSong,topAlbum,topArtist});
});

app.get('/search/:searchKeyword/song', function(req, res){
    let keyword = req.params.searchKeyword;
    let topSong = [
        {
            songTitle: 'All I Want',
            songId: 'SN-01010',
            albumName: 'In A Perfect World',
            albumId: 'AL-01010',
            artistName: 'Kodaline',
            artistId: 'AT-01010',
            cover: 'https://backinblackrecords.com/wp-content/uploads/2020/07/R-4663580-1423115022-4492.jpeg.jpg'
        },
        {
            songTitle: 'All We Know',
            songId: 'SN-01011',
            albumName: 'All We Know',
            albumId: 'AL-01011',
            artistName: 'The Chainsmoker, Phoebe Ryan',
            artistId: 'AT-01011',
            cover: 'https://reaplyrics.files.wordpress.com/2016/09/chainsmokers-all-we-know-cover-413x413.jpg'
        },
        {
            songTitle: 'All of Me',
            songId: 'SN-01012',
            albumName: 'Love In The Future',
            albumId: 'AL-01012',
            artistName: 'John Legend',
            artistId: 'AT-01012',
            cover: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/64/John_Legend_Love_in_the_Future.jpg/220px-John_Legend_Love_in_the_Future.jpg'
        },
        {
            songTitle: 'all the kids are depressed',
            songId: 'SN-01013',
            albumName: 'glisten',
            albumId: 'AL-01013',
            artistName: 'Jeremy Zucker',
            artistId: 'AT-01013',
            cover: 'https://e-cdns-images.dzcdn.net/images/cover/0cd5c37cfab0055b6085295062ef25fa/500x500.jpg'
        },
        {
            songTitle: 'all the kids are depressed',
            songId: 'SN-01014',
            albumName: 'Crying In Bed',
            albumId: 'AL-01014',
            artistName: 'Jeremy Zucker',
            artistId: 'AT-01013',
            cover: 'https://direct.rhapsody.com/imageserver/images/alb.567596131/500x500.jpg'
        },
        {
            songTitle: 'all the good girls go to hell',
            songId: 'SN-01015',
            albumName: 'WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?',
            albumId: 'AL-01015',
            artistName: 'Billie Eilish',
            artistId: 'AT-01014',
            cover: 'https://upload.wikimedia.org/wikipedia/en/3/38/When_We_All_Fall_Asleep%2C_Where_Do_We_Go%3F.png'
        }
    ];
    res.render('search_song.ejs',{keyword,topSong});
});

app.get('/search/:searchKeyword/artist', function(req, res){
    let keyword = req.params.searchKeyword;
    let topArtist = [
        {
            artistName: 'All Time Low',
            artistId: 'AT-00003',
            cover: 'https://www.upsetmagazine.com/images/article/Artist-Images/A/All-Time-Low/Upset%20Cover%20Shoot%20Apr20/_crop1500x1000/All-Time-Low_London_February-2020_199.jpg'
        },
        {
            artistName: 'The All-American Rejects',
            artistId: 'AT-01010',
            cover: 'https://pbs.twimg.com/profile_images/1151022574639316992/RcWkcN_p.png'
        },
        {
            artistName: 'ALLY',
            artistId: 'AT-01015',
            cover: 'https://i0.wp.com/www.korseries.com/wp-content/uploads/2020/02/how-to-love-ally-mv-teaser.jpg?fit=1000%2C596&ssl=1'
        },
        {
            artistName: 'All-4-One',
            artistId: 'AT-01016',
            cover: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/55/All-4-One_-_No_Regrets.jpg/220px-All-4-One_-_No_Regrets.jpg'
        },
        {
            artistName: 'All That Remains',
            artistId: 'AT-01017',
            cover: 'http://www.teroradio.com/2011/uploads/news/38507.jpg'
        }
    ];
    res.render('search_artist.ejs',{keyword,topArtist});
});

app.get('/search/:searchKeyword/album', function(req, res){
    let keyword = req.params.searchKeyword;
    let topAlbum =[
        {
            albumName: 'All Fall Down',
            albumId: 'AL-01016',
            artistName: 'Alan Walker',
            artistId: 'AT-01018',
            cover: 'data:image/jpeg;base64,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'
        },
        {
            albumName: 'All We Know',
            albumId: 'AL-01011',
            artistName: 'The Chainsmokers',
            artistId: '01011',
            cover: 'https://reaplyrics.files.wordpress.com/2016/09/chainsmokers-all-we-know-cover-413x413.jpg'
        },
        {
            albumName: 'All Rise',
            albumId: 'AL-01017',
            artistName: 'Blue',
            artistId: 'AT-01019',
            cover: 'https://upload.wikimedia.org/wikipedia/en/c/c7/All_Rise.jpg'
        },
        {
            albumName: 'All The Little Lights',
            albumId: 'AL-01018',
            artistName: 'Passenger',
            artistId: 'AT-01020',
            cover: 'https://img.discogs.com/jZPp7uIGExhUSIyrjr0kizXaleU=/fit-in/600x593/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-4069522-1415089203-3603.jpeg.jpg'
        },
        {
            albumName: 'All That We Needed',
            albumId: 'AL-01019',
            artistName: 'Plain White T\'s',
            artistId: 'AT-01021',
            cover: "https://upload.wikimedia.org/wikipedia/en/0/08/All_That_We_Needed_%28album_cover%29.JPG"
        }
    ];
    res.render('search_album.ejs',{keyword,topAlbum});
});

app.get('/login',function(req, res){
    res.render('login_screen.ejs');
});

app.get('/manager', function(req, res){
    // let artist = [
    //     {artistName: 'AJR',artistId: 'AT-00001', artistCover: 'https://s3-us-west-2.amazonaws.com/paradigm-media-library/music_artists/ajr-20190501.jpg'},
    //     {artistName: 'Imagine Dragon',artistId: 'AT-00002', artistCover: 'https://mpics.mgronline.com/pics/Images/561000011690001.JPEG'},
    //     {artistName: 'All Time Low',artistId: 'AT-00003', artistCover: 'https://www.upsetmagazine.com/images/article/Artist-Images/A/All-Time-Low/Upset%20Cover%20Shoot%20Apr20/_crop1500x1000/All-Time-Low_London_February-2020_199.jpg'},
    //     {artistName: 'Maroon 5',artistId: 'AT-00004', artistCover: 'https://i.pinimg.com/originals/49/01/8f/49018fd5d24c32a141d556f5a00a8324.jpg'}
    // ];

    Artist.find({}, function(err, managedArtist){
        if(err){
            console.log(err);
        }
        else{
            res.render('manager_home.ejs', {user, artists: managedArtist});
        }
    })
    
    // res.render('manager_home.ejs',{user,artist});
});

app.post('/manager', function(req, res){
    let name = req.body.name;
    let imgUrl = req.body.imgUrl;
    let popularity = 0;
    console.log(name);
    let newArtist = {name: name, cover: imgUrl, popularity: popularity};
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

app.get('/manager/artist/add', function(req, res){
    res.render('manager_artist_add.ejs');
});

app.get('/manager/artist/:artistId', function(req, res){
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

app.get('/manager/artist/:artistId/add', function(req, res){
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

app.get('/manager/artist/:artistId/edit', function(req ,res){
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


app.get('/manager/artist/:artistId/album/:albumId', function(req, res){
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

app.get('/manager/artist/:artistId/album/:albumId/edit', function(req, res){
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

app.get('/manager/artist/:artistId/album/:albumId/add', function(req, res){
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

app.get('/manager/artist/:artistId/album/:albumId/song/:songId/edit', function(req, res){
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

app.get('/profile', function(req, res){
    
    res.render('user_profile.ejs',{user});
});

app.get('/profile/subscribe-protal', function(req, res){
    res.render('user_profile_subscribe.ejs',{user});
});

app.get('/profile/edit', function(req, res){
    res.render('user_profile_edit.ejs',{user});
});

app.get('/favorite', function(req, res){

    let fav = [
        {
            songTitle: 'OK Overture',
            songId: 'SN-01001',
            albumName: 'OK Orchestra',
            albumId: 'AL-00001',
            artistName: 'AJR',
            artistId: 'AT-00001',
            cover: 'https://upload.wikimedia.org/wikipedia/en/f/f3/Don%27t_Panic.jpg'
        },
        {
            songTitle: 'Bummerland',
            songId: 'SN-01002',
            albumName: 'OK Orchestra',
            albumId: 'AL-00001',
            artistName: 'AJR',
            artistId: 'AT-00001',
            cover: 'https://upload.wikimedia.org/wikipedia/en/f/f3/Don%27t_Panic.jpg'
        },
        {
            songTitle: '3 O\'Clock Things',
            songId: 'SN-01003',
            albumName: 'OK Orchestra',
            albumId: 'AL-00001',
            artistName: 'AJR',
            artistId: 'AT-00001',
            cover: 'https://upload.wikimedia.org/wikipedia/en/f/f3/Don%27t_Panic.jpg'
        },
        {
            songTitle: 'My Play',
            songId: 'SN-01004',
            albumName: 'OK Orchestra',
            albumId: 'AL-00001',
            artistName: 'AJR',
            artistId: 'AT-00001',
            cover: 'https://upload.wikimedia.org/wikipedia/en/f/f3/Don%27t_Panic.jpg'
        },
        {
            songTitle: 'Joe',
            songId: 'SN-01005',
            albumName: 'OK Orchestra',
            albumId: 'AL-00001',
            artistName: 'AJR',
            artistId: 'AT-00001',
            cover: 'https://upload.wikimedia.org/wikipedia/en/f/f3/Don%27t_Panic.jpg'
        },
        {
            songTitle: 'Adventure Is Out There',
            songId: 'SN-01006',
            albumName: 'OK Orchestra',
            albumId: 'AL-00001',
            artistName: 'AJR',
            artistId: 'AT-00001',
            cover: 'https://upload.wikimedia.org/wikipedia/en/f/f3/Don%27t_Panic.jpg'
        },
        {
            songTitle: 'Bang!',
            songId: 'SN-01007',
            albumName: 'OK Orchestra',
            albumId: 'AL-00001',
            artistName: 'AJR',
            artistId: 'AT-00001',
            cover: 'https://upload.wikimedia.org/wikipedia/en/f/f3/Don%27t_Panic.jpg'
        },
        {
            songTitle: 'The Trick',
            songId: 'SN-01008',
            albumName: 'OK Orchestra',
            albumId: 'AL-00001',
            artistName: 'AJR',
            artistId: 'AT-00001',
            cover: 'https://upload.wikimedia.org/wikipedia/en/f/f3/Don%27t_Panic.jpg'
        },
        {
            songTitle: 'Ordinaryish People',
            songId: 'SN-01009',
            albumName: 'OK Orchestra',
            albumId: 'AL-00001',
            artistName: 'AJR',
            artistId: 'AT-00001',
            cover: 'https://upload.wikimedia.org/wikipedia/en/f/f3/Don%27t_Panic.jpg'
        },
        {
            songTitle: 'Humpty Dumpty',
            songId: 'SN-01010',
            albumName: 'OK Orchestra',
            albumId: 'AL-00001',
            artistName: 'AJR',
            artistId: 'AT-00001',
            cover: 'https://upload.wikimedia.org/wikipedia/en/f/f3/Don%27t_Panic.jpg'
        },
        {
            songTitle: 'World\'s Smallest Violin',
            songId: 'SN-01011',
            albumName: 'OK Orchestra',
            albumId: 'AL-00001',
            artistName: 'AJR',
            artistId: 'AT-00001',
            cover: 'https://upload.wikimedia.org/wikipedia/en/f/f3/Don%27t_Panic.jpg'
        },
        {
            songTitle: 'Way Less Sad',
            songId: 'SN-01012',
            albumName: 'OK Orchestra',
            albumId: 'AL-00001',
            artistName: 'AJR',
            artistId: 'AT-00001',
            cover: 'https://upload.wikimedia.org/wikipedia/en/f/f3/Don%27t_Panic.jpg'
        },
        {
            songTitle: 'Christmas In June',
            songId: 'SN-01013',
            albumName: 'OK Orchestra',
            albumId: 'AL-00001',
            artistName: 'AJR',
            artistId: 'AT-00001',
            cover: 'https://upload.wikimedia.org/wikipedia/en/f/f3/Don%27t_Panic.jpg'
        }
    ];

    res.render('user_fav.ejs',{fav});
});

app.get('*', function(req, res){
    res.render('page_not_found.ejs');
});

app.listen('3000', function(req, res){
    console.log('Server is running');
});