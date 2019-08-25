const IncomingForm = require('formidable').IncomingForm;
var fs = require('fs');
var http = require('http');
var endpoint = 'http://localhost:3000/api';
var secretPublicKey = 'todo-app-super-shared-secret';
var operationText="";
function checkTokenValidity(t) {
    try {
        jwt.verify(t, secretPublicKey);
        //nel caso di validità
        return true;
    } catch (err) {
        return false;
        //in caso di non validità
    }
}
function printOperation(text) {
    fs.writeFile("log/log.json", text, (err) => {
        if (err) throw err;
    });
}
function getUserFromToken(t){
    console.log("token    "+t);
    return jwt.verify(t, secretPublicKey, { complete: true }).payload;
}
//questa funzione verrà chiamata come callback alla funzione upload dentro server.js
module.exports = function upload(req, res) {
    var token=getUserFromToken(req.headers.authorization);
    var obj={
        operation : req.originalUrl,
        success : false,
        user: token.user.username
    }
    if (checkTokenValidity(req.headers.authorization)) {

        console.log('Upload process executing');
        var filename = req.body.name;
        var contactID = req.originalUrl.split('/')[1];
        console.log(req.body);
        if (!fs.existsSync('./uploads/' + contactID)) {
            fs.mkdirSync('./uploads/' + contactID);
        }


        var form = new IncomingForm();
        console.log('Upload process executing');

        form.on('file', (field, file) => {

            //TODO: process to save the file inside a db (directory inside our server system)
            filename = file.name;
            fs.copyFile(file.path, './uploads/' + contactID + '/' + file.name, (err) => {
                if (err) throw err;
                console.log(file.name + ' has been created!');
            });
        });

        //mandare aggiornamento al server del'attachment ricevuto

        http.get(endpoint + "/Student/" + contactID, (resServer) => {
            resServer.setEncoding('utf8');
            resServer.on('data', function (chunk) {
                var student = JSON.parse(chunk);
                if (student.attachments.indexOf(filename) == -1) {
                    console.log(filename);
                    student.attachments.push(filename);
                }

                var options = {
                    host: 'localhost',
                    path: endpoint + "/Student/" + contactID,
                    port: 3000,
                    method: 'PUT',
                    "headers": {
                        "Content-Type": "application/json",
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
                        console.log(str);
                    });
                };
                http.request(options, callback).end(JSON.stringify(student));

            });
        });



        form.on('end', () => {
            res.status(200).send();
        });
        form.parse(req);
        obj.success=true;
    }
    printOperation(JSON.stringify(obj));
}