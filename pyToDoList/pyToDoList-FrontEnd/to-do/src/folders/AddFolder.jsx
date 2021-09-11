import React from "react";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import swal from "sweetalert";

export default function AddFolder(props){

    const [form, setForm] = React.useState({
        name: "",
        id: ""
    });

    const dispatch = useDispatch();

    const newFolder = (e) => {
        const newForm = JSON.parse(JSON.stringify(form));
        newForm.name = e.target.value;
        setForm(newForm);
    };

    const cancel = (e) => {
        props.history.push('/');
    };

    const save = async () => {
        try{
            const res = await axios.post("http://localhost:3000/folder", form);

            dispatch({
                type: 'ADD_FOLDER',
                folder: res.data
            });
            swal("YAY", "The new folder was added", "success");

            props.history.push('/');

        }
        catch(e){
            console.log(e.message);
            swal("Oops!", e.message, "error");
        }
    };
    return(
        <div className='body'>
            <div className='singleTasks'>
                <h1>Add folder</h1>
            </div>
            <div>
                <label>Name:</label>
                <input type="text" placeholder='Name' value={form.name} onChange={newFolder}/>
                <div>
                    <Link to='/'><button type='button' onClick={cancel} class="btn btn-default">Cancel</button></Link>
                    <button type='button' onClick={save} class='btn btn-primary'>Save</button>
                </div>
            </div>
        </div>
    );
};
