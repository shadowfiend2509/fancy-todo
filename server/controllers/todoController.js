const Todo = require('../models/todo');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

class TodoController {
    static create(req,res,next){
        console.log(req.body)
        console.log('error apa ini')
        let {token,date,title,description}= req.body;
        let decode = jwt.decode(token);
        let idUser = '';
        User.findOne({
            email : decode.email
        })
            .then(function(user){
                // console.log(user._id)
                console.log('di dalam users todo')
                idUser = user._id;
                if(date.length==0) throw({status:403,msg:'Wajib di pilih tanggal!'});
                else{
                    return Todo.create({
                        due_date : date,
                        title : title,
                        description :description,
                        UserId : idUser
                    })
                }
            })
            .then(function(data){
                console.log('kalau anda sampai sini harusnya sudah benar')
                res.status(201).json({msg:'Data Berhasil Disimpan',data:{
                    date,title,description
                }})
            })
            .catch(next)
    }
    static updateStatus(req,res,next){
        let id = req.body.todoId
        Todo.find({
            _id : id
        })
            .then(function(todo){
                let getTodo = todo[0];
                return Todo.findByIdAndUpdate(getTodo._id,{status:true})
            })
            .then(function(ssc){
                console.log(ssc)
                res.status(201).json({msg : "Yeah kamu Melakukan dengan baik!!"})
            })
            .catch(next)
    }
    static deleteTodo(req,res,next){
        let id =  req.body.todoId;
        Todo.find({
            _id: id
        })
            .then(function(todo){
                let getTodo = todo[0];
                return Todo.findByIdAndDelete(getTodo._id)
            })
            .then(function(success){
                res.status(201).json({msg:"Todo berhasil di hapus.. HaveFun!!"})
            })
            .catch(next)
    }
}


module.exports = TodoController;