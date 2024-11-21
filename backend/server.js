const express = require("express")
const cors = require("cors")


const app = express();
app.use(express.json());
app.use(cors()); 
require("./database/index.js");
const port = 3000; 

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})