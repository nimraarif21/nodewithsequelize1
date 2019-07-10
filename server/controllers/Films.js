const model = require('../models');
const {film} = model;
const{rating} = model;
let result = {};
let status = 201;
class Film { 
    static createFilm(req, res) { 
        const { filmTitle, description, year, img_url, score } = req.body ;
        film.create({filmTitle, description, year, img_url}).then(function(Film) {
            return rating.create({score}).then(function(Rating) {
              return Film.hasRatings(Rating).then(function(result) {
                // result would be false
                return Film.addRatings(Rating).then(function() {
                  return Film.hasRatings(Rating).then(function(result) {
                    // result would be true
                  })
                })
              })
            })
          })
       
        // return film.create({filmTitle, description, year, img_url}) 
        // .then((filmData )=> res.status(201).send({ success: true, message: 'Film successfully created', filmData })) 
        // .catch(err => res.status(401).send({ success: false, message: 'Film already exists', err }));
    } 
    static getFilms(req, res) { 
        return film.findAll()
        .then((filmData )=> res.status(201).send({ success: true, message: 'All the film:', filmData })) 

    }

    static fetchFilm(req,res){
        const {filmname}=req.body;
        return film.findOne({ where: {filmTitle: filmname} })
        .then(filmData => res.status(201).send({ success: true, message: 'Film Data retrieved', filmData })) 
        .catch(err => res.status(401).send({ success: false, message: 'Film does not exist', err }));
          
    }

    static add(req,res){
        const {filmname,RatingID}=req.body;
        const rating=ratings.findOne({ where: {id: RatingID} });
        return film.findOne({where:{filmTitle:filmname}})
      
        .then(filmData => res.status(201).send({ success: true, message: 'Rating set', filmData })) 
            .catch(err => res.status(401).send({ success: false, message: 'Rating could not be set', err }));
    }

    static DeleteFilm(req,res){
        const {filmname}=req.body;

        return film.findOne({ where :{filmTitle: filmname }})
        .then(results => {
            console.log(results);
            return results.destroy({ force: true });
          })
          .then(filmData => res.status(201).send({ success: true, message: 'Film Deleted', filmData })) 
          .catch(err => res.status(401).send({ success: false, message: 'Film does not exist', err }));
    }

}
module.exports = Film;
