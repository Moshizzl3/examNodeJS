import db from "./connection.js";
import bcrypt from "bcrypt";
const isDeleteMode = true;

if (isDeleteMode) {
  db.execute("DROP TABLE IF EXISTS likes");
  db.execute("DROP TABLE IF EXISTS followers");
  db.execute("DROP TABLE IF EXISTS comments");
  db.execute("DROP TABLE IF EXISTS messages");
  db.execute("DROP TABLE IF EXISTS posts");
  db.execute("DROP TABLE IF EXISTS users");
}

db.execute(
  `CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100), 
    last_name VARCHAR(100),
    mail VARCHAR(50),
    profile_image_url VARCHAR(300) NULL, 
    cover_image_url VARCHAR(300) NULL,
    password VARCHAR(500))
  `
);

db.execute(
  `CREATE TABLE IF NOT EXISTS posts(
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
      text VARCHAR(300),
      created_on DATETIME,
      image_url VARCHAR(300) NULL,
      user_id INTEGER,
      CONSTRAINT fk_posts_user FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE)`
);

db.execute(
  `CREATE TABLE IF NOT EXISTS comments(
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
      text VARCHAR(300), 
      created_on DATETIME, 
      user_id INTEGER,
      posts_id INTEGER,
      CONSTRAINT fk_comments_posts FOREIGN KEY(posts_id) REFERENCES posts(id) ON DELETE CASCADE,
      CONSTRAINT fk_comments_users FOREIGN KEY(user_id) REFERENCES posts(id) ON DELETE CASCADE)
      `
);

db.execute(
  `CREATE TABLE IF NOT EXISTS likes(
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
      like_amount INTEGER, 
      created_on DATETIME, 
      user_id INTEGER,
      posts_id INTEGER,
      comments_id INTEGER,
      CONSTRAINT fk_likes_posts FOREIGN KEY(posts_id) REFERENCES posts(id) ON DELETE CASCADE,
      CONSTRAINT fk_likes_comments FOREIGN KEY(posts_id) REFERENCES posts(id) ON DELETE CASCADE,
      CONSTRAINT fk_likes_users FOREIGN KEY(user_id) REFERENCES posts(id) ON DELETE CASCADE)
      `
);

db.execute(`CREATE TABLE IF NOT EXISTS followers(
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  user_id INTEGER,
  followed_on DATETIME,
  following_user_id INTEGER,
  CONSTRAINT fk_following_users FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_following_users_follower FOREIGN KEY(following_user_id) REFERENCES users(id) ON DELETE CASCADE
)`);

//create test data
if (isDeleteMode) {
  // Create some users
  db.execute(
    `INSERT INTO users(first_name, last_name, mail, password, profile_image_url, cover_image_url) VALUES(?,?,?,?,?,?)`,
    [
      "SvampeBob",
      "Firkant",
      "mail@mail.dk",
      await bcrypt.hash("123", 12),
      "mo.jpeg",
      "space.jpg",
    ]
  );

  db.execute(
    `INSERT INTO users(first_name, last_name, mail, password, profile_image_url, cover_image_url) VALUES(?,?,?,?,?,?)`,
    [
      "Patrick",
      "mogensen",
      "mail1@mail.dk",
      await bcrypt.hash("1234", 12),
      "bla.jpg",
      "space.jpg",
    ]
  );

  // Create some posts
  db.execute(
    `INSERT INTO posts(text, created_on, image_url, user_id) VALUES(?,?,?,?)`,
    [
      "Get to know caPs and support him on his road to victory in League of Legends Season 2023! 😎",
      new Date().toISOString().slice(0, 19).replace("T", " "),
      "space.jpg",
      1,
    ]
  );

  db.execute(
    `INSERT INTO posts(text, created_on, image_url, user_id) VALUES(?,?,?,?)`,
    [
      "Get to know caPs and support him on his road to victory in League of Legends Season 2023! 😎",
      new Date().toISOString().slice(0, 19).replace("T", " "),
      "0bcfb617-bb0e-438e-8fe6-186a2ed57486cat_or_dog_1.jpg",
      1,
    ]
  );
  db.execute(
    `INSERT INTO posts(text, created_on, image_url, user_id) VALUES(?,?,?,?)`,
    [
      "Get to know caPs and support him on his road to victory in League of Legends Season 2023! 😎",
      new Date().toISOString().slice(0, 19).replace("T", " "),
      "space.jpg",
      1,
    ]
  );

  db.execute(
    `INSERT INTO posts(text, created_on, image_url, user_id) VALUES(?,?,?,?)`,
    [
      "Get to know caPs and support him on his road to victory in League of Legends Season 2023! 😎",
      new Date().toISOString().slice(0, 19).replace("T", " "),
      "0bcfb617-bb0e-438e-8fe6-186a2ed57486cat_or_dog_1.jpg",
      2,
    ]
  );

  db.execute(
    `INSERT INTO posts(text, created_on, image_url, user_id) VALUES(?,?,?,?)`,
    [
      "Get to know caPs and support him on his road to victory in League of Legends Season 2023! 😎",
      new Date().toISOString().slice(0, 19).replace("T", " "),
      "0bcfb617-bb0e-438e-8fe6-186a2ed57486cat_or_dog_1.jpg",
      2,
    ]
  );

  db.execute(
    `INSERT INTO posts(text, created_on, image_url, user_id) VALUES(?,?,?,?)`,
    [
      "Get to know caPs and support him on his road to victory in League of Legends Season 2023! 😎",
      new Date().toISOString().slice(0, 19).replace("T", " "),
      "0bcfb617-bb0e-438e-8fe6-186a2ed57486cat_or_dog_1.jpg",
      2,
    ]
  );

  // create som followers
  db.execute(
    `INSERT INTO followers (user_id, followed_on,following_user_id) VALUES(?,?,?)`,
    [1, new Date().toISOString().slice(0, 19).replace("T", " "), 2]
  );
  db.execute(
    `INSERT INTO followers (user_id, followed_on,following_user_id) VALUES(?,?,?)`,
    [2, new Date().toISOString().slice(0, 19).replace("T", " "), 1]
  );

  // create some likes

  db.execute(
    `INSERT INTO likes (like_amount, created_on, user_id, posts_id, comments_id) VALUES(?,?,?,?,?)`,
    [1, new Date().toISOString().slice(0, 19).replace("T", " "), 1, 5, null]
  );
  db.execute(
    `INSERT INTO likes (like_amount, created_on, user_id, posts_id, comments_id) VALUES(?,?,?,?,?)`,
    [1, new Date().toISOString().slice(0, 19).replace("T", " "), 1, 5, null]
  );
  db.execute(
    `INSERT INTO likes (like_amount, created_on, user_id, posts_id, comments_id) VALUES(?,?,?,?,?)`,
    [1, new Date().toISOString().slice(0, 19).replace("T", " "), 2, 1, null]
  );

  // // create some comments
  // db.execute(`INSERT INTO comments(text, created_on, user_id, posts_id)`, [
  //   "Misinformation tweet. They are upset that Tesla cut prices last week and they bought at much higher prices.",
  //   new Date().toISOString().slice(0, 19).replace("T", " "),
  //   1,
  //   1
  // ]);
  // db.execute(`INSERT INTO comments(text, created_on, user_id, posts_id)`, [
  //   "I totally agree here",
  //   new Date().toISOString().slice(0, 19).replace("T", " "),
  //   2,
  //   1
  // ]);
}

db.end();
