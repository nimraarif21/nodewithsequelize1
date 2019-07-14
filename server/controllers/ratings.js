const model = require('../models');
const {ratings} = model;
let result = {};
let status = 201;
class Ratings { 
    static createRating(req, res) { 
        const { score } = req.body ;
        return ratings.create({score}) 
        .then((ratingData) => res.status(201).send({ success: true, message: 'Rating successfully created', ratingData })) 
        .catch(err => res.status(401).send({ success: false, message: 'Rating could not be created', err }));
    } 
    static getRating(req, res) { 
        return ratings.findAll()
        .then((filmData) => res.status(201).send({ success: true, message: '', filmData })) 
        .catch(err => res.status(401).send({ success: false, message: 'Could not access ratings array', err }));
    }

    static fetchRating(req,res){
        const {RatingID}=req.body;
        return films.findOne({ where: {filmID: RatingID} }).then(filmData => res.status(201).send({ success: true, message: 'rating data retrieved', filmData })) 
        .catch(err => res.status(401).send({ success: false, message: 'rating does not exist', err }));
          
    }

}
module.exports = Ratings;
