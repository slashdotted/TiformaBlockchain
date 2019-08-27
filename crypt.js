//file che si occupa di criptare la password


var crypto = require('crypto');
var lunghezzaSalt=10;
//funzione che genera il valore di salatura
var genRandomString = function(){
    return crypto.randomBytes(Math.ceil(lunghezzaSalt/2))
            .toString('hex') 
            .slice(0,lunghezzaSalt);   
};

//funzione che esegue il criptaggio
var sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512', salt); 
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
};

module.exports={
    generateSalt: genRandomString,
    crypt: sha512
}