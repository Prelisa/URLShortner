const express = require('express');
const router = express.Router();




// load url model
const ShortUrl= require('../../models/shortUrl')

//test API
// router.get('/', async (req, res) => {
//     const shortUrls = await ShortUrl.find()
//     res.render('/', { shortUrls: shortUrls })
//     res.send(shortUrls)
//   })
  
  router.post('/shortUrls', async (req, res) => {
    await ShortUrl.create({ full: req.body.fullUrl })
    res.redirect('/')
  })
  
//   router.get('/:shortUrl', async (req, res) => {
//     const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
//     if (shortUrl == null) return res.sendStatus(404)
  
//     shortUrl.clicks++
//     shortUrl.save()
  
//     res.redirect(shortUrl.full)
//   })
  
  
module.exports = router;