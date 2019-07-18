const model = require('../models');
const UserController = require('./User');
const {film} = model;
const{rating} = model;
const{user} = model;
const jwt = require('jsonwebtoken');
let result = {};
let status = 201;
class Film { 
    static createFilm(req, res) { 
        const { filmTitle, description, year, img_url} = req.body ;
        film.create({filmTitle, description, year, img_url})
                    .then(filmData => res.status(201).send({ success: true, message: 'New Film Added', filmData })) 
                    .catch(err => res.status(401).send({ success: false, message: 'New Film could not be Added', err }));
    }

    static getFilms(req, res) { 
        return film.findAll({include:[{model:rating, as:'ratings', required: true}]}) 
        .then(filmData=> res.status(201).send({ success: true, message: 'All the films:', filmData })) 
        .catch(err => res.status(401).send({ success: false, message: 'Could not retrieve all films', err }))

    }

    static fetchFilm(req,res){
        const filmID=req.params.id;
        return film.findOne({ where: {id: filmID} },{include:[{model:rating, as:'ratings', required: true}]})
        .then(filmData => res.status(201).send({ success: true, message: 'Film Data retrieved', filmData })) 
        .catch(err => res.status(401).send({ success: false, message: 'Film does not exist', err }));
          
    }
    static async addnewRating(req,res){
      const {filmId,score}=req.body;
      var authorization=req.headers['authorization']
      let userId=authenticateToken(authorization);
      if(userId==-2)
          {
              return res.status(401).send('No token provided');
          }
      else if (userId==-1)
          {
              return res.status(401).send('Invalid Token');
          }
      else{

          try {
            let userdata = await user.findOne({where:{id:userId}})
            let filmdata = await film.findOne({where:{id:filmId}})
            let Rating = await rating.create({score})
            await userdata.addRatings(Rating)
            await filmdata.addRatings(Rating)
            await filmdata.setAverage_score(filmdata)
            res.status(201).send({ success: true, message: 'Rating successfully added', filmdata }) 

          } catch(error){
            console.log(error)
            res.status(201).send({ success: false, error, error }) 
          }
        }
        
    }

    static fetchSpecificRating(req,res){
      const filmID=req.params.id;
      const ratingID=req.params.ratingId;
      return film.findOne({where:{id:filmID}}).then(function(Film) {
        return Film.hasRatings({where:{id:ratingID}})
                .then(filmData => res.status(201).send({ success: true, message: 'Rating successfully added', filmData })) 
                .catch(err => res.status(401).send({ success: false, message: 'Rating could not be added', err }));
              })
            
        .catch(err => res.status(401).send({ success: false, message: 'Film does not exist', err }));
  }

    static DeleteFilm(req,res){
        const filmID=req.params.id;
        return film.findOne({ where :{id: filmID }})
        .then(results => {
            return results.destroy({ force: true });
          })
          .then(filmData => res.status(201).send({ success: true, message: 'Film Deleted', filmData })) 
          .catch(err => res.status(401).send({ success: false, message: 'Film does not exist', err }));
    }

    static updateFilm(req,res){
      const {description} = req.body;
      const filmID=req.params.id;
      return film.findOne({where:{id:filmID}})
      .then(function(filmdata){
          if(!filmdata){
          status=401;
          result.status = 401;
          result.error = `Incorrect FilmID`;
          res.status(status).send(result);
          }
          else{
                 filmdata.update(
                      {
                          description:description
                      })
                  status=200;
                  result.status = status;
                  res.status(status).send(result);
              }
      })
       .catch(err => res.status(401).send({ success: false, message: 'Could not update film', err }));
  
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
          console.log(e)
            return e
        }
    
      } else {
        return -1
      }
}
module.exports = Film;
