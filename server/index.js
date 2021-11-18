const express = require('express'); //look inside node modules and give me access to express code
const path = require('path');
const app = express()

//ROLLBAR SECTION START////////////////////////////
const server = express()
// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '0d63539d05c24f29ae5a113f3f35a301',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

let welcomeResponse = "Welcome to the API"
let names = ['Katie', 'Edrea', 'Cam']
// record a generic message and send it to Rollbar
// rollbar.warning("warning message")
// rollbar.critical("critical message")
// rollbar.log('Hello world!')
// rollbar.debug("Cron job starting");

app.get('/get', function(req, res) {
    rollbar.info('someone tapped the api')
    res.send(welcomeResponse)

    if (names.length > 1){
        rollbar.warning("waning on checking names")
    }
    if (names.includes('Cam')){
        rollbar.critical("Student is in array")
    }
    if (!names.includes('Jerrell')){
        rollbar.debug("Student is NOT in array")
    }    
})

app.put('/put', function(req, res) {
    rollbar.info('someone tried to update')
    res.send('update data')
    .catch((err) => {
        const Error = err
        console.log('ERROR', err)
        Rollbar.error(Error)
    })

})

app.post('/post', function(req,res) {
    res.send('Request')
    if(!names.includes('Jerrell')){
        rollbar.critical('POST: Student cannot post')
    }
})

app.delete('/delete', function(req,res) {
    res.send('Delete Request')
    .catch((err) => {
        Rollbar.error('DELETE: Student cannot be deleted')
    })
})



//ROLLBAR SECTION END/////////////////////////////////

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'))
})//res.sendFile is expecting absolute file path to be sending(meaning not related to where we are currently at...it wants user/desktop/folder/file.html)
// dirname represents index.js, ../index.html is telling path.join where index.html is

//server ready to send file to anything that makes a request to it

app.get('/css', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.css'))
  })





const port = process.env.PORT || 4006  //logical or statement to set port

server.use(rollbar.errorHandler());

app.listen(port, ()=> {
    console.log(`My app is JAMMIN on port number ${port}`)
})  //will allow app to listen to port