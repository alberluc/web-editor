import React from 'react'
import ReactDOM from 'react-dom'

import './EditorSelectionTools.css'

function EditorSelectionTools(props) {
    const x = Math.round(props.bounds.x + props.bounds.width / 2)
    const y = Math.round(window.scrollY  + props.bounds.y + props.bounds.height)
    const transform = `translate(calc(${x}px - 50%), calc(${y}px + 10px))`

    return null

    return ReactDOM.createPortal(
        <ul contentEditable={false} style={{ transform }} className={'EditorSelectionTools'}>
            <li className={'EditorSelectionTools-item'}/>
            <li className={'EditorSelectionTools-item'}/>
            <li className={'EditorSelectionTools-item'}/>
        </ul>,
        document.body
    )
}

export default EditorSelectionTools