//Basic requirement and server.listen
const express = require('express'); 
const app = express();
const port = process.env.PORT || 3000;

const path = require('path');
const parser = require('body-parser');
const bparser = parser.urlencoded({extended : false});

const dbcon = require('./scripts/db/dbconnect');
const db = dbcon.model;
const dbclose = require('./scripts/db/dbclose');
const ___ = require('./scripts/hashes/___');
const email = require('./scripts/email/sendmail');

app.use(express.static(path.join(__dirname, './style')));
app.set('view engine', 'ejs');

app.listen(port, ()=>{console.log(`Server connected at port ${port}`)});

//--------------------------------------------------------------------------------------------\\

//Render of templetes
app.get('/', (req,res) =>{
   res.render('index'); 
});

app.get('/login',(req,res) =>{
   res.render('login');
});

app.get('/signup',(req,res) =>{
   res.render('signup');
});

//--------------------------------------------------------------------------------------------\\

//Signup for new user
//Check if email and username exists or not
//If not save data email, username and hashed password in db and send email for conformation 
app.post('/signup', bparser, (req,res) =>{

   code = Math.floor(Math.random()*100000);
   emailu = req.body.email;
   const usernameu = req.body.username;
   const passwordu = req.body.password;

   db.find({email: emailu}, (err,doce) =>{
   		if(err){
   			console.log(err)
   		}
   		else if(doce == ''){
   			db.find({username: usernameu}, (err,docu) =>{
   				if(err){
   					console.log(err)
   				}
   				else if(docu == ''){
   					let user = new db({
   						email: emailu,
   						username: usernameu,
   						password: ___(passwordu),
                     verified: false,
   					});
   					user.save()
   					.then((result) =>{
   						console.log('New user connected');
  					      email(emailu, usernameu, code);
                     res.render('confirm', {data: {ema: emailu}})
  					 })
  					 .catch(err =>{
   						console.log(err)
   					});
   				}
   				else{
   					res.render('signup', {username: usernameu})
   				}
   			})
   		}
   		else{
   			res.render('signup', {email: emailu})
   		}
   })
});

//Conform new user email
//if entered pin matches update db verified to True
//if not render confirm with err msg
app.post('/confirm', bparser, (req,res) =>{

   const pin = req.body.pin;

      if(pin == code){
         db.findOneAndUpdate({email: emailu}, {verified: true}, {new: true},  (err,result)=>{
            if(err){
               console.log(`Error in verification.` + err);
               res.send('error occured')
            }
            else if(result){
               console.log(`${emailu} verified ${result}`);
               res.send(`congrats verified`);
               //render to landing page if verified and delete above line 
               //res.render('confirm', {})
            };
         });
      }
      else if(pin != code){
         console.log('pin not matched');
         res.render('confirm', {data: {ema: emailu, err: 'Wrong code entered'}});
      }
})

//Login page
//check if email and hashed password maches or not
//if matched render landing page
app.post('/login', bparser, async(req,res)=>{

   try{
      const emaile = req.body.email;
      const passworde = req.body.password;
      const data = await db.findOne({email: emaile})

      if(data.verified == true){
         if(data.password == ___(passworde)){
            res.send('Welcome to landing page');
         }
         else{
            res.render('login', {data: 'Invalid login data'})
         }
      }
      else{
         res.render('login', {data:'User not verified'})
      }
   }

   catch(err){
      res.render('login',  {data: 'Invalid login data'});
   }

});