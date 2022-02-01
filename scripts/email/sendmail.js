const mailer = require('nodemailer');
const elogin = require('../../credinals.json');
const data = require('./mForM/messages');
const date = new Date();

//send mail using crednials in
const send = async (to,user,code)=>{
	let ip = await data.info;
	let service = mailer.createTransport({
		host: 'smtppro.zoho.com',
   		port: 465,
   		secure: true,
  		auth: {
    		user: elogin.username,
    		pass: elogin.pass,
  		}
	});

	let options = { 
		from: elogin.username,
		to: to,
		subject: 'Solochat verification',
		html: `	<h4 style="font-size: 13px;">Dear ${user},</h4>
				<div style="text-align: center; font-size: 15px;">
				<p>On ${data.os}</p>
				<p>${ip.query}</p>
				<p>${ip.city}, ${ip.country}</p>
				<p>${date.toLocaleString('en-US', { day: 'numeric', month: 'long', weekday: 'long'})}</p>
				<p>${date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })}</p>
				</div>
				<h3 style="text-align: center; font-size: 15px;">If yes, use the verification code in your solochat registration form.</h3>
				<h2 style="text-align: center; font-size: 20px; font-weight: 500">${code}</h2>
				<div style="text-align: center; font-size: 11px; margin-top: 100px;">
				<p>This is an automated email; if you receive it with error, no action will be taken.</p>
				</div>`,
	};

	service.sendMail(options, (error,res) =>{
		if (error){
			console.log(error);
		}
		else{
			console.log(`Email sent to ${options.to} for verification`);
		}
	});
}

module.exports = send;