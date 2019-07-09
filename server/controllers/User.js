const jwt = require('jsonwebtoken');
const model = require('../models');
const { User }  = model;

let result = {};
let status = 201;
class Users { 
    static signUp(req, res) { 
        const { name, username, email, password } = req.body ;
        return User.create({ name, username, email, password }) 
        .then(userData => res.status(201).send({ success: true, message: 'User successfully created', userData })) 
        .catch(err => done(err))(err => res.status(401).send({ success: false, message: 'User already exists', err }));
    } 
    static Login(req, res){
        const { username, password } = req.body;
        console.log(model)
        return User.findOne({where:{username:username}})
        .then(function(Userdata){
            if(!Userdata){
            status=401;
            result.status = 401;
            result.error = `Incorrect Username`;
            res.status(status).send(result);
            }
            else{
                if(Userdata.correctPassword(password)==true)
                {
                    status=200;

                    const payload = { Userdata: Userdata };
                    const options = { expiresIn: '2d', issuer: 'https://scotch.io' };
                    const secret = 'karkun';
                    const token = jwt.sign(payload, secret, options);
                    result.token = token;
                    result.status = status;
                    result.result = Userdata;
                    res.status(status).send(result);
                }
                else
                {

                    status=401;
                    result.status = 401;
                    result.error = `Incorrect Password`;
                    res.status(status).send(result);
                }
            }
        })
         .catch(err => done(err));
                 
} 
}
module.exports = Users;
