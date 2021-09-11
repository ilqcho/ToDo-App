const express = require('express');
const cors = require('cors');
const toDoController = require('./Controllers/toDoController');
const folderController = require('./Controllers/folderController');

const app = express();
const PORT = process.env.PORT ? process.env.PORT : 3000;

app.use(express.json());
app.use(cors());

app.post('/to-do', async (req, res) => {
    try{
        if(!req.body.name || !req.body.folder_id) {
            throw new Error('The name and folder must be completed');
        }

        let name = req.body.name.toUpperCase().trim();
        let folder_id = req.body.folder_id;

        await toDoController.saveTask(name, folder_id);

        res.send('The new task ' + name + ' has been saved');
    }
    catch(e){
        res.status(413).send(e.message);
    }
  });

app.get('/to-do', async (req, res) => {
    try{
        let taskList = await toDoController.listTasks()

        res.send(taskList);
    }
    catch(e){
        res.status(413).send(e.message);
    }
});

app.put('/to-do/:id', async (req, res) => {
    try{
        let name = req.body.name.toUpperCase().trim();
        let id = req.params.id; 

        let taskEdit = await toDoController.editTask(name, id);
        res.send(taskEdit);
    }
    catch(e){
        res.status(413).send(e.message);
    }

});

app.delete('/to-do/:id', async (req, res) => {
    try{
        let id = req.params.id;

        let deleteTask = await toDoController.deleteTask(id);
        res.send(deleteTask);
    }
    catch(e){
        res.status(413).send(e.message);
    }
});

app.post('/folder', async (req, res) => {
    try{
        if(!req.body.name){
            throw new Error('The field must be completed');
        }
        let folder = req.body.name.toUpperCase().trim();

        let newFolder = await folderController.saveFolder(folder);

        res.send('The new folder ' + newFolder + ' has been saved');

    }
    catch(e){
        res.status(413).send(e.message);
    }
});
app.get('/folder', async (req, res) => {
    try{
        let folderList = await folderController.folderList()
        
        res.send(folderList);
    }
    catch(e){
        res.status(413).send(e.message);
    }
});
app.get('/folder/to-do/:id', async (req, res) => {
    try{
        let id = req.params.id;

        let folderTaskList = await folderController.folderTaskList(id);

        if(folderTaskList == 0){
            throw new Error ('There are no tasks in this folder yet');
        }

        console.log(folderTaskList);
        res.send(folderTaskList);
    }
    catch(e){
        res.status(413).send(e.message);
    }
});
app.delete('/folder/:id', async (req, res) => {
    try{
        let id = req.params.id;

        await folderController.deleteFolder(id);
        res.send('The folder ' + id +  ' and all of its tasks has been deleted');
    }
    catch(e){
        res.status(413).send(e.message);
    }
});

app.listen(PORT, () => {
    console.log('App running on port ', PORT);
});