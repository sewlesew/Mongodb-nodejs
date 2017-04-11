
var express=require('express');
var mongoclient=require('mongodb').MongoClient;
var crypto=require('crypto');

var app=express();

app.all('/',function(req,res){
   mongoclient.connect('mongodb://127.0.0.1:27017/lab7',function(err,db){

       if(err) throw err;

     db.collection('homework7').findOne({},function(err,doc){

         if(err) next(err);

        var message=doc.message;
        var decipher=crypto.createDecipher('aes256','asaadsaad');
           var output='';
             decipher.on('readable',function(){
                
                 const data= decipher.read();
                 if(data){
               output+=data.toString('utf8');
                 }

             });
             decipher.on('end',function(){
                           res.send(output);
             });

   decipher.write(message,'hex');
   decipher.end();

     });
   });
});

app.use(function(err,req,res,next){        
     res.send("Error");
});
app.listen(3000);


