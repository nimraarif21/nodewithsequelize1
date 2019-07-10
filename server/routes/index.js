const Users =require( '../controllers/User');
const Films=require('../controllers/Films')
const Ratings=require('../controllers/ratings')
module.exports = (app) => 
{ app.get('/api', (req, res) => res.status(200)
.send({message: 'Welcome to the FILMS API!', })); 

app.get('/api/films',Films.getFilms)
app.post('/api/films',Films.createFilm)
app.post('/api/films/fetch',Films.fetchFilm)
app.post('/api/films/delete',Films.DeleteFilm)

app.post('/api/ratings',Ratings.createRating)
app.get('/api/ratings',Ratings.getRating)

app.post('/api/ratings/set',Films.add)


app.post('/signup', Users.signUp)
app.post('/login',Users.Login)};