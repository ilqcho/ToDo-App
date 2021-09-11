const conexion = require('../db');

module.exports = {
    saveFolder: async(folder) => {
        let query = 'INSERT INTO `folders` (name) VALUE (?)';
        let result = await conexion.query(query, [folder]);

        return result.insertId;
    },
    folderList: async() => {
        let query = 'SELECT * FROM `folders`';
        let result = await conexion.query(query);

        return result;
    },
    folderTaskList: async(id) => {
        let query = 'SELECT * from `to-do` WHERE folder_id = ?';
        let result = await conexion.query(query, [id]);

        return result;
    },
    deleteFolder: async(id) => {

        let query1 = 'DELETE FROM `to-do` WHERE folder_id = ?';
        let result1 = await conexion.query(query1, [id])

        let query = 'DELETE FROM `folders` WHERE id=?';
        let result = await conexion.query(query, [id]);

        return result.affectedRows + result1;
    }
};