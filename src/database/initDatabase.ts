import { Connection } from 'mysql';

/**
 * Drops all of the tables from the database
 * @param connection The MySQL connection
 */
function dropTables(connection: Connection) {
  // Department
  connection.query('DROP TABLE IF EXISTS Departments;', (err, result) => {
    if (err) throw err;
    console.log('Table dropped: Departments');
  });
  // Job Title
  connection.query('DROP TABLE IF EXISTS Positions;', (err, result) => {
    if (err) throw err;
    console.log('Table dropped: Positions');
  });
  // Country
  connection.query('DROP TABLE IF EXISTS Countries;', (err, result) => {
    if (err) throw err;
    console.log('Table dropped: Countries');
  });
  // Articles
  connection.query('DROP TABLE IF EXISTS Articles;', (err, result) => {
    if (err) throw err;
    console.log('Table dropped: Articles');
  });
  // Articles
  connection.query('DROP TABLE IF EXISTS Employees;', (err, result) => {
    if (err) throw err;
    console.log('Table dropped: Employees');
  });
}

/**
 * Creates all of the requried databases
 * @param connection The MySQL connection
 */
function initDatabase(connection: Connection) {
  console.log('Initialising database');

  // Department
  connection.query(
    `CREATE TABLE Departments (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(255) NULL
    );`,
    (err, result) => {
      if (err) throw err;
      console.log('Table created: Departments');
    }
  );

  // Job Title
  connection.query(
    `CREATE TABLE Positions (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    position VARCHAR(255) NULL
    );`,
    function (err, result) {
      if (err) throw err;
      console.log('Table created: Positions');
    }
  );

  // Country
  connection.query(
    `CREATE TABLE Countries (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(255) NULL
    );`,
    function (err, result) {
      if (err) throw err;
      console.log('Table created: Countries');
    }
  );

  // Articles
  connection.query(
    `CREATE TABLE Articles (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    title VARCHAR(255) NULL, 
    description VARCHAR(1000) NULL, 
    url VARCHAR(255) NULL, 
    employeeId INT UNSIGNED NULL, 
    usersDisliked VARCHAR(255) NULL, 
    usersLiked VARCHAR(255) NULL
    );`,
    function (err, result) {
      if (err) throw err;
      console.log('Table created: Articles');
    }
  );

  //  Employees
  connection.query(
    `CREATE TABLE Employees (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    firstName VARCHAR(255) NULL, 
    lastName VARCHAR(255) NULL, 
    department INT UNSIGNED NULL, 
    position INT UNSIGNED NULL, 
    country INT UNSIGNED NULL, 
    email VARCHAR(255) NULL, 
    password VARCHAR(255) NULL, 
    articles INT UNSIGNED NULL, 
    CONSTRAINT FK_ArticlesEmployee FOREIGN KEY (articles) REFERENCES Articles (id), 
    CONSTRAINT FK_CountryEmployee FOREIGN KEY (country) REFERENCES Countries (id), 
    CONSTRAINT FK_DepartmentEmployee FOREIGN KEY (department) REFERENCES Departments (id), 
    CONSTRAINT FK_PositionEmployee FOREIGN KEY (position) REFERENCES Positions (id) 
    );`,
    function (err, result) {
      if (err) throw err;
      console.log('Table created: Employees');
    }
  );

  connection.query(
    'ALTER TABLE Articles ADD FOREIGN KEY (employeeID) REFERENCES Employees (id);',
    function (err, result) {
      if (err) throw err;
      console.log('Table altered: Articles');
    }
  );
}

/**
 * Populates all of the tables in the database
 * @param connection The MySQL connection
 */
function populateDatabase(connection: Connection) {
  console.log('Populating the database');
  // Countries
  connection.query(
    `INSERT INTO Countries (name)
    VALUES ('South Africa'), ('United Kingdom'), ('United States');`,
    function (err, result) {
      if (err) throw err;
      console.log('Data inserted into: Countries');
    }
  );

  // Positions
  connection.query(
    `INSERT INTO Positions (position)
    VALUES ('Director'), ('Customer Service'), ('Developer');`,
    function (err, result) {
      if (err) throw err;
      console.log('Data inserted into: Positions');
    }
  );

  // Departments
  connection.query(
    `INSERT INTO Departments (name)
    VALUES ('HR'), ('Marketing'), ('Web Development');`,
    function (err, result) {
      if (err) throw err;
      console.log('Data inserted into: Departments');
    }
  );

  // Employees
  connection.query(
    `INSERT INTO Employees (firstName, lastName, department, position, country, email, password, articles )
    VALUES ('First Name', 'Last Name', 1, 1, 1, 'test@test.com', 'password123', NULL);`,
    function (err, result) {
      if (err) throw err;
      console.log('Data inserted into: Employees');
    }
  );

  // Articles
  connection.query(
    `INSERT INTO Articles (title, description, url, employeeId, usersDisliked, usersLiked)
    VALUES ('Page title', 'This is the description', 'www.google.com', 2, 3, 6);`,
    function (err, result) {
      if (err) throw err;
      console.log('Data inserted into: Articles');
    }
  );
}

export { dropTables, initDatabase, populateDatabase };
