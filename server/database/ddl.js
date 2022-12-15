import db from "./connection.js";

const isDeleteMode = true;

if (isDeleteMode) {
    db.execute("DROP TABLE IF EXISTS jobs");
    db.execute("DROP TABLE IF EXISTS users");
    db.execute("DROP TABLE IF EXISTS roles");
}

db.execute(
  `CREATE TABLE IF NOT EXISTS roles(
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
      role_name VARCHAR(50))`
);

db.execute(
  `CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100), 
    last_name VARCHAR(100),
    mail VARCHAR(50), 
    password VARCHAR(500), 
    role_id INTEGER,
    CONSTRAINT fk_role_user FOREIGN KEY (role_id) REFERENCES roles(id))`
);

db.execute(
  `CREATE TABLE IF NOT EXISTS jobs(
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
      job_title VARCHAR(50), 
      job_discription VARCHAR(50),
      job_create_id VARCHAR(50), 
      isActive BOOLEAN,
      job_creator_id INTEGER,
      CONSTRAINT fk_job_creator FOREIGN KEY(job_creator_id) REFERENCES users(id))
      `
);

if (isDeleteMode) {
  db.execute("INSERT INTO roles(role_name) VALUES('user')");
  db.execute("INSERT INTO roles(role_name) VALUES('admin')");
  db.execute(
    "INSERT INTO users(first_name, last_name, mail, password, role_id) VALUES('SvampeBob', 'firkant', 'mail@mail.dk', '123',1)"
  );
}

db.end();
