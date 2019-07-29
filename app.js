const express = require("express")
const mongoose = require("mongoose")
const app = express()
const bodyParser = require('body-parser')
const db = require('./config/keys').mongoURI
app.use(bodyParser.json())
const cors = require('cors')
const postsRoute = require('./routes/posts')

app.use('/posts', postsRoute)
app.use(cors())

mongoose.connect(db, { useNewUrlParser: true }).then(()=> {
    console.log("We are connected to the mongoDB")
}).catch(err => {
    console.log("Failed to connected to DB")
})

const port = 1000   

app.listen(port, () =>{
    console.log(`We are connected on port: ${port}`)
})

app.get('', (req,res) => {
    res.send("We are connected")
})

app.use('', () => {
    console.log("We are on home")
})