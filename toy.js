var express = require('express');
var router = express.Router();
const ToyModel = require("./models/ToyModel");
const { createNewProduct, viewAllProduct, deleteProduct, findProduct, updateProduct } = require('./database');
const { handlebars } = require('hbs');


handlebars.registerHelper("inc", function (index) {
    return index + 1;
});

handlebars.registerHelper("lar", function (price) {
    return price > 100;
})

router.get("/", async (req, res) => {
    let results = await viewAllProduct();
    res.render("Toy/index", { results: results });
})

router.get("/create", (req, res) => {
    res.render("Toy/createProduct");
})


router.post("/create", async (req, res) => {
    const name = req.body.txtName;
    const price = req.body.txtPrice;
    const pic = req.body.pic;
    const newProduct = new ToyModel();
    newProduct.name = name;
    newProduct.price = price;
    newProduct.pic = pic;
    if (name.trim().lenght > 20) {
        let modelError = {
            nameError: "You must enter Name!",
        };
        res.render('Toy/createProduct', { results: modelError });
    } else if (isNaN(price)) {
        let modelError1 = { priceError: "  please enter number" };
        res.render('Toy/createProduct', { results: modelError1 });
    } else if (price < 0 || price > 20000) {
        let modelError2 = { priceError: "  please input price 50 to 100" };
        res.render('Toy/createProduct', { results: modelError2 });
    }
    else {
        let id = await createNewProduct(newProduct);
        console.log(id);
        res.redirect("/products");
    }
})



router.get("/delete", async (req, res) => {
    const id = req.query.id;
    await deleteProduct(id);
    res.redirect("/products");
})

router.get("/update", async (req, res) => {
    const id = req.query.id;
    const productToEdit = await findProduct(id);
    res.render("Toy/updateProduct", { Product: productToEdit });
})

router.post("/update", async (req, res) => {
    const id = req.body.id;
    const name = req.body.txtName;
    const price = req.body.txtPrice;
    const pic = req.body.pic;
    await updateProduct(id, name, price, pic);
    res.redirect("/products");
})

router.get("/mystyle", async (req, res) => {
    res.render("/mystyle.css")
})


module.exports = router