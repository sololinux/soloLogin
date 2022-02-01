const mongoose = require('mongoose');
const uri = require('../../credinals.json');

mongoose.connect(uri.Mongo_db_url)
   	.then(result =>{
    	  console.log('Connected to MongoDB')
   	})
   	.catch(err =>{
    	  console.log(err)
   	});

module.exports = {
	model: require('./dbmodel')
}