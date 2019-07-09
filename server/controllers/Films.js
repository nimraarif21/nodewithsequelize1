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
        .then((filmData )=> res.status(201).send({ success: true, message: 'hello:', filmData })) 

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
        const film=films.findOne({where:{filmTitle:filmname}})
        return film.setratings(rating)
        .then(filmData => res.status(201).send({ success: true, message: 'Rating set', filmData })) 
            .catch(err => res.status(401).send({ success: false, message: 'Rating could not be set', err }));
    }

}
module.exports = Films;
