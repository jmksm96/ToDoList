import {FilterValuesType, TodolistType, TasksStateType} from "../App"
import {v1} from "uuid"
import {AddTodoListType, RemoveTodoListType} from "./todolists-reducer";

export type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    todolistId: string
    taskId: string
}
export type AddTaskActionType = {
    type: "ADD-TASK"
    title: string
    todolistId: string
}
export type ChangeTaskStatusType = {
    type: "CHANGE-TASK-STATUS"
    taskId: string
    todolistId: string
    isDone: boolean
}
export type ChangeTaskTitleAction = {
    type: "CHANGE-TASK-TITLE"
    taskId: string
    todolistId: string
    title: string
}

export type ActionsTypes = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusType | ChangeTaskTitleAction | AddTodoListType
    | RemoveTodoListType


export const tasksReducer = (state: TasksStateType, action: ActionsTypes): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const stateCopy = {...state}
            const tasks = state[action.todolistId]
            const filteredTasks = tasks.filter(t => t.id != action.taskId)
            stateCopy[action.todolistId] = filteredTasks
            return stateCopy
        }
        case "ADD-TASK": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            const newTask = {id: v1(), title: action.title, isDone: false};
            const newTasks = [newTask, ...tasks]
            stateCopy[action.todolistId] = newTasks
            return stateCopy;
        }
        case "CHANGE-TASK-STATUS": {
            const stateCopy = {...state}
            let tasks = stateCopy[action.todolistId]
            let task = tasks.find(t => t.id === action.taskId)
            if (task) {
                task.isDone = action.isDone
            }
            return stateCopy;
        }
        case "CHANGE-TASK-TITLE": {
            const stateCopy = {...state}
            let tasks = stateCopy[action.todolistId]
            let task = tasks.find(t => t.id === action.taskId)
            if (task) {
                task.title = action.title
            }
            return stateCopy;
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state}

            stateCopy[action.todolistId] = []

            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            throw new Error("I don't understand this type")
    }

}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: "REMOVE-TASK", todolistId, taskId}
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: "ADD-TASK", title, todolistId}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusType => {
    return {type: "CHANGE-TASK-STATUS", taskId, isDone, todolistId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleAction => {
    return {type: "CHANGE-TASK-TITLE", taskId, title, todolistId}
}

