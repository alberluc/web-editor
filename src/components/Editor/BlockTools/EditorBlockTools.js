import React, { useEffect, useState, useRef, useMemo } from 'react'
import ReactDOM from 'react-dom'
import './EditorBlockTools.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'

function EditorBlockTools(props) {
    const [transform, setTransform] = useState('')
    const el = useRef(null)

    const title = useMemo(() => {
        switch (props.container.tagName) {
            case 'P': return 'Paragraphe'
            case 'H1': return 'Titre 1'
            case 'H3': return 'Titre 3'
            default: return null
        }
    }, [props.container])

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
    }, [props.container])

    return ReactDOM.createPortal(
        <div
            ref={el}
            className={"EditorBlockTools"}
            style={{
                transform,
                minHeight: `${props.container.clientHeight}px`
            }}
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
            >
                {title}
            </span>
        </div>,
        document.body
    )
}

export default EditorBlockTools