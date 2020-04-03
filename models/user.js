const mongoose =require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
    firstName:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    companyId:{
        type:String,
        required:true
    },

})


module.exports= mongoose.model('User',userSchema);