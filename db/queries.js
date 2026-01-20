const pool = require("./pool");

async function getAllMessages(){
    const {rows} = await pool.query("SELECT username,message,id FROM messages");
    return rows;              
}
async function postMessage(username,text){
    await pool.query("INSERT INTO messages(username,message,date) VALUES($1,$2,now())",[username,text]);
}

async function getMessageDetails(id){
    const {rows} = await pool.query("SELECT * FROM messages WHERE id = $1",[id]);
    return rows
}
module.exports={
    getAllMessages,
    postMessage,
    getMessageDetails
}