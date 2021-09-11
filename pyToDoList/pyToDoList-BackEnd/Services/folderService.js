const folderModel = require('../Models/folderModel');

module.exports = {
    saveFolder: async (folder) =>{
        let id = await folderModel.saveFolder(folder);
        folder.id = id;
        console.log('id que traigo del model: ', id);

        return folder;
    },
    folderList: async() => {
        let folderList = await folderModel.folderList();

        return folderList;
    },
    folderTaskList: async(id) => {
        let folderTaskList = await folderModel.folderTaskList(id);
        return folderTaskList;
    },
    deleteFolder: async(id) => {
        let result = await folderModel.deleteFolder(id);
        
        return result;
    }
};