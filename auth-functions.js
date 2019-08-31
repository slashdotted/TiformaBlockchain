var fs = require('fs');
var jwt = require('jsonwebtoken');
const { secret } = require('./config.json');

module.exports={
    printOperation : function(text) {
        fs.readFile('log/log.json', function (err, data) {
            var json = JSON.parse(data)
            json.push(text);
        
            fs.writeFile("log/log.json", JSON.stringify(json))
        })
    },
    getUserFromToken:function (t) {
        
        return jwt.verify(t.split(' ')[1], {secret}.secret, { complete: true }).payload;
    },
    checkTokenValidity: function (t) {
        try {
            jwt.verify(t.split(' ')[1], {secret}.secret);
            //nel caso di validità
            return true;
        } catch (err) {
            return false;
            //in caso di non validità
        }
    }

}