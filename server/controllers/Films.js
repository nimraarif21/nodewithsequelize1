const model = require('../models');
const {films} = model;
const{ratings} = model;
let result = {};
let status = 201;
class Films { 
    static createFilm(req, res) { 
        return films.create({
            filmTitle: 'mynameiskhan',
            description: 'hey',
            year: '1992',
            img_url:'jsakd',
            ratings:[{score:9}]
        })
          }
    //     const { filmTitle, description, year, img_url } = req.body ;
    //     return films.create({filmTitle, description, year, img_url}) 
    //     .then((filmData )=> res.status(201).send({ success: true, message: 'Film successfully created', filmData })) 
    //     .catch(err => res.status(401).send({ success: false, message: 'Film already exists', err }));
    // } 
    static getFilms(req, res) { 
        return films.findAll({ include: [ 'ratings' ] })
        .then((filmData )=> res.status(201).send({ success: true, message: 'All the films:', filmData })) 
        // Task.findAll({ include: [ User ] }).then(function(tasks) {
        //     console.log(JSON.stringify(tasks))

    }

    static fetchFilm(req,res){
        const {filmname}=req.body;
        return films.findOne({ where: {filmTitle: filmname} })
        .then(filmData => res.status(201).send({ success: true, message: 'Film Data retrieved', filmData })) 
        .catch(err => res.status(401).send({ success: false, message: 'Film does not exist', err }));
          
    }

    static addRating(req,res){
        const {filmname,RatingID}=req.body;
        return ratings.findOne({ where: {id: RatingID} })
        .then(filmData => res.status(201).send({ success: true, message: 'Film Data retrieved', filmData })) 
        .catch(err => res.status(401).send({ success: false, message: 'Film does not exist', err }));
        console.log(rating)
        const film = films.findOne({where:{filmTitle:filmname}})
        console.log(film)
        return film.ratings;
        //.then(filmData => res.status(201).send({ success: true, message: 'Rating set', filmData })) 
            // .catch(err => res.status(401).send({ success: false, message: 'Rating could not be set', err }));
    }

    static DeleteFilm(req,res){
        const {filmname}=req.body;

        return films.findOne({ where :{filmTitle: filmname }})
        .then(results => {
            return results.destroy({ force: true });
          })
          .then(filmData => res.status(201).send({ success: true, message: 'Film Deleted', filmData })) 
          .catch(err => res.status(401).send({ success: false, message: 'Film does not exist', err }));
    }

}
module.exports = Films;
