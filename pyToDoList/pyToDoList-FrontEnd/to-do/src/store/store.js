import {createStore} from 'redux';

const initialState = {
    folders: [],
    tasks: []
};

function reducer(state = initialState, action){
    const newState = JSON.parse(JSON.stringify(state));
    switch (action.type){
        case 'ADD_FOLDER':
            newState.folders.push(action.posts);
            return newState;

        case 'LIST_FOLDERS':
            newState.folders = action.list;
            return newState;

        case 'DELETE_FOLDER':
            newState.folders = newState.folders.filter((oneFolder) => oneFolder.id !== action.idToDelete);
            return newState;
        
        case 'LIST_TASK':
            newState.tasks = action.list;
            return newState;

        case 'ADD_TASK':
            newState.tasks.push(action.posts);
            return newState;

        case 'DELETE_TASK':
            newState.tasks = newState.tasks.filter((oneTask) => oneTask.id !== action.idToDelete);
            return newState;

        default:
            return state;
    }
};

export default createStore(reducer);