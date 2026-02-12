const router = require('express').Router();
// const passport = require('passport');

// router.get('/', (req, res) => {
//     // swagger.tags = ['Home']
//   res.send('Welcome to the Home Page!');
// });

router.get('/', (req, res) => {
  res.send(req.session.user ? `Logged In as ${req.session.user.displayName}` : 'Logged Out');
});

// router.get('/login', passport.authenticate('github'), (req, res) => { });
router.get('/login', (req, res) => res.redirect('/auth/github'));



router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    req.session.destroy();
    res.redirect('/');
  });
});

router.use('/books', require('./books'));
router.use('/students', require('./students'));
router.use('/schools', require('./schools'));
router.use('/loans', require('./loans'));
router.use('/', require('./swagger'));

module.exports = router;
