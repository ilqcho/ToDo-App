import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import '../App.css';

export default function ViewFolder(props){
    const params = useParams();
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks);
    const list = useSelector((state) => state.folders);
    const [folder, setFolder] = React.useState({});

    React.useEffect(async() => {
        if(!list || list.length == 0) return;

        setFolder(list.find((oneItem) => oneItem.id == params.id));

    }, [params, list]);

    React.useEffect(async() => {
        try{
            const res = await axios.get('http://localhost:3000/to-do');

            dispatch({
                type: 'LIST_TASK',
                list: res.data
            });
            console.log([tasks]);
        }
        catch(e){
            swal("Oops!", e.message, "error");
        }
    }, []);

    const deleteTask = async (id) => {
        try{
            await axios.delete('http://localhost:3000/to-do/' + id);

            dispatch({
                type: 'DELETE_TASK',
                idToDelete: id
            })

            swal("Poof!", "The task has been deleted", "success");
        }
        catch(e){
            swal("Oops!", e.message, "error");
        }
    };

    return(
        <div className='body'>
            <div>
                <h1>Folder: {folder.name}</h1>
            </div>
                <ul>
                    {tasks.find((oneItem) => oneItem.folder_id == folder.id) ? (
                    <li className='tasks'>Tasks:
                        <ul>
                            {tasks.map((oneItem) =>
                            oneItem.folder_id == folder.id ? (
                                <div class='singleTasks'>
                            <><><input type='checkbox' />{oneItem.name}</><button onClick={() => deleteTask(oneItem.id)} class='btn btn-primary'>Remove</button></>
                            </div>      
                                ) : null
                            )}
                        </ul>
                    </li> ) : <li> There are no tasks in this folder yet</li>
                                }
                </ul>                       
            <div>
                <Link to={'/'}>Home</Link>
            </div>
        </div>
    );
}