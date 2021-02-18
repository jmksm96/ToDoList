import {FilterValuesType, TodolistType} from "../App"
import {v1} from "uuid"

export type RemoveTodoListType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodoListType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

export type ActionsTypes =
    AddTodoListType | ChangeTodolistTitleActionType
    | RemoveTodoListType | ChangeTodolistFilterActionType

export let todolistId1 = v1();
export let todolistId2 = v1();

const initialState: Array<TodolistType>  = [
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"}
]

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionsTypes): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }

        case 'ADD-TODOLIST': {
            return [...state, {
                id: action.todolistId,
                title: action.title,
                filter: "active"
            }]
        }

        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.filter;
            }
            return [...state]
        }
        default:
            return state

    }

}

export const removeTodoListAC = (todolistId: string): RemoveTodoListType => {
    return {type: "REMOVE-TODOLIST", id: todolistId}
}

export const addTodolistAC = (title: string): AddTodoListType => {
    return {type: "ADD-TODOLIST", title, todolistId: v1()}
}

export const changeTodolistTitleAC = (title: string, todolistId: string): ChangeTodolistTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", id: todolistId, title: title}
}
export const changeTodolistFilterAC = (filter: FilterValuesType, id: string): ChangeTodolistFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", filter: filter, id: id}
}
