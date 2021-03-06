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
	connection.query(`SELECT * FROM employee;`, (err, data) => {
		if (err) throw err;
		const managersArray = data.map((employee) => {
			return {
				name: `${employee.first_name} ${employee.last_name}`,
				value: employee.id,
			};
		});
		connection.query(`SELECT * FROM role;`, (err, data) => {
			if (err) throw err;
			const rolesArray = data.map((role) => {
				return { name: role.title, value: role.id };
			});
			inquirer
				.prompt([
					{
						type: "input",
						name: "firstName",
						message: "first name: ",
					},
					{
						type: "input",
						name: "lastName",
						message: "last name: ",
					},
					{
						type: "list",
						name: "role",
						message: "role: ",
						choices: rolesArray,
					},
					{
						type: "list",
						name: "manager",
						message: "manager: ",
						choices: managersArray,
					},
				])
				.then(({ firstName, lastName, role, manager }) => {
					connection.query(
						`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);`,
						[firstName, lastName, role, manager],
						(err, data) => {
							if (err) throw err;
							viewEmployees();
							init();
						}
					);
				});
		});
	});
};

const addRole = () => {
	const roleQuery = `SELECT * FROM role;`;
	const departmentQuery = `SELECT * FROM department;`;
	connection.query(roleQuery, (err, data) => {
		if (err) throw err;
	});
	connection.query(departmentQuery, (err, data) => {
		if (err) throw err;
		const departmentsArray = data.map((department) => {
			return { name: department.name, value: department.id };
		});
		inquirer
			.prompt([
				{
					type: "input",
					name: "title",
					message: "What is the title of the role?",
				},
				{
					type: "input",
					name: "salary",
					message: "What is the salary of the role?",
				},
				{
					type: "list",
					name: "department",
					message: "What department is the role in?",
					choices: departmentsArray,
				},
			])
			.then(({ title, salary, department }) => {
				connection.query(
					`INSERT INTO role (title, salary, department_id)
                    VALUES (?, ?, ?);`,
					[title, salary, department],
					(err) => {
						if (err) throw err;
						viewRoles();
						init();
					}
				);
			});
	});
};

const employeeRoleUpdate = () => {
	const employeeQuery = `SELECT * FROM employee;`;
	const roleQuery = `SELECT * FROM role;`;
	console.log("hi");
	connection.query(employeeQuery, (err, data) => {
		if (err) throw err;

		const employeesArray = data.map((employee) => {
			return {
				name: `${employee.first_name} ${employee.last_name}`,
				value: employee.id,
			};
		});
		connection.query(roleQuery, (err, data) => {
			if (err) throw err;
			const rolesArray = data.map((role) => {
				return {
					name: role.title,
					value: role.id,
				};
			});
			inquirer
				.prompt([
					{
						type: "list",
						name: "employees",
						message: "Which employee would you like to update?",
						choices: employeesArray,
					},
					{
						type: "list",
						name: "role",
						message: "What is their new role?",
						choices: rolesArray,
					},
				])
				.then(({ employees, role }) => {
					const updateQuery = `UPDATE employee
                    SET role_id = ?
                    WHERE id = ?;`;
					connection.query(updateQuery, [role, employees], (err, data) => {
						if (err) throw err;
						viewEmployees();
						init();
					});
				});
		});
	});
};

const addDepartment = () => {
	const departmentQuery = `SELECT * FROM department;`;
	connection.query(departmentQuery, (err, data) => {
		if (err) throw err;

		inquirer
			.prompt([
				{
					type: "input",
					name: "name",
					message: "What is the name of the department you'd like to add?",
					validate: (name) => {
						for (let i = 0; i < data.length; i++) {
							if (data[i].name === name) {
								return "Department already exists!";
							}
						}
						return true;
					},
				},
			])
			.then(({ name }) => {
				connection.query(departmentQuery, (err, data) => {
					if (err) throw err;

					connection.query(
						`INSERT INTO department (name)
                        VALUES (?);`,
						[name],
						(err, data) => {
							if (err) throw err;
							viewDepartments();
							init();
						}
					);
				});
			});
	});
};
