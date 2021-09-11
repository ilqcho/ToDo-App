const conexion = require('../db');

module.exports = {
    saveTask: async(name, folder_id) => {

        let query = 'SELECT * FROM `folders` WHERE id=?'
        let result = await conexion.query(query, [folder_id]);
        if(!result.length > 0){
            throw new Error('That folder doesn`t exist');
        }

        let query2 = 'INSERT INTO `to-do` (name, folder_id) VALUES (?, ?)';
        let result2 = await conexion.query(query2, [name, folder_id]);

        return result2.insertId + result2.name;
    },
    listTasks: async() => {
        let query = 'SELECT * FROM `to-do`';
        let result = await conexion.query(query)

        return result;
    },
    editTask: async(id, name) => {
        let query = 'UPDATE `to-do` SET name=? WHERE id=?';
        let result = await conexion.query(query, [id, name]);
        
        return result.changedRows;
    },
    deleteTask: async(id) => {
        let query = 'DELETE FROM `to-do` WHERE id=?';
        let result = await conexion.query(query, [id]);

        return result.affectedRows;
    }
};