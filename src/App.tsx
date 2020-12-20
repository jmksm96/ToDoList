import React, {useState} from 'react';
import './App.css';
import ToDoList from './TodoList';

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'AAA', isDone: true},
        {id: 2, title: 'BBB', isDone: true},
        {id: 3, title: 'CCC', isDone: false},
        {id: 4, title: 'DDD', isDone: true},
        {id: 5, title: 'EEE', isDone: false}
    ])

    const [filter, setFilter] = useState<FilterValuesType>("all")

    const removeTask = (tasksID: number) => {
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
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;

