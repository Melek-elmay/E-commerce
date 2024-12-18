const express = require("express")
const cors = require("cors")


const app = express();
app.use(express.json());
app.use(cors()); 
require("./database/index.js");

const port = 3000; 
const userRoute = require("./router/user.js")
const cartrouter = require("./router/cart.js")
const productRouter = require("./router/product.js")

app.use("/user", userRoute)

app.use("/cart", cartrouter)

app.use("/prod", productRouter)

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})