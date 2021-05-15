var express             = require('express'),
    router              = express.Router(),
    multer              = require('multer'),
    path                = require('path'),
    profileStorage      = multer.diskStorage({
        destination: function(req, file, callback){
            callback(null,'./public/uploads/profiles/');
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
    uploads             = multer({storage: profileStorage, fileFilter: imageFilter}),
    Artist              = require('../models/artist'),
    Album               = require('../models/album'),
    Song                = require('../models/song'),
    User                = require('../models/user'),
    SubscriptionDetail  = require('../models/subscriptionDetail'),
    Favorite            = require('../models/favorite');


    
router.get('/', isManager, isLoggedIn, function(req, res){
    
    res.render('profile/profile.ejs',{user: req.user});
});

router.get('/subscribe-protal', isManager, isLoggedIn, function(req, res){
    res.render('profile/subscribe.ejs',{user: req.user});
});

router.post('/subscribe', function(req, res){
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

router.post('/unsubscribe', function(req, res){
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

router.get('/edit', isManager, isLoggedIn, function(req, res){
    res.render('profile/edit.ejs');
});

router.post('/edit', isLoggedIn, uploads.single('profilePicture'), function(req, res){
    if(typeof req.file !== "undefined"){
        if(typeof req.file.filename !== "undefined"){
            req.body.profile.profilePicture = "/uploads/profiles/" + req.file.filename;
        }    
    }
    
    User.findByIdAndUpdate(req.body.id, req.body.profile, function(err, user){
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

router.get('/change-password', isManager, isLoggedIn, function(req, res){
    res.render('profile/change_password.ejs');
})

router.post('/change-password', isLoggedIn, isLoggedIn, function(req, res){
    User.findById(req.user._id).exec(function(err, user){
        if(err){
            console.log(err);
        }
        else{
            user.changePassword(req.body.oldPassword, req.body.newPassword, function(err){
                if(err){
                    console.log(err);
                    let alertMessage = 'Incorrect Password'
                    res.render('profile/change_password', {alertMessage});
                }
                else{
                    res.redirect('/profile');
                }
            });        
        }
    });
    
});

router.get('/manager-register', isManager, isLoggedIn, function(req, res){
    res.render('profile/manager_register.ejs');
})

router.post('/manager-register', isLoggedIn, function(req, res){
    
    User.findByIdAndUpdate(req.user._id, {status: 'manager'}).exec(function(err, user){
        if(err){
            console.log(err);
        }
        else{
            res.redirect('/manager');
        }
    })
    
})

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

module.exports = router;