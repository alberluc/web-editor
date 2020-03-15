import React, { useEffect, useState, useRef } from 'react'
import EditorSelectionTools from '../SelectionTools/EditorSelectionTools'
import EditorBlockTools from '../BlockTools/EditorBlockTools'
import { useGlobalState } from '../../../hooks/useGlobalState'

import './EditorPage.css'

function EditorPage(props) {
    const [state, dispatch] = useGlobalState()
    const container = useRef(null)

    const [selectionTools, setSelectionTools] = useState(null)
    const [blockTools, setBlockTools] = useState(null)
    
    function findBlockSelection() {
        let targetElement = document.getSelection().anchorNode
        if (!targetElement || targetElement === container.current) return null
        const parents = []
        const parentsTags = []
        do {
            parentsTags.push(targetElement.tagName)
            parents.push(targetElement)
            targetElement = targetElement.parentElement
        } while (targetElement.parentElement && targetElement)

        if (parentsTags.indexOf('H1') !== -1) return parents[parentsTags.indexOf('H1')]
        if (parentsTags.indexOf('H3') !== -1) return parents[parentsTags.indexOf('H3')]
        if (parentsTags.indexOf('P') !== -1) return parents[parentsTags.indexOf('P')]
        if (parentsTags.indexOf('DIV') !== -1) return parents[parentsTags.indexOf('DIV')]
    }

    function onPaste(e) {
        e.preventDefault();
        const text = (e.originalEvent || e).clipboardData.getData('text/plain')
        document.execCommand("insertHTML", false, text);
    }

    function addBlockTools(container) {
        setBlockTools(<EditorBlockTools container={container}/>)
    }

    function addSelectionTools() {
        const range = window.getSelection().getRangeAt(0)
        const bounds = range.getBoundingClientRect()

        setSelectionTools(
            <EditorSelectionTools bounds={bounds}/>
        )
    }

    function onSelectionChange() {
        let blockEl = findBlockSelection()

        if (!blockEl || !state.isEditorFocus) {
            dispatch({ type: 'SET_ALIGNMENT', payload: 'justifyLeft' })
            dispatch({ type: 'SET_BLOCK', payload: null })
            dispatch({ type: 'SET_STYLES', payload: [] })
            return
        }

        if (!blockEl) return
        addBlockTools(blockEl)

        if (blockEl.tagName === 'DIV') {
            document.execCommand('formatBlock', false, `<p>`)
        }

        dispatch({
            type: 'SET_BLOCK',
            payload: blockEl.tagName.toLowerCase()
        })

        if (window.getSelection().isCollapsed) {
            setSelectionTools(null)
            return
        }
        addSelectionTools()
    }

    function onFocus(e) {
        dispatch({ type: 'IS_EDITOR_FOCUS', payload: true })
    }

    function onBlur() {
        dispatch({ type: 'IS_EDITOR_FOCUS', payload: false })
        setSelectionTools(null)
        setBlockTools(null)
    }

    function onKeyDown(e) {
        const isEmptyContent = container.current.innerText.trim().length === 0
        const containChildren = container.current.children.length > 1
        if (isEmptyContent && e.keyCode === 8 && !containChildren) {
            document.execCommand('insertHTML', false, `<${state.block}>a</${state.block}>`)
        }
        if (e.keyCode === 9) {
            document.execCommand('insertHTML', false, '&emsp;')
            e.preventDefault()
            e.stopPropagation()
        }
    }

    useEffect(() => {
        let isEmpty = !container.current.innerText.trim().length
        if (!state.isEditorFocus && isEmpty) {
            addPlaceholder()
        }

        document.addEventListener('selectionchange', onSelectionChange);
        if (state.isEditorFocus) onSelectionChange()
        return () => {
            document.removeEventListener('selectionchange', onSelectionChange);
        }
    }, [state.isEditorFocus])

    useEffect(() => {
        if (container.current) container.current.addEventListener("paste", onPaste)
        return () => {
            if (container.current) container.current.removeEventListener("paste", onPaste)
        }
    }, [container])

    function selectText(el) {
        const range = document.createRange()
        range.selectNode(el)
        window.getSelection().removeAllRanges()
        window.getSelection().addRange(range)
    }

    function addPlaceholder() {
        container.current.innerHTML = '<h1 id="placeholder" class="EditorPage-placeholder">Titre...</h1>'
    }

    function removePlaceholder(el) {
        el.removeAttribute('id')
        el.removeAttribute('class')
        selectText(el)
        document.execCommand('delete', false, null)
    }

    function onMouseDown(e) {
        const placeholder = document.getElementById('placeholder')
        if (placeholder) removePlaceholder(placeholder)
    }

    return (<>
        <div
            ref={container}
            className={'EditorPage'}
            contentEditable={true}
            autoCorrect={'off'}
            spellCheck={false}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            onMouseDown={onMouseDown}
        />
        {selectionTools}
        {blockTools}
    </>)
}

export default EditorPage