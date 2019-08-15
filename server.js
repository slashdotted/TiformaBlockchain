var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var cors=require('cors');
var upload=require('./upload');
const fs = require('fs');
var accessToken='?access_token=yvB5imJivOSf5gIHr6a0J1cVSwF6LWK9ppfIfxNUAMcpjPbnvve9KsmMUXzt7gfJ';


var app = express();
app.use(bodyParser.json());
app.use(cors());
var endpoint = 'http://localhost:3000/api';


app.listen(8080, function () {
    console.log('listening on port 8080!');

});

// Ritorna tutti gli elementi, esempio http://localhost:3000/api/Student
app.get('/[a-zA-Z]+', function (req, res) {
    http.get(endpoint + req.originalUrl, (resServer) => {
        resServer.setEncoding('utf8');
        resServer.on('data', function (chunk) {
            res.send(chunk);
        });
    });
});

// Ritorna un singolo elemento selezionato dall'ID, esempio http://localhost:3000/api/Student/5
app.get('/[a-zA-Z]+/[0-9a-zA-Z]+', function (req, res) {
    http.get(endpoint + req.originalUrl, (resServer) => {
        resServer.setEncoding('utf8');
        resServer.on('data', function (chunk) {
            res.send(chunk);
        });
    
    });
});

// Aggiorna un singolo elemento selezionato dall'ID passandoli un oggetto JSON, esempio http://localhost:3000/api/Student/5
app.put('/[a-zA-Z]+/[0-9a-zA-Z]+', function (req, res) {
    var options = {
        host: 'localhost',
        path: endpoint + req.originalUrl,
        port: 3000,
        method: 'PUT',
        "headers": { 
            "Content-Type" : "application/json",
          }
    };
    var callback = function (response) {
        var str = '';

        //another chunk of data has been recieved, so append it to `str`
        response.on('data', function (chunk) {
            str += chunk;
        });

        //the whole response has been recieved, so we just print it out here
        response.on('end', function () {
            res.send(str);
        });
    };
    http.request(options, callback).end(JSON.stringify(req.body));
});

// Elimina un singolo elemento selezionato dall'ID, esempio http://localhost:3000/api/Student/5
app.delete('/[a-zA-Z]+/[0-9a-zA-Z]+', function (req, res) {
    var options = {
        host: 'localhost',
        path: endpoint + req.originalUrl,
        port: 3000,
        method: 'DELETE',
    };
    var callback = function (response) {
        res.status(204).send();
    };
    http.request(options, callback).end();
});

// Esegue le transazioni custom create passandoli un elemento JSON, esempio http://localhost:3000/api/CreateStudent
app.post('/[a-zA-Z]+', function (req, res) {
    console.log('richiesta è avvenuta');
    var options = {
        host: 'localhost',
        path: endpoint + req.originalUrl,
        port: 3000,
        method: 'POST',
        "headers": { 
            "Content-Type" : "application/json",
          }
    };
    var callback = function (response) {
        var str = '';

        //another chunk of data has been recieved, so append it to `str`
        response.on('data', function (chunk) {
            str += chunk;
        });

        //the whole response has been recieved, so we just print it out here
        response.on('end', function () {
            res.send(str);
        });
    };
    http.request(options, callback).end(JSON.stringify(req.body));
});

//Esegue l'upload dei file come foto e allegati url prende /contactID/upload/nomefile.estensione
app.post('/[a-zA-Z0-9]+/Upload',upload);
//Permette di scaricare un file precedentemente caricato
app.get('/[a-zA-Z0-9]+/Download/[a-zA-Z]+\.[a-zA-Z]+',function (request,response){
    console.log('Entered');
    var arrayURL=request.originalUrl.split('/');
    var filename=arrayURL[arrayURL.length-1];
    var contactID=request.originalUrl.split('/')[1];
    response.sendFile(__dirname+'/uploads/'+contactID+'/' +filename);  
});

app.get('/[a-zA-Z0-9]+/Delete/[a-zA-Z]+\.[a-zA-Z]+',function(request,response){
    console.log("Starting remove operation");
    var arrayURL=request.originalUrl.split('/');
    var filename=arrayURL[arrayURL.length-1];
    var contactID=request.originalUrl.split('/')[1];
    //rimuovere file dal disco del server
    const pathFileToDelete=__dirname+"/uploads/"+contactID+"/"+filename;
    try{
        fs.unlinkSync(pathFileToDelete); //file removed
        http.get(endpoint + "/Student/"+contactID, (resServer) => {
            resServer.setEncoding('utf8');
            resServer.on('data', function (chunk) {
              var student=JSON.parse(chunk);
              if(student.attachments.indexOf(filename)!=-1){
               
                student.attachments.splice(student.attachments.indexOf(filename),1);
                
              }
              
              var options = {
                host: 'localhost',
                path: endpoint + "/Student/"+contactID,
                port: 3000,
                method: 'PUT',
                "headers": { 
                    "Content-Type" : "application/json",
                  }
            };
            
            var callback = function (response) {
                var str = '';
        
                //another chunk of data has been recieved, so append it to `str`
                response.on('data', function (chunk) {
                    str += chunk;
                });
        
                //the whole response has been recieved, so we just print it out here
                response.on('end', function () {
                   
                });
            };
            http.request(options, callback).end(JSON.stringify(student));
    
            });
        });
        response.status(200).send();
    }catch(err){
        console.log(err);
        response.status(400).send();
    }

    //aggiornare il rest server eliminando il nome
    
});
