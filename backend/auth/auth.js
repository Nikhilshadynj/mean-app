const User = require('../models/users')
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
var moment = require('moment');

const auth = async (req,res, next) =>{  
  const token = req.header('Authorization')
  if(token){
    var user = await User.findOne({refreshToken: token })
    if(user){
      req.user = user
      next()
    }else{
      res.status(401).send('Please authenticate.')
    }
  }else{
    res.status(401).send('Please authenticate.')
  }
  }

  const signUp = async (req,res)=>{
    console.log("here")
        const token = crypto.randomBytes(64).toString('hex')
        const user = new User({
            name : req.body.name,
            password : req.body.password,
            email : req.body.email,
            token : token
        })
        try{
            await user.save()
            res.status(201).send(user)
        }catch(e){
          res.status(500).send(e)
        }
    }
    
    const login = async (req, res) => {
      try {
          const token = crypto.randomBytes(64).toString('hex')
          const user = await User.findByCredentials(req.body.email, req.body.password)
          const date = moment(Date.now())
          date1 = date.format("ddd MMM DD YYYY HH:mm:ss")
          const modifiedDate =date.add(24, 'h')
          const timeStamp = moment(modifiedDate).format("X")    
          const updateUser = await User.findByIdAndUpdate({_id : user._id},{$set: {refreshToken: token, expiresAt : timeStamp} })
          await updateUser.save()
          const updatedUser = await User.findOne({ _id : updateUser._id })
          res.send(updatedUser)
          }catch (e) {
          res.status(400).send('Unable to login')
      }
  }

      const getUsers = async (req,res)=>{
        const user = await User.find({ })
        res.send(user)
    }

module.exports = { auth,signUp,login,getUsers}