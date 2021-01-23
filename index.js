// dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
//require("console.table");

const connection = mysql.createConnection({
	host: "localhost",

	// port
	port: 3306,

	// username
	user: "root",

	// password
	password: "MiloLucas123!",
	database: "employee_db",
});

connection.connect(function (err) {
	if (err) throw err;
	console.log("hello there.");
	// init();
});
