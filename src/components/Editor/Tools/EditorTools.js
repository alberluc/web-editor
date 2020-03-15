import React, { useEffect, useState } from 'react'
import './EditorTools.css'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faAlignCenter,
    faAlignJustify,
    faAlignLeft,
    faAlignRight,
    faBold,
    faHeading,
    faItalic
} from '@fortawesome/free-solid-svg-icons'
import EditorToolsItem from './../ToolsItem/EditorToolsItem'
import Button from '../../UI/Button/Button'

function EditorTools(props) {
    const [_, forceUpdate] = useState(null)
    return (
        <div className={"EditorTools"}>
            <EditorToolsItem
                title="Gras"
                commandArgs={['bold']}
            >
                <FontAwesomeIcon icon={faBold}/>
            </EditorToolsItem>
            <EditorToolsItem
                title="Italique"
                commandArgs={['italic']}
            >
                <FontAwesomeIcon icon={faItalic}/>
            </EditorToolsItem>
            <div className={'EditorTools-separator'}/>
            <EditorToolsItem
                title="Aligner à gauche"
                commandArgs={['justifyLeft']}
            >
                <FontAwesomeIcon icon={faAlignLeft}/>
            </EditorToolsItem>
            <EditorToolsItem
                title="Justifier"
                commandArgs={['justifyFull']}
            >
                <FontAwesomeIcon icon={faAlignJustify}/>
            </EditorToolsItem>
            <EditorToolsItem
                title="Centrer"
                commandArgs={['justifyCenter']}
            >
                <FontAwesomeIcon icon={faAlignCenter}/>
            </EditorToolsItem>
            <EditorToolsItem
                title="Aligner à droite"
                commandArgs={['justifyRight']}
            >
                <FontAwesomeIcon icon={faAlignRight}/>
            </EditorToolsItem>
            <div className={'EditorTools-separator'}/>
            <EditorToolsItem
                title="Titre 1"
                className={"EditorTools-title1"}
                commandArgs={['formatBlock', false, '<h1>']}
            >
                <FontAwesomeIcon icon={faHeading}/>
                <span>1</span>
            </EditorToolsItem>
            <EditorToolsItem
                title="Titre 3"
                className={"EditorTools-title3"}
                commandArgs={['formatBlock', false, '<h3>']}
            >
                <FontAwesomeIcon icon={faHeading}/>
                <span>3</span>
            </EditorToolsItem>
            <Button className={"EditorTools-Save"}>Enregistrer</Button>
        </div>
    )
}

export default EditorTools