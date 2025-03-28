const mongoose = require('mongoose')



const userSchema =new mongoose.Schema({
    firstName:{
        type:String,
        required:[true, 'You Should Fill this field'],
        minLength:[3,'Too short '],
        maxLength:[20,'Too long']
    },
    lastName:{
        type:String,
        required:[true, 'You Should Fill this field'],
        minLength:[3,'Too short '],
        maxLength:[20,'Too long']
    },
    gender:{
        type:String,
        required:true,
        enum:['Male','Female','other']
    },
    country:{
        type:String,
        required:[true, 'You Should Fill this field'],
        minLength:[3,'Too short '],
        maxLength:[20,'Too long']
    },
    Age:{
        type:Number,
    }
},{ timestamps: true })


module.exports = mongoose.model("User",userSchema)

