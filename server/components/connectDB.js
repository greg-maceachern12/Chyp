module.exports = {
  connect: function () {
    const mysql = require('mysql');
    const con = mysql.createConnection({
      host: "104.198.74.166",
      user: "root",
      password: "ChypIt!?",
      database: "ChypDB"
    });
    return con;
  }
};
