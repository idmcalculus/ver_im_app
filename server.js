const path = require('path');
const express = require('express');
const app = express();
const appName = 'versaim-app';
const Promise = require('promise');
const request = require('request');
const compression = require('compression')



var cors = require('cors');
app.use(cors())
app.use(compression())


// app.use(function(req, res, next) {
//     if(!req.secure) {
//         return res.redirect(['https://', req.get('Host'), req.url].join(''));
//     }
//     next();
// });

const forceSSL = function() {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(['https://', req.get('Host'), req.url].join(''));
    }
    next();
  }
}

app.use(forceSSL());

app.use(express.static(__dirname + `/dist/${appName}`));


app.get('/yahoo/:code', function(req, res) {
  var authCode = req.params.code;
  yahooAccessoken(authCode).then(resp=>{
    res.send(resp)
  })  
});

app.get('/yahoo/getprofile/:auth/:userid', function(req, res) {
  var auth = req.params.auth;
  var userid = req.params.userid;
  yahooGetProfile(auth,userid).then(resp=>{
    res.send(resp)
  })  
});



app.get('/linkedin/:code', function(req, res) {
  var authCode = req.params.code;
  linkedinAccessoken(authCode).then(resp=>{
    res.send(resp)
  })
  
});


app.get('/linkedin/getprofile/:auth', function(req, res) {
  var auth = req.params.auth;
  linkedinGetProfile(auth).then(resp=>{
    res.send(resp)
  })
  
});

app.get('/*', function(_req, res) {
  res.sendFile(path.join(__dirname + `/dist/${appName}/index.html`));
});


var listener = app.listen(process.env.PORT || 8990, function(){
  console.log('Listening on port ' + listener.address().port); //Listening on port 8888
});

function yahooAccessoken(codestring) {
  return new Promise(function(resolve,_reject){
    request.post('https://api.login.yahoo.com/oauth2/get_token', {
      form: {
        grant_type: 'authorization_code',
        code: codestring,
        // redirect_uri: 'https://versa.ng',
        // client_id: 'dj0yJmk9Q01TdTRFbHZNVjJjJmQ9WVdrOVdVdFRORE5oTkdzbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PWYx',
        // client_secret: '60cd5ca9a18f67c3bf418f98218a6fc177d4ac6c'
        redirect_uri: 'http://versa-ims.herokuapp.com',
        client_id: 'dj0yJmk9eHNIendLV2NJU2gwJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTg5',
        client_secret: '74822b31d3242615561b84a5ece6020b9ef5d9a3'
      }
    }, (error, res, body) => {
      if (error) {
        console.error("error is: "+error)
        resolve(error);
      }else{
        console.log(`statusCode: ${res.statusCode}`)
        console.log(body)
        resolve(body);
      }
    })
  })    
}

function linkedinAccessoken(codestring) {
  return new Promise(function(resolve,_reject){
    request.post('https://www.linkedin.com/oauth/v2/accessToken', {
      form: {
        grant_type: 'authorization_code',
        code: codestring,
        // redirect_uri: "https://versa.ng",
        // client_id: '8604gpqc8lasyf',
        // client_secret: 'BhWw3I9ufi6KLr0k'
        redirect_uri: "http://versa-ims.herokuapp.com",
        client_id: '77pv3mo63oyixv',
        client_secret: 'WXSct7I6waMjYI06'
      }
    }, (error, res, body) => {
      if (error) {
        console.error("error is: "+error)
        resolve(error);
      }else{
        console.log(`statusCode: ${res.statusCode}`)
        console.log(body)
        resolve(body);
      }
    })
  })    
}

function linkedinGetProfile(auth_token) {
  return new Promise(function(resolve,_reject){
    request.get(`https://api.linkedin.com/v2/me`, {
      headers:{
        'Authorization':`Bearer ${auth_token}`
      }
    }, (error, res, body) => {
      if (error) {
        console.error("error is: "+error)
        resolve(error);
      }else{
        console.log(`statusCode: ${res.statusCode}`)
        linkedinGetEmail(auth_token).then(resp=>{
          var fine = {profile:body,email:resp}
            console.log("isshu re :: "+JSON.stringify(fine))
            resolve(fine)
        })
      }
    })
  })    
}

function linkedinGetEmail(auth_token) {
  return new Promise(function(resolve,_reject){
    request.get(`https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))`, {
      headers:{
        'Authorization':`Bearer ${auth_token}`
      }
    }, (error, res, body) => {
      if (error) {
        console.error("error is: "+error)
        resolve(error);
      }else{
        console.log(`statusCode: ${res.statusCode}`)
        console.log(body)
        resolve(body);
      }
    })
  })    
}

function yahooGetProfile(auth_token,user_id) {
  return new Promise(function(resolve,_reject){
    request.get(`https://social.yahooapis.com/v1/user/${user_id}/profile?format=json`, {
      headers:{
        'Authorization':`Bearer ${auth_token}`
      }
    }, (error, res, body) => {
      if (error) {
        console.error("error is: "+error)
        resolve(error);
      }else{
        console.log(`statusCode: ${res.statusCode}`)
        console.log(body)
        resolve(body);
      }
    })
  })    
}
