const Users =require( '../controllers/User');
const Films=require('../controllers/Films')
const Ratings=require('../controllers/ratings')
module.exports = (app) => 
{ 
    app.use(function(req, res, next) {
        res.set("Access-Control-Allow-Origin", "*") 
        res.set("Access-Control-Allow-Credentials", true )
        next();
    });
app.get('/api', (req, res) => res.status(200)
    .send({message: 'Welcome to the FILMS API!', })); 

//User
app.post('/api/accounts/signup',Users.signUp)
app.post('/api/accounts/login',Users.Login)
app.post('/api/accounts/profile/changepassword', Users.changePassword)
app.put('/api/accounts/profile',Users.updateProfile)
app.get('/api/accounts/profile',Users.fetchProfile)
// app.get('/api/accounts/logout',Users.logout) //need to do this

//token
// app.get('/api/accounts/jwt',Users.fetchToken) //need to do this

//Films
app.get('/api/films',Films.getFilms)
app.post('/api/films',Films.createFilm)
app.get('/api/films/:id',Films.fetchFilm)
app.delete('/api/films/:id',Films.DeleteFilm) 
app.post('/api/ratings/set',Films.addnewRating) 
app.put('/api/films/:id', Films.updateFilm)
app.get('/api/films/:id/ratings/:ratingId',Films.fetchSpecificRating)

//Ratings
app.post('/api/ratings',Ratings.createRating)
app.get('/api/ratings',Ratings.getRating)





};