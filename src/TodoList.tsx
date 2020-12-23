import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from './App'

type PropsType = {
    title: string
    tasks: Array<TaskType>
    addTask: (title: string) => void
    removeTask: (taskID: string) => void
    changeFilter: (filterValue: FilterValuesType) => void
}

const ToDoList = (props: PropsType) => {
    let [title, setTitle] = useState("")

    const addTask = () => {
        props.addTask(title)
        setTitle('')
    }

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {setTitle(e.currentTarget.value)}

    const onKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode ===13) {
            addTask()
        }
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
            </div>
            <ul>
                {
                    props.tasks.map(task => {
                        return (
                            <li>
                                <input type="checkbox" checked={task.isDone}/>
                                <span> {task.title}</span>
                                <button onClick={() => {props.removeTask(task.id)}}>Del</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button onClick={onClickAll}>All</button>
                <button onClick={onClickActive}>Active</button>
                <button onClick={onClickCompleted}>Completed</button>
            </div>
        </div>
    )
}

export default ToDoList;