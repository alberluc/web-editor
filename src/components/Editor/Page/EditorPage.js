import React, { useEffect, useState, useRef } from 'react'
import { useApolloClient, useQuery } from '@apollo/react-hooks'
import './EditorPage.css'
import { saveState } from '../../../index'
import gql from 'graphql-tag'
import {
    findBlockSelection
} from './../helpers'
import EditorSelectionTools from '../SelectionTools/EditorSelectionTools'
import EditorBlockTools from '../BlockTools/EditorBlockTools'

const GET_EDITOR_INFO = gql`
    {
        selectedText @client
        currentAlign @client
        currentBlock @client
        selectedStyle @client
    }
`

function EditorPage(props) {
    //const placeholder = usePlaceholder()
    const defaultPlaceholder = (
        <h1
            className={"EditorPage-placeholder"}
            onMouseDown={e => {
                e.stopPropagation()
                e.preventDefault()
                container.current.focus()
            }}
        >
            <span>Titre</span>
        </h1>
    )

    const client = useApolloClient()
    const container = useRef(null)

    const { data: {
        currentAlign
    } = {}} = useQuery(GET_EDITOR_INFO)

    const [isFocus, setIsFocus] = useState(false)
    const [placeholder, setPlaceholder] = useState(props.children ? null : defaultPlaceholder)
    const [currentBlock, setCurrentBlock] = useState('')
    const [selectionTools, setSelectionTools] = useState(null)
    const [blockTools, setBlockTools] = useState(null)

    function onPaste(e) {
        e.preventDefault();
        const text = (e.originalEvent || e).clipboardData.getData('text/plain')
        document.execCommand("insertHTML", false, text);
    }

    function addBlockTools(container) {
        switch (container.tagName) {
            case 'P': {
                setBlockTools(
                    <EditorBlockTools
                        title={"Paragraphe"}
                        container={container}
                    />
                )
                break
            }
            case 'H1':
            case 'H3': {
                setBlockTools(
                    <EditorBlockTools
                        title={"Titre"}
                        container={container}
                    />
                )
                break
            }
            default: break
        }
    }

    function addSelectionTools() {
        const range = window.getSelection().getRangeAt(0)
        const bounds = range.getBoundingClientRect()

        setSelectionTools(
            <EditorSelectionTools bounds={bounds}/>
        )
    }

    function onSelectionChange() {
        saveState(client,{ data: { selectedText: Math.random() } })

        const blockElement = findBlockSelection()
        if (!blockElement || !isFocus) {
            saveState(client,{
                data: {
                    currentAlign: '',
                    currentBlock: '',
                    selectedStyle: []
                }
            })
            return
        }
        if (placeholder) {
            document.execCommand('formatBlock', false, `<${blockElement.tagName.toLowerCase()}>`)
        }
        setCurrentBlock(blockElement)

        if (!blockElement) return
        addBlockTools(blockElement)

        if (window.getSelection().isCollapsed) {
            setSelectionTools(null)
            return
        }
        addSelectionTools()
    }

    function onFocus(e) {
        saveState(client,{ data: { isEditorFocus: true }})
        setIsFocus(true)
    }

    function onBlur() {
        saveState(client,{ data: { isEditorFocus: false }})
        setIsFocus(false)
        setSelectionTools(null)
        setBlockTools(null)

        const isEmptyContent = container.current.innerText.trim().length === 0
        if (isEmptyContent) {
            container.current.innerHTML = ''
            setPlaceholder(defaultPlaceholder)
        }
    }

    function onKeyDown(e) {
        const isEmptyContent = container.current.innerText.trim().length === 0
        if (isEmptyContent && e.keyCode === 8) {
            document.execCommand('insertHTML', false, `<${currentBlock.tagName.toLowerCase()}>a</${currentBlock.tagName.toLowerCase()}>`)
        }
        if (e.keyCode === 9) {
            document.execCommand('insertHTML', false, '&emsp;')
            e.preventDefault()
            e.stopPropagation()
        }
    }

    useEffect(() => {
        if (currentBlock.tagName) {
            saveState(client,{ data: { currentBlock: currentBlock.tagName.toLowerCase() }})
        }
    }, [currentBlock])

    useEffect(() => {
        saveState(client,{ data: { currentAlign } })
    }, [currentAlign])

    useEffect(() => {
        document.addEventListener('selectionchange', onSelectionChange);
        if (isFocus) onSelectionChange()
        return () => {
            document.removeEventListener('selectionchange', onSelectionChange);
        }
    }, [isFocus])

    useEffect(() => {
        if (container.current) container.current.addEventListener("paste", onPaste)
        return () => {
            if (container.current) container.current.removeEventListener("paste", onPaste)
        }
    }, [container])

    return (<>
        <div
            ref={container}
            className={"EditorPage"}
            contentEditable={true}
            suppressContentEditableWarning={true}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
        >{props.children ? props.children : placeholder}</div>
        {selectionTools}
        {blockTools}
    </>)
}

export default EditorPage