import React from "react";
import {FilterValuesType, TaskType} from './App'

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: number) => void
    changeFilter: (filterValue: FilterValuesType) => void
}

const ToDoList = (props: PropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
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
                <button onClick={() => {props.changeFilter("all")}}>All</button>
                <button onClick={() => {props.changeFilter("active")}}>Active</button>
                <button onClick={() => {props.changeFilter("completed")}}>Completed</button>
            </div>
        </div>
    )
}

export default ToDoList;