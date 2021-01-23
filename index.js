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

const viewEmployees = () => {
	const employeesQuery = `SELECT 
        employee.id,
        CONCAT(employee.first_name, " ", employee.last_name) AS employee,
        title, name AS department, 
        CONCAT("$", salary) AS salary,
        CONCAT(manager.first_name, " ", manager.last_name) AS manager
        FROM employee
        INNER JOIN employee manager ON 
        manager.id = employee.manager_id
        INNER JOIN role ON 
        employee.role_id = role.id
        INNER JOIN department
        ON role.department_id = department.id
        ORDER BY employee.id asc;`;
	connection.query(employeesQuery, (err, data) => {
		if (err) throw err;
		console.table(data);
		init();
	});
};

const viewRoles = () => {
	const rolesQuery = `SELECT 
	role.id,
    title, name AS department, 
    CONCAT("$", salary) AS salary
    FROM role
    LEFT JOIN department ON 
	department.id = role.department_id;`;
	connection.query(rolesQuery, (err, data) => {
		if (err) throw err;
		console.table(data);
		init();
	});
};

const viewDepartments = () => {
	const departmentsQuery = `SELECT department.id, name AS department
        FROM department;`;
	connection.query(departmentsQuery, (err, data) => {
		if (err) throw err;
		console.table(data);
		init();
	});
};

const addEmployee = () => {
	console.log("add employee here");
};

const addRole = () => {
	console.log("add role here");
};

const addDepartment = () => {
	console.log("add department here");
};

const employeeRoleUpdate = () => {
	console.log("update employee roles here");
};
