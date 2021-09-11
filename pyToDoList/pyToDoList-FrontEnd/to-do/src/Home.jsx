import React from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import swal from 'sweetalert';

export default function ListFolders(props){

    const dispatch = useDispatch();
    const folders = useSelector((state) => state.folders);

    React.useEffect(async () => {
        try{
            const res = await axios.get('http://localhost:3000/folder');
            dispatch({
                type: 'LIST_FOLDERS',
                list: res.data
            });
        }
        catch(e){
            swal('Error!', e.message, 'error');
        }
    }, []);

    const deleteFolder = async (id) => {
        try{
            const deleting = await swal({
                title: 'Are you sure you want to delete the folder and its tasks?',
                text: 'Once deleted, you can`t go back!',
                icon: 'warning',
                buttons: ['Cancel', 'Yes, i`m sure!'],
                dangerMode: true,
            });

            if(deleting){
                await axios.delete('http://localhost:3000/folder/' + id);

                dispatch({
                    type: 'DELETE_FOLDER',
                    idToDelete: id
                });
    
                swal('Poof!', 'The folder has been deleted', 'success');
            }
        }
        catch(e){
            swal('Oops!', e.message, 'error');
        }
    };
    return(
        <div className='body'>
            <header>
                <h1>WELCOME TO THE TO-DO APP</h1>
            </header>
            <div className='title'>
                <h1>Folders:</h1>
            </div>
            <div className='links'>
                <div>
                    <Link to={'/folder/add'}>Add folder</Link>
                </div>
                <div>
                    <Link to={'/task/add'}>Add task</Link>
                </div>
            </div>
            <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {folders.map((oneFolder) =>
                    oneFolder ? (
                        <tr key={oneFolder.id}>
                            <td>{oneFolder.id}</td>
                            <td>{oneFolder.name}</td>
                            <td>
                                <div>
                                    <Link to={'/folder/view/' + oneFolder.id}><button title='View folder' type='button' class='btn btn-primary'>View items</button></Link>
                                    <button title='Delete folder' type='button' class='btn btn-danger' onClick={() => deleteFolder(oneFolder.id)}>Remove</button>
                                </div>
                            </td>
                        </tr>
                    ) : null
                    )}
                </tbody>
            </table>
        </div>
    );
};