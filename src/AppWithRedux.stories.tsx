// import React from "react";
// import AppWithRedux from './AppWithRedux';
// import { ReduxStoreProviderDecorator } from './stories/ReduxStoreProviderDecorator';
//
// export default {
//     title: 'AppWithRedux Component',
//     component: AppWithRedux,
//     decorators: ReduxStoreProviderDecorator
// }
//
//
//
// export const AppWithReduxBaseExample = (props: any) => {
//     return <AppWithRedux/>
// }

import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers, createStore} from 'redux'
import {tasksReducer} from './state/tasks-reducer'
import {todolistsReducer} from './state/todolists-reducer'
import {v1} from 'uuid'
import {AppRootState} from './state/store'
import AppWithRedux from './AppWithRedux'

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all"},
        {id: "todolistId2", title: "What to buy", filter: "all"}
    ],
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootState);

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider store={storyBookStore}>{storyFn()} </Provider>)

export const AppWithReduxBaseExample = (props: any) => {
    return <AppWithRedux/>
}