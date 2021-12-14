var express = require('express');
var router = express.Router();


const mongoose = require('mongoose')
require('dotenv').config()
//import { resetDB, retrieveYTData } from "../controllers/autoUpdateDB";
const updateDB = require('../controllers/autoUpdateDB')
//const resetDB = require('../controllers/autoUpdateDB')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/cool', (req, res)=>{
  res.send("you're so cool")
})

router.get('/test', async (req, res)=>{
  try {
    await mongoose.connect(process.env.MONGO_URI)

    const API_URI = process.env.YT_API_URL + process.env.YT_API_KEY
    const data = await updateDB.retrieveYTData(API_URI)

    await updateDB.resetDB(data)
    
    res.json({"success": "True", "Hits": data.length, "items": data})
  } catch (error) {
    res.json({
      error: error.message,
      json: typeof(retrieveYTData)
    })
  }
})

module.exports = router;

