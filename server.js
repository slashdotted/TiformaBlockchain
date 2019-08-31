var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var upload = require('./attachment');
var query = require('./query-server');
const { secret } = require('./config.json');
var app = express();
app.use(bodyParser.json());
app.use(cors());
var  expressJwt = require ('express-jwt');
var _ = require('underscore');
var api = require('./api');
var roles = require ('./roles');
var Regex = require ('regex')

//da attivare nel caso di test




  //configuro l'express jwt
app.use(
    expressJwt({
        secret: {secret}.secret,
        
    }).unless({path:['/login',new RegExp('/[a-zA-Z0-9]+/Download/[a-zA-Z0-9 -]+\.[a-zA-Z]+')]})
);

//ruoli disponibili al momento

app.listen(8080, function () {
    console.log('listening on port 8080!');
    // effettuo connessione al server phpmyadmin per connettermi al db con all'interno le utenze
    


});


function authorize(roles = []) {
    // roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === 'string') {
        roles = [roles];
    }
    
    return [
        // authenticate JWT token and attach user to request object (req.user)

        expressJwt({ secret }),

        // authorize based on user role
        (req, res, next) => {
            var regex = new Regex ("/[a-zA-Z0-9]+/Download/[a-zA-Z0-9 -]+\.[a-zA-Z]+");
            if(regex.test(req.originalUrl)) next();
            
            if (roles.length && !roles.includes(req.user.user.role)) {

                // user's role is not authorized

                return res.status(401).json({ message: 'Unauthorized' });
            }
            console.log("authorization success");
            // authentication and authorization successful
            next();
        }
    ];
}
//getione degli utenti 
app.get('/users',authorize('Admin'),api.getUsers);
app.get('/users/delete/[a-zA-Z@.]+',authorize('Admin'),api.deleteUser);

app.get('/queries/selectStudentByName?[a-zA-Z]+', authorize(roles.read),query.getStudentsByName);
app.get('/queries/selectStudentsBySurname?[a-zA-Z]+', authorize(roles.read),query.getStudentsBySurname);
app.get('/queries/selectStudentsBySerialNumber?[a-zA-Z]+', authorize(roles.read),query.getStudentsBySerialNumber);
app.get('/queries/selectDepartmentByName?[a-zA-Z]+', authorize(roles.read),query.getDepartmentsByName);
app.get('/queries/selectCoursesByName?[a-zA-Z]+', authorize(roles.read),query.getCoursesByName);
app.get('/queries/selectCoursesByCourseCode?[a-zA-Z]+', authorize(roles.read),query.getCoursesByCourseCode);
app.get('/queries/selectModulesByName?[a-zA-Z]+', authorize(roles.read),query.getModulesByName);
app.get('/queries/selectModulesByModuleCode?[a-zA-Z]+', authorize(roles.read),query.getModulesByModuleCode);
app.get('/queries/selectStudyPlanByName?[a-zA-Z]+', authorize(roles.read),query.getStudentModulesByName);
app.get('/queries/selectStudyPlanByModuleCode?[a-zA-Z]+', authorize(roles.read),query.getStudentModulesByModuleCode);
app.get('/queries/selectSemestersByName?[a-zA-Z]+', authorize(roles.read),query.getSemestersByName);
app.get('/queries/selectSemestersByModuleCode?[a-zA-Z]+', authorize(roles.read),query.getSemestersByModuleCode);
app.get('/queries/selectCertificationByStudentName?[a-zA-Z]+', authorize(roles.read),query.getCertificationByStudentName);
app.get('/queries/selectCertificationByStudentSurame?[a-zA-Z]+', authorize(roles.read),query.getCertificationByStudentSurname);
app.get('/queries/selectCertificationByModuleCode?[a-zA-Z]+', authorize(roles.read),query.getCertificationByStudentModuleCode);

// Ritorna tutti gli elementi, esempio http://localhost:3000/api/Student
app.get('/[a-zA-Z]+', authorize(roles.read), api.getGeneral);

app.get('/CertificationPerStudent/[0-9a-zA-Z]+', authorize(roles.read), api.getCertificationPerStudent);

// Ritorna un singolo elemento selezionato dall'ID, esempio http://localhost:3000/api/Student/5
app.get('/[a-zA-Z]+/[0-9a-zA-Z]+', authorize(roles.read), api.getPerId);

// Aggiorna un singolo elemento selezionato dall'ID passandoli un oggetto JSON, esempio http://localhost:3000/api/Student/5
app.put('/[a-zA-Z]+/[0-9a-zA-Z]+', authorize(roles.writeAdmin), api.putGeneral);

// Elimina un singolo elemento selezionato dall'ID, esempio http://localhost:3000/api/Student/5
app.delete('/[a-zA-Z]+/[0-9a-zA-Z]+', authorize(roles.writeAdmin), api.deleteById);

app.post('/register',authorize('Admin'),api.register);

app.post('/login', api.login);

// Esegue le transazioni custom create passandoli un elemento JSON, esempio http://localhost:3000/api/CreateStudent
app.post('/[a-zA-Z]+', authorize(roles.writeAdmin), api.postCustomTransaction);

//Esegue l'upload dei file come foto e allegati url prende /contactID/upload/nomefile.estensione
app.post('/[a-zA-Z0-9]+/Upload', authorize(roles.writeAdmin), upload.upload);

//Permette di scaricare un file precedentemente caricato
app.get('/[a-zA-Z0-9]+/Download/[a-zA-Z0-9 -]+\.[a-zA-Z]+', upload.download);

app.get('/[a-zA-Z0-9]+/Delete/[a-zA-Z0-9\s\W]+\.[a-zA-Z]+', authorize(roles.writeAdmin), upload.remove);


//da attivare nel caso di test
/*app.use(function(err, req, res, next) {
   console.log("ERRORE "+ err);
   res.send('0');
  });*/