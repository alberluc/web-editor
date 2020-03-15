import React, { useState, useEffect } from 'react'
import { useGlobalState } from '../../../hooks/useGlobalState'

import './EditorToolsItem.css'
import Button from '../../UI/Button/Button'
import Checkbox from '../../UI/Checkbox/Checkbox'

function EditorToolsItem(props) {
    const [state, dispatch] = useGlobalState()

    const [_, forceUpdate] = useState({})

    const commandName = props.commandArgs[0]
    const commandArg = props.commandArgs[2]
    const classList = ["EditorTools-item", props.className]

    const isAlignCommand = ['justifyFull', 'justifyLeft', 'justifyRight'].indexOf(commandName) !== -1
    const isCurrentBlockCommand = commandName === 'formatBlock' && commandArg === `<${state.block}>`
    const isEnableCommand = document.queryCommandState(commandName)
    const isSelected = isCurrentBlockCommand || isEnableCommand

    function onClick() {
        console.log('exec ', props.commandArgs)
        document.execCommand(...props.commandArgs)
        if (commandName === 'formatBlock') {
            console.log(isSelected)
            if (isSelected) {
                dispatch({ type: 'SET_BLOCK', payload: 'p' })
                document.execCommand('formatBlock', false, '<p>')
            } else {
                dispatch({ type: 'SET_BLOCK', payload: commandName })
            }
        }
        if (isAlignCommand) {
            dispatch({ type: 'SET_ALIGNMENT', payload: commandName })
        }
        forceUpdate({})
    }

    return (
        <Checkbox
            selected={isSelected && state.isEditorFocus}
            title={props.title}
            className={classList.join(' ')}
            onChange={onClick}
            onMouseDown={event => event.preventDefault()}
        >
            {props.children}
        </Checkbox>
    )
}

export default EditorToolsItem