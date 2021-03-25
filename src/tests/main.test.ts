import * as mysql from 'mysql';

const dbName = `articlesmanagerdbtest${Date.now()}`;

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});

beforeAll(() => {
  connection.query(`CREATE DATABASE ${dbName}`);
  connection.changeUser({ database: dbName });
  connection.query(
    `CREATE TABLE Countries (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(255) NULL
    );`
  );
  connection.query(
    `INSERT INTO Countries (name)
    VALUES ('South Africa'), ('United Kingdom'), ('United States');`
  );
});

afterAll(() => {
  connection.query(`DROP DATABASE ${dbName}`);
});

describe('main', () => {
  it('does a basic test', (done) => {
    const country = 'South Africa';
    connection.query(
      `SELECT * FROM Countries WHERE name="${country}"`,
      (error, result) => {
        if (error) {
          throw error;
        }
        expect(result.length).toBe(1);
        expect(result[0]).toEqual({ id: expect.any(Number), name: 'South Africa' });
        done();
      }
    );
    expect(1).toBe(1);
    expect.assertions(3);
  });
});
