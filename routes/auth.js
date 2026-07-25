const express=require('express');
const User = require('../models/User');
const router=express.Router();  //mini instance
const passport=require('passport');


// landing

router.get('/',(req,res)=>{
    res.render('auth/login');
})


//show the form of signup

router.get('/register',(req,res)=>{
    res.render('auth/signup');
})


// actually want to register a user in db

router.post('/register',async(req,res)=>{
    try{
        let {email,password,username,role}=req.body;
        const user=new User({email,username,role});
        const newuser=await User.register(user,password);
        // res.redirect('/login');
        req.login(newuser,function(err){
            if(err){
                return next(err);
            }
            req.flash('success','welcome ,you are registered successfully');
            res.redirect('/products');
        })

    }
    catch(e){
        req.flash('error',e.message);
        res.redirect('/signup');
    }
})

//to get a login form

router.get('/login',(req,res)=>{
    res.render('auth/login');
})



// to actually login via the db

router.post('/login',
    passport.authenticate('local',
    {
        failureRedirect: '/login', 
        failureMessage:true
    }),
    (req,res)=>{
        req.flash('success','welcome back')
        res.redirect('/products');
});





// logout
router.get('/logout', (req, res, next) => {

    req.logout(function(err) {

        if (err) {
            return next(err);
        }

        req.flash('success', 'Goodbye');

        res.redirect('/login');

    });

});




module.exports=router;


