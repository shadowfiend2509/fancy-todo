const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const {hashPassword} = require('../helpers/hashPassword');

const UserSchema = new Schema ({
    username : {
        type :String,
        required : true
    },
    password : {
        type :String,
        required : true
    },
    email : {
        type: String,
        required : true
    },
    photo : String
})

UserSchema.pre('save',function(next){
    if(this.password.length<5 || this.username.length<7){
        next({status : 403,msg:'username/password tidak memenuhi syarat'})
    }else{
        this.photo = this.photo || '../picture/59162520-blanco-perfil-de-usuario-icono-en-el-botón-negro-aislado-en-blanco.jpg'
        this.password = hashPassword(this.password);
        next()
    }
})

const User = Mongoose.model('Users',UserSchema)

User.createCollection()
    .then(function(){
        console.log('Success Create User Collection')
    })
    .catch(console.log)

module.exports = User;