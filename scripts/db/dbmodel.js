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
