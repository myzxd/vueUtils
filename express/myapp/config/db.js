var mysql = require("mysql");
var db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "448544",
    database: "test",
    insecureAuth: true
})
db.connect(function(err) {
    if (err) {
        console.log(err)
    } else {
        console.log("成功")
    }
})

module.exports = db