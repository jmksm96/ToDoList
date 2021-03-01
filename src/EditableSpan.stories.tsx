import {action} from '@storybook/addon-actions'
import React from "react";
import { EditableSpan } from "./EditableSpan";

export default {
    title: 'EditableSpan Component',
    component: EditableSpan
}

const changeCallback = action('ValueChanged');


export const EditableSpanBaseExample = (props: any) => {
    return <EditableSpan value={'Start Value'} onChange={changeCallback}/>
}