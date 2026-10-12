const express=require('express');
const router=express.Router();
const Product=require('../models/Product');
const Review =require('../models/Review');
const {isProductAuthor,validateproduct,isLoggedIn, isSeller}=require('../middleware');


// to show all the products

router.get('/products',isLoggedIn,async(req,res)=>{
    try{
        let products=await Product.find({});
    res.render('products/index',{products});
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
})


// to show the form for new products

router.get('/product/new',isLoggedIn,(req,res)=>{
    try{
        res.render('products/new');
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
});


// to actually add the product


router.post('/products',validateproduct, isLoggedIn,isSeller,async(req,res)=>{
    try{
        let {name,img,price,desc}=req.body;
        await Product.create({name,img,price,desc,author:req.user._id});
        req.flash('success','product added successfully');
        res.redirect('/products');
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
})


// to show the details of a product

router.get('/products/:id',isLoggedIn,async(req,res)=>{
    try{
        let {id}=req.params;
        let foundproduct=await Product.findById(id).populate('reviews');  //populate the reviews of the product
        res.render('products/show',{foundproduct});
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
});

// form to edit a product

router.get('/products/:id/edit',isLoggedIn,async(req,res)=>{
    try{
        let{id}=req.params;
        let foundproduct=await Product.findById(id);
        res.render('products/edit',{foundproduct});
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
})


// to actually edit the data in db


router.patch('/products/:id',isLoggedIn,validateproduct,async(req,res)=>{
    try{
        let {id}=req.params;
        let {name,img,price,desc}=req.body;
        await Product.findByIdAndUpdate(id,{name,img,price,desc});
        req.flash('success','product edited successfully');
        res.redirect(`/products/${id}`);
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
});



// delete a product

router.delete('/products/:id', isProductAuthor, isLoggedIn,async(req,res)=>{
   try{
       let {id}=req.params;
       const product=await Product.findById(id);
       // for(let id of product.reviews){
           // await Review.findByIdAndDelete(id);
       // }
        await Product.findByIdAndDelete(id);
        req.flash('error','product deleted successfully');
        res.redirect('/products');
   }
   catch(e){
        res.status(500).render('error',{err:e.message});
    }
});



module.exports=router;


