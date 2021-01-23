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
	init();
});

const init = () => {
	inquirer
		.prompt([
			{
				type: "list",
				name: "action",
				message: "What would you like to do?",
				choices: [
					"View all employees",
					"View employees by department",
					"View roles",
					"View departments",
					"Add employee",
					"Add role",
					"Add department",
					"Update employee",
					"Exit",
				],
			},
		])
		.then((data) => {
			switch (data.action) {
				case "View all employees":
					viewEmployees();
					break;
				case "View employees by department":
					viewEmployeesByDepartment();
					break;
				case "View roles":
					viewRoles();
					break;
				case "View departments":
					viewDepartments();
					break;
				case "Add employee":
					addEmployee();
					break;
				case "Add role":
					addRole();
					break;
				case "Add department":
					addDepartment();
					break;
				case "Update employee role":
					employeeRoleUpdate();
					break;
				case "Exit":
					exit();
					break;
			}
		});
};

viewEmployees = () => {
	console.log("show employees here");
};

viewEmployeesByDepartment = () => {
	console.log("show employees here");
};

viewRoles = () => {
	console.log("show roles here");
};

viewDepartments = () => {
	console.log("show departments here");
};

addEmployee = () => {
	console.log("add employee here");
};

addRole = () => {
	console.log("add role here");
};

addDepartment = () => {
	console.log("add department here");
};

employeeRoleUpdate = () => {
	console.log("update employee roles here");
};
