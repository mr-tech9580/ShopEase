const express=require('express');
const router=express.Router();
const Product=require('../models/Product');
const Review=require('../models/Review');
const {validatereview}=require('../middleware');

router.post('/products/:id/review',validatereview,async(req,res)=>{
    try{
        let {id}=req.params;
        let {rating,comment}=req.body;  
        const product=await Product.findById(id);  //product find hua jisme review dalna hai
        const review=new Review({rating,comment});
        
        product.reviews.push(review);  //review ko product ke reviews array me dal diya
        await review.save();  //review ko save kar diya
        await product.save();
        req.flash('success','review added successfully');
        res.redirect(`/products/${id}`);  //redirect to the product page
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }

})




module.exports=router;


