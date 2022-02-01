const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
	email : {
		type : String,
		required : true
	},
	username : {
		type : String,
		required : true
	},
   password:{
      type: String,
      required: true
   },
   verified:{
      type: Boolean,
      required: true,
   }
},
{timestamps: true});

const db = mongoose.model('users', schema);

module.exports = db;














/*| const newu = new user({
   	email : 'chauraj345r@gmail.com',
   	username : 'solo2' 
   })

   newu.save()
   .then(result =>{
   	console.log('New user connected');
   })
   .catch(err =>{
   	console.log(err)
   })

  user.find({username: 'solo3'}, (err,doc) =>{
   	if(err){console.log(err)}
   		else{
   			if(doc == '')
   			console.log('NO docs')}
   })*/