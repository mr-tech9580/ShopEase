const { productschema, reviewschema } = require('./schema');
const Product = require('./models/Product');



const validateproduct = (req, res, next) => {
    const { error } = productschema.validate(req.body);

    if (error) {
        const msg = error.details.map(el => el.message).join(', ');
        return res.status(400).render('error', { err: msg });
    }

    next();
};

const validatereview = (req, res, next) => {
    const { error } = reviewschema.validate(req.body);

    if (error) {
        const msg = error.details.map(el => el.message).join(', ');
        return res.status(400).render('error', { err: msg });
    }

    next();
};

const isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash('error','please login');
        return res.redirect('/login');
    }
    next();
}

const isSeller=(req,res,next)=>{
    if(!req.user.role){
        req.flash('error','you are not authorized to perform this action');
        return res.redirect('/products');
    }
    else if(req.user.role!=='seller'){
        req.flash('error','you are not authorized to perform this action');
        return res.redirect('/products');
    }
    next();
}



const isProductAuthor=async(req,res,next)=>{
    let {id}=req.params;   //product id
    let product=await Product.findById(id);  //entire product object
    if(!product.author.equals(req.user._id)){
        req.flash('error','you are not the author of this product');
        return res.redirect('/products');
    }
    next(); 
}




module.exports = { isProductAuthor,isLoggedIn,validateproduct, validatereview,isSeller};