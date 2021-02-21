const express = require('express');
require('dotenv').config({ path: './config.env' })

const path = require('path'); // NEW
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Helper = require('./helper.js');

const app = express();
const port = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, '../dist'); // NEW
const HTML_FILE = path.join(DIST_DIR, 'index.html'); // NEW

app.use(express.static(DIST_DIR)); // NEW

app.get('/movies', (req, res) => {
    res.sendFile(HTML_FILE); // EDIT
});

app.get('/new-released', (req, res) => {
    res.sendFile(HTML_FILE); // EDIT
});

app.get('/tv-shows', (req, res) => {
    res.sendFile(HTML_FILE); // EDIT
});

app.get('/', (req, res) => {
 res.sendFile(HTML_FILE); // EDIT
});

app.get('/signin/', (req,res) => {
   let userData = req.query;

   if(Helper.authenticateUser(userData)) {
    const hashedPassword = bcrypt.hashSync(userData.password, 8);

    const token = jwt.sign({id:hashedPassword}, userData.email, {expiresIn: 86400 });

    if(token){
        res.status(200)
        
        res.redirect('/').cookie('token', 'Bearer ' + token, {
            expires: new Date(Date.now() + 8 * 3600000) // cookie will be removed after 8 hours
          });
    
    }else {
        res.status(404).send({success: false, reason: 'Token creation failed!!'});
    }
   } else {
        res.status(401).send({success: false, reason: 'User unauthorized!'});
   }
  
});


app.listen(port, function () {
 console.log('App listening on port: ' + port);
});