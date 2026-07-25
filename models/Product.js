const mongoose = require('mongoose');
const Review=require('./Review');



const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    img:{
        type:String,
        required:true,
        trim:true,
        // default:
    },
    price:{
        type:Number,
        required:true,
        // min:0
    },
    desc:{
        type:String,
        trim:true
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,   //type of this field is object id and it will refer to the review model
            ref:'Review'     //ref is the name of the model which we want to refer to
        }
    ],
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'   //ref is the name of the model which we want to refer to
    }
});



// middlewware jo behind the scene operations karwane par use hote hai 
// pre middleware hote hai which are basically used over the schema and before the model is js class

productSchema.post('findOneAndDelete',async function(product){
    if(product.reviews.length>0){
        await Review.deleteMany({_id:{$in:product.reviews}});
    }
})




let Product=mongoose.model('Product',productSchema);

module.exports=Product;   //so that you can use this model

