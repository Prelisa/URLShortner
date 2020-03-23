
const express=require('express');
const router=express.Router();

router.get('/', async (req, res) => {
    const shortUrl = await shortUrl.findOne({ short: req.params.shortUrl })
    if (shortUrl == null) return res.sendStatus(404)
  
    shortUrl.save()
  
    res.redirect(shortUrl.original)
  })

  module.exports={
      router
  }