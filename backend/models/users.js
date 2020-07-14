const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')
const userSchema = mongoose.Schema({
    userName : {
        type : String,
        
    },
    email : {
        type : String,
        required : true,
        unique : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Please enter valid email-id')
            }
        }
    },
    password : {
        type : String,
        required:true
    },
    token : {
        type  : String,
        required:true
    },
    refreshToken : {
        type : String
    },
    createdAt : {
        type: Date, default: Date.now, required:true
    },
    updatedAt : {
        type: Date, default: Date.now, required:true
    },
    expiresAt : {
        type : String
    }
})

userSchema.pre('save',async function (next){
    const user = this

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }
     return user
}

const User = mongoose.model('User', userSchema)

module.exports = User