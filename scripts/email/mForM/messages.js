const fetch = require('node-fetch');
const geo = require("ip-info-finder");
const date = new Date();

//get ip address of client to send in email
//but unfortunately it fetches server's ip instead of client sad
const ip = ()=>{
	return new Promise((resolve, reject) =>{
		fetch('https://api.ipify.org/?format=json')
		.then(res => res.json())
		.then(data => resolve(data.ip))
		.catch(err => reject(err))
	})
}

//get info from ip provided 
async function ipinfo(){
	const ipadd = await ip();
	return new Promise((resolve, reject) =>{
		geo.getIPInfo(ipadd)
		.then(info =>{
			resolve(info);
		})
		.then(err => reject(err))
	})	
};




module.exports.os = require('os').type();
module.exports.info = ipinfo();