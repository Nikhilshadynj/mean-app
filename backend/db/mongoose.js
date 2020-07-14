const mongoose = require('mongoose')
const uri = 'mongodb+srv://nikhil:12345@cluster0.ph0g1.mongodb.net/angular?retryWrites=true&w=majority'

mongoose.connect(uri,{
    useUnifiedTopology: true,
    useCreateIndex : true,
    useNewUrlParser : true
})