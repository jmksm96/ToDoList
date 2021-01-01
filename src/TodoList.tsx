import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from './App'


type PropsType = {
    title: string
    tasks: Array<TaskType>
    addTask: (title: string) => void
    removeTask: (taskID: string) => void
    changeFilter: (filterValue: FilterValuesType) => void
    filter: FilterValuesType
}

const ToDoList = (props: PropsType) => {
    let [title, setTitle] = useState("")

let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if(title.trim() !== "") {
            props.addTask(title)
            setTitle('')
        }
        else {
            setError('Введите название задачи');
        }
    }

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {setTitle(e.currentTarget.value)}

    const onKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode ===13) {
            addTask()
        }
        setError(null)
    }

    const onClickAll = () => {props.changeFilter("all") }
    const onClickActive = () => {props.changeFilter("active") }
    const onClickCompleted = () => {props.changeFilter("completed") }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}/>
                <button onClick={addTask}>+</button>
                {error && <div className="error-message"> {error}</div> }
            </div>
            <ul>
                {
                    props.tasks.map(task => {
                        return (
                            <li key = {task.id} className={task.isDone ? 'is-done': ""}>
                                <input type="checkbox" checked={task.isDone}/>
                                <span> {task.title}</span>
                                <button onClick={() => {props.removeTask(task.id)}}>Del</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button className = {props.filter === "all" ? "active-filter" : ""} onClick={onClickAll}>All</button>
                <button className={props.filter === "active" ? "active-filter" : ""} onClick={onClickActive}>Active</button>
                <button className={props.filter ===  "completed" ? "active-filter" : ""} onClick={onClickCompleted}>Completed</button>
            </div>
        </div>
    )
}

export default ToDoList;