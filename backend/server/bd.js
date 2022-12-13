const Database = require("better-sqlite3");
const db = new Database("chat.db");

//const buffer = db.serialize(() => {
const stmt = db.prepare(`
        CREATE TABLE IF NOT EXISTS users
            (id integer primary key, username NOT NULL, password NOT NULL, status)`);
stmt.run();

/*
    const stmt = db.prepare("INSERT INTO, lorem VALUES (?)");
    for (let i = 0; i < 10; i++) {
        stmt.run("Ipsum " + i);
    }
    stmt.finalize();

    db.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
        console.log(row.id + ": " + row.info);
    });
    */
//});

class Users {
  static all() {
    const stmt = db.prepare("SELECT * FROM users");
    const users = stmt.all();
    return users;
  }
  static findUsername(id) {
    const stmt = db.prepare("SELECT * FROM users WHERE id= ?");
    const foundUsername = stmt.get(id);
    return foundUsername;
  }
  static findId(username) {
    const stmt = db.prepare("SELECT id FROM users WHERE username= ?");
    const foundId = stmt.get(username);
    console.log("foundId", foundId);
    return foundId;
  }
  static findOnline() {
    const stmt = db.prepare("SELECT * FROM users WHERE status= ?");
    const users = stmt.all("ONLINE");
    console.log("foundONLINE", users);
    return users;
  }
  static create(data) {
    const stmt = db.prepare(
      "INSERT INTO users (username, password, status) VALUES (?, ?, ?)"
    );
    const info = stmt.run(data.username, data.password, data.status);
    console.log("Added following users: ", info.changes);
  }
  static delete(id) {
    const stmt = db.prepare("DELETE FROM users WHERE id= ?");
    const info = stmt.run(id);
    console.log("Deleted following users: ", info.changes);
  }
  static findUser(username, password) {
    const stmt = db.prepare(
      "SELECT * FROM users WHERE username= ? AND password= ?"
    );
    const foundUser = stmt.get(username, password);
    console.log("foundUser", foundUser);
    return foundUser;
  }
  static UpdateStatus(id) {
    const stmtGet = db.prepare("SELECT * FROM users WHERE status= ? AND id= ?");
    const user = stmtGet.get("ONLINE", id);
    if (user) {
      return;
    }
    const stmt = db.prepare("UPDATE users SET status= ? WHERE id = ?");
    const info = stmt.run("ONLINE", id);
    console.log("Change status following users: ", info.changes);
  }
}

module.exports = db;
module.exports.Users = Users;

//db.close();
