const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user');

mongoose.connect('mongodb+srv://admin:admin228@cluster0.izfij.mongodb.net/googleIdApp?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.get('/get-user', (req, res) => {
  User.find()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      console.log(`Errors: ${err}`);
    })
})

app.post('/post-user', (req, res) => {
  User.find({ userEmail: req.body.userEmail }, (err, docs) => {
    if (err) {
      console.log(`Errors: ${err}`);
    }
    if (docs.length) {
      res.send('This email is in database');
    }
    else {
      const user = new User({
        userName: req.body.userName,
        userFamilyName: req.body.userFamilyName,
        userEmail: req.body.userEmail,
        userAvatar: req.body.userAvatar
      })
      if (req.body.userEmail) {
        user.save()
          .then((user) => {
            console.log('User posted', user);
          })
          .catch((err) => {
            console.log(`Errors: ${err}`);
          })
      }
    }
  })
})

app.listen(5000, () => {
  console.log('Server works');
})