import React, {useState} from 'react';
import './App.css';
import ToDoList from './TodoList';
import { v1 } from 'uuid';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'AAA', isDone: true},
        {id: v1(), title: 'BBB', isDone: true},
        {id: v1(), title: 'CCC', isDone: false},
        {id: v1(), title: 'DDD', isDone: true},
        {id: v1(), title: 'EEE', isDone: false}
    ])

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks([newTask, ...tasks])
    }

    const [filter, setFilter] = useState<FilterValuesType>("all")

    const removeTask = (tasksID: string) => {
        const newTasks = tasks.filter(task => task.id !== tasksID)
        setTasks(newTasks)
    }

    const changeFilter = (filterValue: FilterValuesType) => {
        setFilter(filterValue)
    }
    let tasksForTodoList = tasks

    if (filter === 'active') {
        tasksForTodoList = tasks.filter(t => t.isDone === false);
    }
    if (filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone === true);
    }


    return (
        <div className="App">
            <ToDoList title={'TaskList №1'}
                      tasks={tasksForTodoList}
                      addTask={addTask}
                      removeTask={removeTask}
                      changeFilter={changeFilter}

            />
        </div>
    );
}

export default App;

