const model = require('../models');
const {film} = model;
const{rating} = model;
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
        .then((filmData )=> res.status(201).send({ success: true, message: 'All the films:', filmData })) 
        .catch(err => res.status(401).send({ success: false, message: 'Could not retrieve all films', err }));

    }

    static fetchFilm(req,res){
        const filmID=req.params.id;
        return film.findOne({ where: {id: filmID} },{include:[{model:rating, as:'ratings', required: true}]})
        .then(filmData => res.status(201).send({ success: true, message: 'Film Data retrieved', filmData })) 
        .catch(err => res.status(401).send({ success: false, message: 'Film does not exist', err }));
          
    }
    static addnewRating(req,res){
        const {filmname,score}=req.body;
return film.findOne({where:{filmTitle:filmname}}).then(function(Film) {
          return rating.create({score}).then(function(Rating) {
              return Film.addRatings(Rating).then(function() {
                return Film.hasRatings(Rating)
                  .then(filmData => res.status(201).send({ success: true, message: 'Rating successfully added', filmData })) 
                  .catch(err => res.status(401).send({ success: false, message: 'Rating could not be added', err }));
                })
              })
            })
    }

    static fetchSpecificRating(req,res){
      const filmID=req.params.id;
      const ratingID=req.params.ratingId;
      return film.findOne({where:{id:filmID}}).then(function(Film) {
        console.log("coming here")
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
module.exports = Film;
