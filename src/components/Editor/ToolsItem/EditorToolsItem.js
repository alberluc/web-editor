import { useApolloClient, useQuery } from '@apollo/react-hooks'
import React, { useState, useEffect } from 'react'
import './EditorToolsItem.css'
import gql from 'graphql-tag'

const GET_EDITOR_INFO = gql`
    {
        isEditorFocus @client
        selectedText @client
        currentAlign @client
        currentBlock @client
        selectedStyle @client
    }
`

function EditorToolsItem(props) {
    const { data: {
        selectedStyle = [],
        currentBlock,
        currentAlign,
        selectedText,
        isEditorFocus
    } = {} } = useQuery(GET_EDITOR_INFO)

    const [_, forceUpdate] = useState({})
    const client = useApolloClient()

    const commandName = props.commandArgs[0]
    const commandArg = props.commandArgs[2]
    const classList = ["EditorTools-item", props.className]

    const isAlignCommand = ['justifyFull', 'justifyLeft', 'justifyRight'].indexOf(commandName) !== -1
    const isCurrentBlockCommand = commandName === 'formatBlock' && commandArg === `<${currentBlock}>`
    const isEnableCommand = document.queryCommandState(commandName)
    const isSelected = isCurrentBlockCommand || isEnableCommand

    if (isSelected && isEditorFocus) {
        classList.push('EditorTools-item-selected')
    }

    function onClick() {
        document.execCommand(...props.commandArgs)
        if (commandName === 'formatBlock') {
            if (isSelected) {
                client.writeData( { data: { currentBlock: 'p' } })
                document.execCommand('formatBlock', false, '<p>')
            } else {
                client.writeData( { data: { currentBlock: commandName } })
            }
        }
        if (isAlignCommand) {
            client.writeData( { data: { currentAlign: commandName } })
        }
        forceUpdate({})
    }

    return (
        <button
            title={props.title}
            className={classList.join(' ')}
            onClick={onClick}
            onMouseDown={event => event.preventDefault()}
        >
            {props.children}
        </button>
    )
}

export default EditorToolsItem