import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@material-ui/core/IconButton';
import {CheckBox, Delete} from '@material-ui/icons';
import {Button, Checkbox} from '@material-ui/core';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export function Todolist(props: PropsType) {
    const addTask = (title: string) => {
        props.addTask(title, props.id);
    }

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.id, title);
    }

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    return <div >
        <h3 style ={{textAlign: "center"}}><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div style = {{paddingTop:"20px"}}>
            <Button
                style = {{marginRight: "3px"}}
                size={"small"}
                variant = {props.filter === 'all' ? "outlined" : "contained"}
                color = {"primary"}
                onClick={onAllClickHandler}>All
            </Button>
            <Button
                style = {{marginRight: "3px"}}
                size={"small"}
                color = {"primary"}
                variant = {props.filter === 'active' ? "outlined" : "contained"}
                onClick={onActiveClickHandler}>Active
            </Button>
            <Button
                style = {{marginRight: "3px"}}
                size={"small"}
                color = {"primary"}
                variant = {props.filter === 'completed' ? "outlined" : "contained"}
                onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
        <ul style = {{listStyle: "none", marginLeft: "0px"}}>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }
                    const onTitleChangeHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.id);
                    }


                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                     <Checkbox color ={"primary"} onChange={onChangeHandler} checked={t.isDone}/>
                        <EditableSpan value={t.title} onChange={onTitleChangeHandler}/>
                        <IconButton onClick={onClickHandler}>
                            <Delete/>
                        </IconButton>
                    </li>
                })
            }
        </ul>

    </div>
}


