import ReactDOM from 'react-dom'
import EditorBlockTools from './BlockTools/EditorBlockTools'
import React from 'react'
import EditorSelectionTools from './SelectionTools/EditorSelectionTools'
import { client } from '../../client'
import { ApolloProvider } from '@apollo/react-hooks'


export function findBlockSelection() {
    let targetElement = document.getSelection().anchorNode
    if (!targetElement) return null
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
}

export function containBlockTools(el) {
    return !!el.querySelector('.EditorBlockTools')
}

export function addBlockTools(el) {
    return
    const helper = document.createElement('div')
    helper.setAttribute('contentEditable', 'false')
    const titleTagNames = ['H1', 'H3']
    const paragraphTagNames = ['P']
    if (titleTagNames.indexOf(el.tagName) !== -1) {
        ReactDOM.render(
            <EditorBlockTools
                title={`Titre ${el.tagName.replace('H', '')}`}
                container={el}
            />,
            helper
        )
    }
    if (paragraphTagNames.indexOf(el.tagName) !== -1) {
        ReactDOM.render(
            <EditorBlockTools
                title={'Paragraphe'}
                container={el}
            />,
            helper
        )
    }
    el.appendChild(helper)

    helper.classList.add('EditorBlockTools-container')
    helper.parentElement.classList.add('EditorBlockTools-parentContainer')

    return helper
}

export function removeBlockTools() {
    return
    const helpers = document.querySelectorAll('.EditorBlockTools-container')
    helpers.forEach(helper => {
        helper.parentElement.removeAttribute('class')
        helper.parentElement.removeChild(helper)
    })
}

export function addSelectionTools(bounds) {
    return
    const selectionTools = document.createElement('div')
    selectionTools.classList.add('EditorSelectionTools-container')
    const x = Math.round(bounds.x + bounds.width / 2)
    const y = Math.round(window.scrollY  + bounds.y + bounds.height)
    selectionTools.style.transform = `translate(calc(${x}px - 50%), calc(${y}px + 10px))`
    ReactDOM.render(
        <EditorSelectionTools/>,
        selectionTools
    )
    document.body.appendChild(selectionTools)
}

export function removeSelectionTools() {
    return
    const selectionTools = document.querySelectorAll('.EditorSelectionTools-container')
    selectionTools.forEach(selectionTools=> {
        selectionTools.removeAttribute('class')
        selectionTools.parentElement.removeChild(selectionTools)
    })
}