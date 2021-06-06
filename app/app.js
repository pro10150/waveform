const favorite = require('./models/favorite');

const   express             = require('express'),
        app                 = express(),
        bodyParser          = require('body-parser'),
        mongoose            = require('mongoose'),
        passport            = require('passport'),
        LocalStrategy       = require('passport-local'),
        flash               = require('connect-flash'),
        Artist              = require('./models/artist'),
        Album               = require('./models/album'),
        Song                = require('./models/song'),
        User                = require('./models/user'),
        SubscriptionDetail  = require('./models/subscriptionDetail'),
        Favorite            = require('./models/favorite'),
        seedDB              = require('./seed');

var     managerRoutes   = require('./routes/manager'),
        profileRoutes   = require('./routes/profile'),
        searchRoutes    = require('./routes/search'),
        favoriteRoutes  = require('./routes/favorite'),
        indexRoutes     = require('./routes/index');

// seedDB();
mongoose.connect('mongodb://localhost/waveform');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(flash());
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
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

app.use('/', indexRoutes);
app.use('/manager', managerRoutes);
app.use('/profile', profileRoutes);
app.use('/search', searchRoutes);
app.use('/favorite', favoriteRoutes);






app.get('*', function(req, res){
    res.render('page_not_found.ejs');
});

app.listen('3000', function(req, res){
    console.log('Server is running');
});