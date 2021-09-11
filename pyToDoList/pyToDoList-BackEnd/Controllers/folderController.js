const folderService = require ('../Services/folderService');

module.exports = {
    saveFolder: async(folder) => {
        let newFolder = folderService.saveFolder(folder);
        return newFolder;
    },
    folderList: async() => {
        let list = await folderService.folderList();
        return list;
    },
    folderTaskList: async(id) => {
        let list = await folderService.folderTaskList(id);
        return list;
    },
    deleteFolder: async(id) => {
        let deleteFolder = await folderService.deleteFolder(id);
        return deleteFolder;
    }



}