import { API_URL } from "./Utils"


export const CreateTask = async (taskobj) => {
    const url = `${API_URL}/tasks`;
    
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskobj),
    };
    try{
        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    }catch(err){
        return err;
    }
}

export const getAllTasks = async () => {
    const url = `${API_URL}/tasks`;
    
    const options = {
        method: 'GEt',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try{
        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    }catch(err){
        return err;
    }
}

export const deleteTasksById = async (id) => {
    const url = `${API_URL}/tasks/${id}`;
    
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try{
        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    }catch(err){
        return err;
    }
}

export const updateTasksById = async (id, reqBody) => {
    const url = `${API_URL}/tasks/${id}`;
    
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
    };
    try{
        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    }catch(err){
        return err;
    }
}