const mysql = require("mysql");

const client = mysql.createConnection({
    host: "localhost",
    user: "node-user",
    password: "Node_User432",
    database: "node_schema",
});

client.connect();

const usersList = ["107, Walaa, 27"];

usersList.forEach((userString) => {
    const user = userString.split(", ");
    client.query(
        `INSERT INTO
        users (id, name, age)
        VALUES (?, ?, ?);`,
        [user[0], user[1], user[2]],
        (err, res) => {
            if (err) console.log(err.message);
            else {
                console.log(res.affectedRows);
                console.log("Done Inserting new User!");
            }
        }
    );
});

client.query({
    sql: 'DELETE FROM users WHERE id=?',
    values: [107],
},
    (err, res) => { 
        if (err) console.log(err.message);
        else console.log(`No Affected Rows ${res.affectedRows}`);
    }
)

client.query("SELECT * FROM users", (err, res) => {
    if (err) console.log(err.message);
    console.log("\nHere are all the users");
    console.log(res);
});

client.end();
