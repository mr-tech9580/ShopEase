const express=require('express');
const app=express();
const path=require('path');
const mongoose = require('mongoose');
const seedDB=require('./seed');
const ejsmate=require('ejs-mate');
const methodOverride=require('method-override');
const session=require('express-session');
const flash=require('connect-flash');
const passport=require('passport');
const LocalStrategy=require('passport-local');
const User=require('./models/User');


 


const productsroute=require('./routes/product');
const reviewroute=require('./routes/review');
const authroutes=require('./routes/auth');
const cartroutes=require('./routes/cart');
const productapi=require('./routes/api/productapi');



app.use(methodOverride('_method'));   //to override the method of form from post to put/patch or delete


mongoose.connect('mongodb+srv://meghaofficial9580_db_user:SIZzVXfHvO4ssFNg@cluster0.pla1znj.mongodb.net/shop')
.then(()=>{
    console.log('DB Connected successfully');
})
.catch((err)=>{
    console.error('Error connecting DB');
    console.log(err);
});

// seedDB();

let configsession={
    secret:'keyboard cat',
    resave: false,
    saveUninitialized:true,
    cookie:{
        httpOnly:true,
        expires:Date.now()+1000*60*60*24*7,   //cookie will expire in 7 days
        maxAge:1000*60*60*24*7
    }
};


app.engine('ejs',ejsmate);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));    //views folder
app.use(express.static(path.join(__dirname,'public')));   //public folder
app.use(express.urlencoded({extended:true}));   //to parse the form data
app.use(session(configsession));
app.use(flash());


app.use(passport.initialize());    //initializes Passport.js,"Passport is now active and ready to authenticate users."
app.use(passport.session());        // tells Passport to use Express sessions so that the user stays logged in.


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req,res,next)=>{
    res.locals.currentUser=req.user;
    res.locals.success=req.flash('success');
    res.locals.error=req.flash('error');
    next();
})


// passport

passport.use(new LocalStrategy(User.authenticate()));





// seeding the database

// app.get('/',async(req,res)=>{
//     await seedDB();
//     res.send('Database seeded successfully');
// });

app.use(productsroute);  //so that har incoming request par chale ga ye route file
app.use(reviewroute);  //so that har incoming request par chale ga ye route file
app.use(authroutes);  
app.use(cartroutes);
app.use(productapi);



app.listen(8080,()=>{
    console.log('Server is running on port 8080');
})



