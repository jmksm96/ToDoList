import React, {useCallback, useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Toolbar, Typography, Container, Grid, Button, Paper} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import {
    removeTodoListAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    addTodolistAC
} from "./state/todolists-reducer";
import { removeTaskAC, addTaskAC, changeTaskStatusAC, changeTaskTitleAC} from './state/tasks-reducer';
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

export type  FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


const AppWithRedux = () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)


    const removeTask=useCallback((id: string, todolistId: string) => {
        const action = removeTaskAC(id, todolistId)
        dispatch(action)
    }, [dispatch])

    const addTask=useCallback((title: string, todolistId: string)=> {
        const action = addTaskAC(title, todolistId)
        dispatch(action)
    },[dispatch])

    const changeFilter=useCallback((value: FilterValuesType, todolistId: string)=> {
        const action = changeTodolistFilterAC(value, todolistId)
        dispatch(action)
    },[dispatch])

    const changeStatus=useCallback((id: string, isDone: boolean, todolistId: string)=> {
        const action = changeTaskStatusAC(id, isDone, todolistId)
        dispatch(action)
    },[dispatch])

    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string)=> {
        const action = changeTaskTitleAC(id, newTitle, todolistId)
        dispatch(action)
    },[dispatch])

    const removeTodolist=useCallback((id: string)=> {
        const action = removeTodoListAC(id)
        dispatch(action)
    },[dispatch])

    const changeTodolistTitle = useCallback((id: string, title: string) => {
        const action = changeTodolistTitleAC(id, title)
        dispatch(action)
    },[dispatch])

    const addTodolist = useCallback((title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }, [dispatch])

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        <IconButton color="inherit" aria-label="menu">
                            News
                        </IconButton>
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "10px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            return <Grid item key={tl.id}>
                                <Paper elevation={10} style={{padding: '30px'}}><Todolist
                                    key={tl.id}
                                    id={tl.id}
                                    title={tl.title}
                                    tasks={tasksForTodolist}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
                                    filter={tl.filter}
                                    removeTodolist={removeTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
