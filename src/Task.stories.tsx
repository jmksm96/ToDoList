import {action} from '@storybook/addon-actions'
import React from "react";
import { Task } from './task';


export default {
    title: 'Task Component',
    component: Task
}
const changeTaskTitle = action('Status changed');
const changeTaskStatus = action('Title changed');
const removeTask = action('Task removed');



export const TaskBaseExample = () => {
    return <>
        <Task
            task={{id: '1', isDone: true, title: 'CSS'}}
            changeTaskStatus={changeTaskStatus}
            changeTaskTitle={changeTaskTitle}
            removeTask={removeTask}
            todolistId={'todolistId1'}/>
            <Task
            task={{id: '2', isDone: false, title: 'JS'}}
            changeTaskStatus={changeTaskStatus}
            changeTaskTitle={changeTaskTitle}
            removeTask={removeTask}
            todolistId={'todolistId2'}/>
    </>
}