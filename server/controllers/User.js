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
                    const payload = { userdata: userdata.id };
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

static updateProfile(req,res){
    const Email = req.body;
    return user.findOne({where:{email:Email}})
    .then(function(userdata){
        if(!userdata){
        status=401;
        result.status = 401;
        result.error = `Incorrect email`;
        res.status(status).send(result);
        }
        else{
               userdata.update(
                    {
                        email:Email
                    })
                status=200;
                result.status = status;
                res.status(status).send(result);
            }
    })
     .catch(err => done(err));

}



static fetchProfile(req,res)
{
    var authorization=req.headers['authorization']
    let decoded=authenticateToken(authorization);
    if(decoded==-2)
        {
            return res.status(401).send('No token provided');
        }
    else if (decoded==-1)
        {
            return res.status(401).send('Invalid Token');
        }
    else{
        let userId = decoded; 
        console.log(userId)
        user.findOne({where:{id:userId}}).then(function(userdata){
            status=200;
            result.status = status;
            res.status(status).send(userdata);
        })
        .catch(err => res.status(401).send({ success: false, message: 'Could not fetch userProfile', err }));


}
}
}
function authenticateToken(token)
{
    if (token) {
        try {
            var decoded = jwt.verify(token, 'karkun');
            console.log(decoded)
            return decoded.userdata
        } catch (e) {
            return -1
        }
    
      } else {
        return -2;
      }
}
exports.default =authenticateToken;

module.exports = users;
