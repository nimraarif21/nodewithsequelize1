const model = require('../models');
const {films} = model;
const{ratings} = model;
let result = {};
let status = 201;
class Films { 
    static createFilm(req, res) { 
        const { filmTitle, description, year, img_url } = req.body ;
        return films.create({filmTitle, description, year, img_url}) 
        .then((filmData )=> res.status(201).send({ success: true, message: 'Film successfully created', filmData })) 
        .catch(err => res.status(401).send({ success: false, message: 'Film already exists', err }));
    } 
    static getFilms(req, res) { 
        return films.findAll()
        .then((filmData )=> res.status(201).send({ success: true, message: 'All the films:', filmData })) 

    }

    static fetchFilm(req,res){
        const {filmname}=req.body;
        return films.findOne({ where: {filmTitle: filmname} })
        .then(filmData => res.status(201).send({ success: true, message: 'Film Data retrieved', filmData })) 
        .catch(err => res.status(401).send({ success: false, message: 'Film does not exist', err }));
          
    }

    static addRating(req,res){
        const {filmname,RatingID}=req.body;
        const rating=ratings.findOne({ where: {id: RatingID} });
        return films.findOne({where:{filmTitle:filmname}})
      
        .then(filmData => res.status(201).send({ success: true, message: 'Rating set', filmData })) 
            .catch(err => res.status(401).send({ success: false, message: 'Rating could not be set', err }));
    }

    static DeleteFilm(req,res){
        const {filmname}=req.body;

        return films.findOne({ where :{filmTitle: filmname }})
        .then(results => {
            console.log(results);
            return results.destroy({ force: true });
          })
          .then(filmData => res.status(201).send({ success: true, message: 'Film Deleted', filmData })) 
          .catch(err => res.status(401).send({ success: false, message: 'Film does not exist', err }));
    }

}
module.exports = Films;
