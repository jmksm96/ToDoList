import React, {useState} from 'react';
import './App.css';
import TodoList, { TasksType } from "./Components/TodoList";
import {v1} from 'uuid';

export type FilterValueType = "all" | "active" | "completed"
export type TodolistType = {
    id: string
    title: string
    filter: string
}
type TasksStateType = {
    [key: string]: Array<TasksType>
}

function App() {

function removeTodolist(id: string) {
    setTodolists(todolists.filter(tl => tl.id !=id))
    delete tasks[id]
    setTasks({...tasks})
}

    const addTask = (title: string, todolistId: string) => {
        let task = {id: v1(), isDone: false, title: title}
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = [task, ...todolistTasks]
        setTasks({...tasks})

    }
    const removeTask = (id: string, todolistId: string) => {
        let todolistTasks = tasks[todolistId];
        tasks[todolistId] = todolistTasks.filter( t=> t.id != id)
        setTasks({...tasks})
    }
    const changeStatus = (id: string, isDone: boolean, todolistId: string) => {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id ===id)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    const changeFilter = (value: FilterValueType, todolistId: string) => {
        let todolist = todolists.find(tl =>tl.id === todolistId)
        if(todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }
    let todolistId1 = v1()
    let todolistId2 = v1()
    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: 'all'},
        {id: todolistId2, title: "What to buy", filter: 'all'}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Pepsi', isDone: true},
            {id: v1(), title: 'Milk', isDone: false},
        ]
    })
    return (
        <div className="App">
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id]
                    let tasksForTodolist = allTodolistTasks
                    if (tl.filter === "active") {
                        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false)

                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true)

                    }
                    return <TodoList title={tl.title}
                                     id = {tl.id}
                                     tasks={tasksForTodolist}
                                     removeTask={removeTask}
                                     addTask={addTask}
                                     changeFilter={changeFilter}
                                     changeStatus={changeStatus}
                                     filter={tl.filter}
                                     key={tl.id}
                                     removeTodolist = {removeTodolist}/>

                })
            }
        </div>
    );
}

export default App;
