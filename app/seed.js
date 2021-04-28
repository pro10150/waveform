var mongoose = require('mongoose');
var Artist = require('./models/artist');
var Album = require('./models/album');
var Song = require('./models/song');

var artist = [
    {
        name: 'AJR',
        cover: 'https://s3-us-west-2.amazonaws.com/paradigm-media-library/music_artists/ajr-20190501.jpg',
        popularity: 8000
    }
]

var album = [
    {
        name: 'Living Room',
        cover: 'http://images.genius.com/5a3527f335351f4ce9e09d92920321a4.640x640x1.jpg',
        popularity: 499
    }
    ,
    {
        name: 'The Click',
        cover: 'https://c.min.ms/t/d/member/c/19/19174/pagegallery/1499703294/1dad936c.jpg',
        popularity: 456
    },
    {
        name: 'Neotheater',
        cover: 'https://pbs.twimg.com/media/D5vBebOWwAANB1I.jpg',
        popularity: 455
    },
    {
        name: 'OK Orchestra',
        cover: 'https://s.isanook.com/jo/0/rp/r/w700/ya0xa0m1w0/aHR0cDovL2ltYWdlLmpvb3guY29tL0pPT1hjb3Zlci8wLzg0YWRlZTQwZjMwMjg4MDgvMTAwMC5qcGc=.jpg',
        popularity: 999
    }
]

var song = [
    {
            title: 'Next Up Forever',
            lyrics: "Your eyes are open\
            So never close them\
            You\'ll sail the ocean\
            Finding where you should be\
            And if you\'re broken\
            You\'ll make your own thing\
            You\'ll make it so big\
            For all the world to see\
            You\'ll make it so damn big\
            For all the world to see\
            I\'m kinda scared to drop this album\
            Let\'s push it back another week\
            I wanna be next up forever\
            Find a way to never hit my peak\
            I kinda wish I was still a virgin\
            Time to finally see what sex is like\
            I wanna be next up forever\
            Forever I\'ll be second in line\
            Someday they\'ll be talking about me\
            Right now they\'re just walking around me\
            My God\, are you growing without me?\
            Somebody help me (somebody help me)\
            Someday they\'ll be talking about me\
            Right now they\'re just walking around me\
            My God, are you growing without me?\
            Somebody help me (somebody help me, somebody help me, somebody help me)\
            This is my imagination\
            This is how it looks and sounds\
            But I gotta go so much bigger\
            So they can never shut me down\
            I\'m kinda scared of graduation\
            \'Cause who am I when this is done?\
            I wanna be next up forever\
            So the best is always yet to come\
            Someday they\'ll be talking about me\
            Right now they\'re just walking around me\
            My God, are you growing without me?\
            Somebody help me (somebody help me)\
            Someday they\'ll be talking about me\
            Right now they\'re just walking around me\
            My God\, are you growing without me?\
            Somebody help me (somebody help me, somebody help me, somebody help me)\
            I gotta go so much bigger\
            So everybody\'s proud of me\
            Welcome to the Neotheater\
            Won\'t everybody take their seats?\
            And I\'ll be next up forever\
            \'Cause I don\'t know what\'s coming next\
            I know I gotta grow up sometime\
            But I don\'t think I\'m ready yet\
            I know I gotta grow up sometime\
            But I\'m not fucking ready yet\
            Your eyes are open\
            So never close them\
            You\'ll sail the ocean\
            Finding where you should be\
            And if you\'re broken\
            You\'ll make your own thing\
            You\'ll make it so big\
            For all the world to see\
            You\'ll make it so damn big\
            For all the world to see",
            popularity: 800
        },
        {
            title: 'Birthday Party',
            lyrics: '',
            popularity: 60
        },
        {
            title: '100 Bad Days',
            lyrics: '',
            popularity: 75
        },
        {
            title: 'Don\'t Throw out My Legos',
            lyrics: '',
            popularity: 43
        },
        {
            title: 'Break My Face',
            lyrics: '',
            popularity: 33
        },
        {
            title: 'Turning Out Pt. ii',
            lyrics: '',
            popularity: 45
        },
        {
            title: 'The Entertainment\'t Here',
            lyrics: '',
            popularity: 879
        },
        {
            title: 'Karma',
            lyrics: '',
            popularity: 40
        },
        {
            title: 'Beats',
            lyrics: '',
            popularity: 1
        }
]

function seedDB(){
    Artist.remove({}, function(err){
        if(err){
            console.log(err);
        }
        Album.remove({}, function(err){
            if(err){
                console.log(err);
            }
            Song.remove({}, function(err){
                if(err){
                    console.log(err);
                }
                console.log('Remove DB completed');
                artist.forEach(function(seed){
                    Artist.create(seed,function(err, artist){
                        if(err){
                            console.log(err);
                        }
                        else{
                            console.log('new artist added');
                            Album.create({
                                name: 'Living Room',
                                cover: 'http://images.genius.com/5a3527f335351f4ce9e09d92920321a4.640x640x1.jpg',
                                popularity: 499
                            }
                            ,
                            {
                                name: 'The Click',
                                cover: 'https://c.min.ms/t/d/member/c/19/19174/pagegallery/1499703294/1dad936c.jpg',
                                popularity: 456
                            },
                            {
                                name: 'Neotheater',
                                cover: 'https://pbs.twimg.com/media/D5vBebOWwAANB1I.jpg',
                                popularity: 455
                            },
                            {
                                name: 'OK Orchestra',
                                cover: 'https://s.isanook.com/jo/0/rp/r/w700/ya0xa0m1w0/aHR0cDovL2ltYWdlLmpvb3guY29tL0pPT1hjb3Zlci8wLzg0YWRlZTQwZjMwMjg4MDgvMTAwMC5qcGc=.jpg',
                                popularity: 999
                            }, function(err, albumSeed){
                                if(err){
                                    console.log(err);
                                }
                                else{
                                    console.log('new album added');
                                    artist.albums.push(albumSeed);
                                    artist.save();
                                    Song.create({
                                        title: 'Next Up Forever',
                                        lyrics: "Your eyes are open\
                                        So never close them\
                                        You\'ll sail the ocean\
                                        Finding where you should be\
                                        And if you\'re broken\
                                        You\'ll make your own thing\
                                        You\'ll make it so big\
                                        For all the world to see\
                                        You\'ll make it so damn big\
                                        For all the world to see\
                                        I\'m kinda scared to drop this album\
                                        Let\'s push it back another week\
                                        I wanna be next up forever\
                                        Find a way to never hit my peak\
                                        I kinda wish I was still a virgin\
                                        Time to finally see what sex is like\
                                        I wanna be next up forever\
                                        Forever I\'ll be second in line\
                                        Someday they\'ll be talking about me\
                                        Right now they\'re just walking around me\
                                        My God\, are you growing without me?\
                                        Somebody help me (somebody help me)\
                                        Someday they\'ll be talking about me\
                                        Right now they\'re just walking around me\
                                        My God, are you growing without me?\
                                        Somebody help me (somebody help me, somebody help me, somebody help me)\
                                        This is my imagination\
                                        This is how it looks and sounds\
                                        But I gotta go so much bigger\
                                        So they can never shut me down\
                                        I\'m kinda scared of graduation\
                                        \'Cause who am I when this is done?\
                                        I wanna be next up forever\
                                        So the best is always yet to come\
                                        Someday they\'ll be talking about me\
                                        Right now they\'re just walking around me\
                                        My God, are you growing without me?\
                                        Somebody help me (somebody help me)\
                                        Someday they\'ll be talking about me\
                                        Right now they\'re just walking around me\
                                        My God\, are you growing without me?\
                                        Somebody help me (somebody help me, somebody help me, somebody help me)\
                                        I gotta go so much bigger\
                                        So everybody\'s proud of me\
                                        Welcome to the Neotheater\
                                        Won\'t everybody take their seats?\
                                        And I\'ll be next up forever\
                                        \'Cause I don\'t know what\'s coming next\
                                        I know I gotta grow up sometime\
                                        But I don\'t think I\'m ready yet\
                                        I know I gotta grow up sometime\
                                        But I\'m not fucking ready yet\
                                        Your eyes are open\
                                        So never close them\
                                        You\'ll sail the ocean\
                                        Finding where you should be\
                                        And if you\'re broken\
                                        You\'ll make your own thing\
                                        You\'ll make it so big\
                                        For all the world to see\
                                        You\'ll make it so damn big\
                                        For all the world to see",
                                        popularity: 800
                                    },
                                    {
                                        title: 'Birthday Party',
                                        lyrics: '',
                                        popularity: 60
                                    },
                                    {
                                        title: '100 Bad Days',
                                        lyrics: '',
                                        popularity: 75
                                    },
                                    {
                                        title: 'Don\'t Throw out My Legos',
                                        lyrics: '',
                                        popularity: 43
                                    },
                                    {
                                        title: 'Break My Face',
                                        lyrics: '',
                                        popularity: 33
                                    },
                                    {
                                        title: 'Turning Out Pt. ii',
                                        lyrics: '',
                                        popularity: 45
                                    },
                                    {
                                        title: 'The Entertainment\'t Here',
                                        lyrics: '',
                                        popularity: 879
                                    },
                                    {
                                        title: 'Karma',
                                        lyrics: '',
                                        popularity: 40
                                    },
                                    {
                                        title: 'Beats',
                                        lyrics: '',
                                        popularity: 1
                                    }, function(err, songSeed){
                                        if(err){
                                            console.log(err);
                                        }
                                        else{
                                            console.log('new song added');
                                            albumSeed.songs.push(songSeed);
                                            albumSeed.save();
                                        }
                                    });
                                }
                            });
                        }
                    });
                });
            })
        })
        
    });
}

module.exports = seedDB;