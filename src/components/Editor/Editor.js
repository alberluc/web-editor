import React from 'react'
import EditorPage from './Page/EditorPage'
import EditorTools from './Tools/EditorTools'

import './Editor.css'

function Editor(props) {
    return (
        <div className={"Editor"}>
            <EditorTools/>
            <EditorPage>
                {props.children}
            </EditorPage>
        </div>
    )
}

export default Editor