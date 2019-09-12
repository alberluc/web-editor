import React, { useEffect, useState, useRef } from 'react'
import ReactDOM from 'react-dom'
import './EditorBlockTools.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'

function EditorBlockTools(props) {
    const [transform, setTransform] = useState('')
    const el = useRef(null)

    function selectText(el) {
        const range = document.createRange()
        range.selectNode(el)
        window.getSelection().removeAllRanges()
        window.getSelection().addRange(range)
    }

    useEffect(() => {
        const containerBounds = props.container.getBoundingClientRect()
        const elementBounds = el.current.getBoundingClientRect()
        const x = Math.round(containerBounds.x - elementBounds.width - 30)
        const y = Math.round(window.scrollY  + containerBounds.y)
        setTransform(`translate(calc(${x}px), calc(${y}px))`)
    }, [el, props.container])

    return ReactDOM.createPortal(
        <div
            ref={el}
            className={"EditorBlockTools"}
            style={{ transform }}
            onMouseDown={event => event.preventDefault()}
        >
            <span className={"EditorBlockTools-tools"}>
                <FontAwesomeIcon icon={faEllipsisV}/>
            </span>
            <span
                className={"EditorBlockTools-title"}
                onClick={e => {
                    if (props.container) selectText(props.container)
                }}
            >{props.title}</span>
        </div>,
        document.body
    )
}

export default EditorBlockTools