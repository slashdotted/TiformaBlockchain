
var mysql = require('mysql');

module.exports={
    connect:  function (){
        console.log("sono stato chiamato");
        var con= mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "TiformaSupsiBlockchain_schema"
        })
        con.connect(function (err) {
            if (err) throw err;
        })
        return con;
    }
}