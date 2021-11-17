const express = require('express'); //look inside node modules and give me access to express code

const path = require('path');

const app = express()

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'))
})//res.sendFile is expecting absolute file path to be sending(meaning not related to where we are currently at...it wants user/desktop/folder/file.html)
// dirname represents index.js, ../index.html is telling path.join where index.html is

//server ready to send file to anything that makes a request to it

app.get('/css', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.css'))
  })


const port = process.env.PORT || 4006  //logical or statement to set port

app.listen(port, ()=> {
    console.log(`My app is JAMMIN on port number ${port}`)
})  //will allow app to listen to port