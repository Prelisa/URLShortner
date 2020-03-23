const express = require('express')
const mongoose = require('mongoose')
const bodyParser=require('body-parser')
const cors=require('cors');
const app = express()
const ShortUrl=require('./models/shortUrl')




app.use(cors());

//DatabaseKey
const db=require('./config/keys').mongoURI;
//connect to mongoDB
mongoose.connect('mongodb://localhost/urlShortene', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.once('open', function () {
  console.log('db connection established');
})
mongoose.connection.on('err', function (err) {
  console.log('db connection failed >>', err);
})

//body parser middleware
app.use(bodyParser.urlencoded({
  extended:false,
} ));
app.use(bodyParser.json());

//routes
const shorten=require('./routes/api/shorten');
app.use('/api/shorten',shorten);


app.get('/test',(req,res)=>{
  res.send("hello world")
})
app.get('/', async (req, res) => {
  const shortUrls = await ShortUrl.find()
  res.json({ shortUrls: shortUrls })
})

app.get('/:shortUrl', async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
  if (shortUrl == null) return res.sendStatus(404)

  
  shortUrl.save()

  res.redirect(shortUrl.full)
})




app.listen(process.env.PORT || 8000);


