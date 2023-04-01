module.exports=app =>{
const CustomerControll=require("../controllers/customer.controller.js");
const ProductControll=require("../controllers/product.controller.js");
const router=require("express").Router();

//customers
router.post("/save/customer",CustomerControll.create);
router.get("/get/customer",CustomerControll.findAll);

//Products
router.post("/save/product",ProductControll.create);
router.get("/get/products",ProductControll.findAll);


app.use("/v1",router)
};
