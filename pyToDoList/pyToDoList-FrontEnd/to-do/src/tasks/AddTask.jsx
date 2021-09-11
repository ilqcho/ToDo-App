import React from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import swal from 'sweetalert';

export default function AddTask(props){

    const folders = useSelector((state) => state.folders)

    const [form, setForm] = React.useState({
        name: '',
        folder_id: ''
    });

    const dispatch = useDispatch();

    const newTaskName = (e) => {
        const newForm = JSON.parse(JSON.stringify(form));
        newForm.name = e.target.value;
        setForm(newForm)
    };

    const newTaskFolder = (e) => {
        const newForm = JSON.parse(JSON.stringify(form));
        newForm.folder_id = e.target.value;
        setForm(newForm);
    };

    React.useEffect (async () => {
        try{
            const res = await axios.get('http://localhost:3000/folder')

            dispatch({
                type: 'LIST_FOLDERS',
                list: res.data
            });
        }
        catch(e){
            swal("Oops!", e.message, "error");
        }
    }, []);

    const save = async() => {
        try{
            const res = await axios.post('http://localhost:3000/to-do', form)

            dispatch({
                type: 'ADD_TASK',
                task: res.data
            });

            swal("YAY!", "Task added successfully", "success");

            props.history.push('/');
        }
        catch(e){
            swal("Oops!", e.message, "error");
        }
    };
    return(
        <div className='body2'>
            <label>Task:</label>
            <input type='text' placeholder='name' value={form.name} onChange={newTaskName}></input>
            <label>Folder:</label>
            <select name='folder_id' onChange={newTaskFolder} required>
                <option value="">Select a folder</option>
                {folders.map((oneFolder) =>
                    oneFolder ? (
                        <option value={oneFolder.id}>{oneFolder.name}</option>
                    ) : null
                )}
            </select>
            <div>
                <button onClick={save} class='btn btn-primary'>Save</button>
            </div>
            <div>
                <Link to='/'>Home</Link>
            </div>
        </div>
    );
}