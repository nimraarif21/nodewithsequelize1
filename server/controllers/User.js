const jwt = require('jsonwebtoken');
const model = require('../models');
const { user }  = model;

let result = {};
let status = 201;
class users { 
    static signUp(req, res) { 
        const {username, email, password } = req.body ;
        user.create({ username, email, password }) 
        .then(userData => res.status(201).send({ success: true, message: 'user successfully created', userData })) 
        .catch(err => res.status(401).send({ success: false, message: 'user already exists', err }));
    } 
    static Login(req, res){
        const { username, password } = req.body;
        return user.findOne({where:{username:username}})
        .then(function(userdata){
            if(!userdata){
            status=401;
            result.status = 401;
            result.error = `Incorrect username`;
            res.status(status).send(result);
            }
            else{
                if(userdata.correctPassword(password)==true)
                {
                    status=200;

                    const payload = { userdata: userdata };
                    const options = { expiresIn: '2d', issuer: 'https://scotch.io' };
                    const secret = 'karkun';
                    const token = jwt.sign(payload, secret, options);
                    result.token = token;
                    result.status = status;
                    result.result = userdata;
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

    static changePassword(req,res){
        const { username, password } = req.body;
        return user.findOne({where:{username:username}})
        .then(function(userdata){
            if(!userdata){
            status=401;
            result.status = 401;
            result.error = `Incorrect username`;
            res.status(status).send(result);
            }
            else{
                if(userdata.correctPassword(password)==true)
                {
                   userdata.update(
                        {
                            password:password
                        })
                    status=200;
                    result.status = status;
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
module.exports = users;
