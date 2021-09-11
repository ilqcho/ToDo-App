const toDoService = require('../Services/toDoService');

module.exports = {
    saveTask: async(name, folder_id) => {
        let newTask = await toDoService.saveTask(name, folder_id);
        return newTask;
    },
    listTasks: async() => {
        let list = await toDoService.listTasks();
        return list;
    },
    editTask: async(id, name) => {
        let edit = await toDoService.editTask(id, name);
        return edit;
    },
    deleteTask: async(id) => {
        let deleteTask = await toDoService.deleteTask(id);
        return deleteTask;
    }
};