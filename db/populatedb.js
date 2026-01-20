const {Client} = require("pg");
//require("dotenv").config();
const { argv } =require('node:process');
const SQL =`CREATE TABLE IF NOT EXISTS messages(
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
username VARCHAR(255),
message TEXT,
date VARCHAR(511)
);
INSERT INTO messages(username,message,date)
VALUES
    ('Amando',
    'Hello World',
    now()),
    ('Derek',
    'Hi everybody',
    now())
    ;
`;
async function main() {
    console.log("seeding...");
    const client = new Client({
        connectionString: argv[2]
    })
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}
main();