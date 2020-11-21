'use strict';

const fs = require('fs');
const util = require('util');
const mysql = require('mysql2/promise');
const config = require('./config');

const sqlPromise = mysql.createConnection(config.mysql);

(async () => {
    const sql = await sqlPromise;
    // handle unexpected errors by just logging them
    sql.on('error', (err) => {
        console.error(err);
        sql.end();
    });
})();

module.exports.login = async (username, password) => {
    const sql = await sqlPromise;
    let query="SELECT userid, username, password, usertype FROM `user` WHERE `username`='"+username+"' and password = '"+password+"'";

    const [rows] = await sql.query(query);
    if (rows.length) {
        return {
            userid: rows[0].userid,
            username: rows[0].username,
            usertype: rows[0].usertype
        };
    }
};

/*  userid int primary key auto_increment,
    username varchar(30),
    password varchar(30),
    email  varchar(30),
    usertype  varchar(30)*/

module.exports.addUser = async (username, password, email, role, metarole) => {
    const sql = await sqlPromise;

    // now query the table and output the results
    const [rows] = await sql.query(sql.format('insert ignore into CRIP.users(username, password, email, role, metarole) values (?,?,?,?,?)', [username, password, email, role, metarole]));

};

module.exports.getUsers = async (userID) => {
    const sql = await sqlPromise;

    let query = 'SELECT id, username, email FROM users WHERE role="client" AND metarole='+agentID;
    console.log(query);
    // now query the table and output the results
    const [rows] = await sql.query(query);

    return rows.map((row) => {
        return {
            id: row.id,
            username: row.username,
            email: row.email
        };
    });
};