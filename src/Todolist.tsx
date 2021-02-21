import React, {ChangeEvent, useCallback} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@material-ui/core/IconButton';
import {CheckBox, Delete} from '@material-ui/icons';
import {Button, Checkbox} from '@material-ui/core';
import {Task} from "./task";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Todolist = React.memo(function (props: PropsType) {
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id);
    }, [props.addTask, props.id])

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title);
    }, [props.id, props.changeTodolistTitle])

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props.changeFilter, props.id]);
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props.changeFilter, props.id]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props.changeFilter, props.id]);


    let tasksForTodolist = props.tasks
    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === false);
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === true);
    }

    return <div>
        <h3 style={{textAlign: "center"}}><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div style={{paddingTop: "20px"}}>
            <Button
                style={{marginRight: "3px"}}
                size={"small"}
                variant={props.filter === 'all' ? "outlined" : "contained"}
                color={"primary"}
                onClick={onAllClickHandler}>All
            </Button>
            <Button
                style={{marginRight: "3px"}}
                size={"small"}
                color={"primary"}
                variant={props.filter === 'active' ? "outlined" : "contained"}
                onClick={onActiveClickHandler}>Active
            </Button>
            <Button
                style={{marginRight: "3px"}}
                size={"small"}
                color={"primary"}
                variant={props.filter === 'completed' ? "outlined" : "contained"}
                onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
        <ul style={{listStyle: "none", marginLeft: "0px"}}>
            {
                props.tasks.map(t => {
                    <Task
                        task={t}
                        changeTaskStatus={props.changeTaskStatus}
                        changeTaskTitle={props.changeTaskTitle}
                        removeTask={props.removeTask}
                        todolistId={t.id}
                        key={t.id}/>
                })
            }
        </ul>

    </div>
})










