const dbName = "pomodoro_timer_db";
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: ""
});

con.connect(function(error)
{
  if (error)
  {
    throw error;
  }
  console.log("Connected!");

  var sqlCreateDatabase = "CREATE DATABASE " + dbName;
  con.query(sqlCreateDatabase, function (error, result)
  {
    if (error)
    {
      throw error;
    }
    console.log("Database created");
  });

  var sqlCreateTable = "CREATE TABLE " + dbName + ".timer_data " +
                       "(id INT(11) AUTO_INCREMENT PRIMARY KEY, " +
                        "task_description VARCHAR(255), " +
                        "created_at VARCHAR(255), " +
                        "end_time VARCHAR(255))";
  con.query(sqlCreateTable, function (error, result)
  {
    if (error)
    {
      throw error;
    }
    console.log("Table created");
    console.log("Hooray! Much Success");
    process.exit();
  });
});