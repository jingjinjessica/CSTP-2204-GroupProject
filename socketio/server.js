const express = require('express');
const app = express();
const mongoose = require('mongoose');
const messageModel = require('./models/messages')
//const messsageOwnerModel = require('./models/messages')

const usernameModel = require('./models/username')
const http = require('http').Server(app);

var io = require('socket.io')(http);

const mongoURL = 'mongodb+srv://Nicole:Fgonicole03@cluster01.astuaml.mongodb.net/?retryWrites=true&w=majority';

mongoose.set('strictQuery', false)
mongoose.connect(mongoURL, {useNewUrlParser: true}).then(() => {
    console.log('MongoDB is now connected')
}).catch(err => console.log(err))

app.set('view-engine', 'ejs')

// Allows for express to accept any input data from the website
// and be put to the body so it can be used as req.body 
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Users are put in here
users = []


app.get('/login', (req, res) =>{
    res.render('login.ejs');
});

app.get('/register', (req, res) => {
    res.render('register.ejs');
});

io.on('connection', (socket) => {

    
    messageModel.find().then((result) => {
        
        socket.emit('output-messages', result)
        
    })

    console.log('User is connected')

    // Send a message after a timeout of 4s
    // setTimeout(function(){
    //     socket.emit('testerEvent',{ description: 'testerEvent'});
    // }, 4000);

    socket.on('setUsername', function(data){
        const username = new usernameModel({username: data})
        //console.log("username.username: " + username.username)
        

        usernameModel.find({}).then((result) => {
            result.forEach(results => {
                if(username.username === results.username) {
                    
                    socket.emit('userExists', data + ' username is taken! Try other username');

                } 
            });
        })

        username.save().then(() => {
            io.sockets.emit('userSet', data)
             
            // console.log("username.username: " + username.username);
            // console.log("data.username: " + data); // Wrong method of getting username
        })

        // This one is using fake database
        // if(users.indexOf(data) > -1){

        //     socket.emit('userExists', data + ' username is taken! Try other username');
            
        // } else {
        //     users.push(data);
        //     socket.emit('userSet', data);
            
        // }
    });

    socket.on('msg', async function(data){

        
        const messageStr = new messageModel({
            name: data.username,
            message: data.message
        })

        await messageStr.save().then(() => {
            io.sockets.emit('newMsg', data);
        });
        
        // messageStr.content = data.message;
        // messageStr.name = data.username;

        console.log("messageStr: " + messageStr.name)
        console.log("messageStr: " + messageStr.message)
        //const username = new usernameModel({username: data.username})

        // messageStr.save().then(() => {
            
        //     // Send message to everyone
        //     io.sockets.emit('newMsg', data);
        //     console.log(messageStr.name)
        // })
        
    });

    socket.on('disconnect', function(){
        console.log("User is disconnected")
    });
});

app.use(express.static('public'))

http.listen(3000, function(){
    console.log('Listening on 3000');
});