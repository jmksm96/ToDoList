import {FilterValuesType, TodolistType} from "../App"
import {v1} from "uuid"

export type RemoveTodoListType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodoListType = {
    type: 'ADD-TODOLIST'
    title: string
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

export type ActionsTypes = AddTodoListType | ChangeTodolistTitleActionType | RemoveTodoListType |ChangeTodolistFilterActionType


export const todolistsReducer = (state: Array<TodolistType>, action: ActionsTypes) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id != action.id)
        }

        case 'ADD-TODOLIST': {
            return [...state, {
                id: v1(),
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
            throw new Error("I don't understand this type")

    }

}

export const RemoveTodoListAC = (todolistId: string): RemoveTodoListType => {
    return {type: "REMOVE-TODOLIST", id: todolistId}
}

export const AddTodoListAC = (title: string): AddTodoListType => {
    return {type: "ADD-TODOLIST", title: title}
}

export const ChangeTodolistTitleAC = (title: string, id: string): ChangeTodolistTitleActionType  => {
    return {type: "CHANGE-TODOLIST-TITLE", id:id, title: title }
}
export const ChangeTodolistFilterAC = (filter: FilterValuesType, id: string): ChangeTodolistFilterActionType  => {
    return {type: "CHANGE-TODOLIST-FILTER", filter: filter, id: id}
}
