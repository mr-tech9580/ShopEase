const express=require('express');
const router=express.Router();
let {isLoggedIn}=require('../../middleware');
const User=require('../../models/User');


router.post('/product/:productId/like',isLoggedIn,async(req,res)=>{
    let{productId}=req.params;
    let user=req.user;
    let isLiked=user.wishList.includes(productId);


    // write either 16-21 code or 24....both works the same way but 24 is more efficient and clean


    // if(isLiked){
    //     User.findByIdAndUpdate(req.user._id,{$pull:{wishList:productId}});
    // }
    // else{
    //     User.findByIdAndUpdate(req.user._id,{$addToSet:{wishList:productId}});
    // }

    const option=isLiked ? '$pull' : '$addToSet';
    req.user=await User.findByIdAndUpdate(user._id,{[option]:{wishList:productId}},{new:true});
    res.send('like done api');
})

module.exports=router;