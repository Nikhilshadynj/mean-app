const express = require('express')
const router = new express.Router()
const passport = require('passport')
require('../passport')
const {auth,signUp,login,getUsers}  = require('../auth/auth')
router.get('/', (req,res)=>{res.send('You are not logged in')})
router.post('/users', signUp)
router.post('/user/login',login )
router.get('/get-user', auth,getUsers )

const isLoggedIn = (req,res,next) =>{
  if(req.user){
      next();
    }else {
        res.sendStatus(401);
  }
} 

router.get('/', (req, res) => res.send('Example Home page!'))
router.get('/failed', (req, res) => res.send('You Failed to log in!'))

// In this route you can see that if the user is logged in u can acess his info in: req.user
router.get('/good', isLoggedIn, (req, res) => res.send(`Welcome mr ${req.user.displayName}!`))

// Auth Routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/good');
  }
);
router.get('/logout', (req,res)=>{
    req.session = null;
    req.logout();
    res.redirect('/');
})


module.exports = router

