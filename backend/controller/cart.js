const db = require('../database/index')


const postProduct = async function(req,res) {

    try {
        let x = await db.Cart_product.findAll()
        console.log("xxxxxxx", x)
        var Cart = await db.Cart.findByPk(req.body.CartId)
           if(!Cart) {
            Cart = await db.Cart.create({userId: req.body.userid})
           }
        var product = await db.Product.findByPk(req.body.ProductId)
         await db.Cart_product.create({ProductId: product.id, CartId: Cart.id, quantity: req.body.quantity })

        console.log("cart", Cart)
        // console.log("add", db.Cart.addProduct)

        res.send("product created in cart")
    }
    catch(err) {
    console.log(err)
    }

}

const getProduct = async function(req , res) {
    try {
        let xx = await db.Cart.findByPk(req.params.id ,{include : db.Product})
    
        console.log(xx);
res.send(xx)    }
 catch (err) {
        console.log(err);
    }
};




module.exports = {postProduct, getProduct}