const toDoModel = require('../Models/toDoModel');

module.exports = {
    saveTask: async (name, folder_id) =>{
        let newTask = await toDoModel.saveTask(name, folder_id);

        return newTask;
    },
    listTasks: async() => {
        let taskList = await toDoModel.listTasks();

        return taskList;
    },
    editTask: async(id, name) => {
        let editTask = await toDoModel.editTask(id, name);

        if (editTask == 1){
            return('The task was succesfully modified');
        }else{
            return false;
        }
    },
    deleteTask: async(id) => {
        let result = await toDoModel.deleteTask(id);

        if(result == 1){
            return ('The task has been deleted');
        }else{
            return ('Couldn`t delete the task');
        }
    }
};