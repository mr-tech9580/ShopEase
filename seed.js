const mongoose=require('mongoose');
const Product=require('./models/Product');

const products= [
    {
        name:"Louis Vuitton Neverfull MM",
        img:"https://in.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-multipass--M2A078_PM2_Front%20view.png?wid=1090&hei=1090",
        price:185000,
        desc:"Iconic luxury tote with premium craftsmanship and timeless design."
    },
    {
        name:"Louis Vuitton All in BB",
        img:"https://in.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-all-in-bb--M29835_PM2_Front%20view.png?wid=1090&hei=1090",
        price:240000,
        desc:"Elegant leather shoulder bag with a signature finish."
    },
    {
        name:"Louis Vuitton Multipass",
        img:"https://in.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-multipass--M29195_PM2_Front%20view.png?wid=1090&hei=1090",
        price:295000,
        desc:"Luxurious leather handbag with a sophisticated look."
    },
    {
        name:"Louis Vuitton Nano Madeliene",
        img:"https://in.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-nano-madeleine--M12144_PM2_Front%20view.png?wid=1090&hei=1090",
        price:480000,
        desc:"A timeless luxury handbag "
    },
    {
        name:"Louis Vuitton Alma Trunk BB",
        img:"https://in.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-alma-trunk-bb--M2A301_PM2_Front%20view.png?wid=1090&hei=1090",
        price:850000,
        desc:"Premium quilted leather bag with the chain strap."
    }
];

async function seedDB(){
    await Product.insertMany(products);
    console.log("data seeded successfully");
}

module.exports=seedDB;