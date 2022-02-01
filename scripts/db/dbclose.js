const mongoose = require('mongoose');

const dbclose = ()=>{
		mongoose.connection.close()
		.then(result =>{
			console.log('MongoDb closed')
		})
		.catch(err =>{
			console.log(err)
		})
}
   
module.exports = dbclose;