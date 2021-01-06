const router = require('express').Router();
const User = require('../models/user');

router.get('/users', (req, res) => {
  User.find()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      console.log(`Errors: ${err}`);
    })
})

router.post('/users', (req, res) => {
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
            res.send('User posted');
          })
          .catch((err) => {
            console.log(`Errors: ${err}`);
          })
      }
    }
  })
})

router.put('/users/:id', (req, res) => {
  User.findByIdAndUpdate(req.body.id, req.body, (err, docs) => {
    if (err) {
      console.log(`Errors: ${err}`);
    }
    else {
      res.send('User updated');
    }
  })
})

module.exports = router;