import React from 'react';
import './App.css';
import { fakeContent } from './components/Editor';
import Editor from './components/Editor/Editor';
import { Provider } from './hooks/useGlobalState';

function reducer(state, action) {
    switch (action.type) {
        case 'SET_BLOCK': return { ...state, block: action.payload }
        case 'SET_ALIGNMENT': return { ...state, alignment: action.payload }
        case 'IS_EDITOR_FOCUS': return { ...state, isEditorFocus: action.payload }
        default: return state
    }
}

const initialState = {
    isEditorFocus: false,
    selectionId: null,
    block: null,
    alignment: null,
    styles: []
}

function App() {
    return (
        <Provider reducer={reducer} initialState={initialState}>
            <div id="App" className="App">
                <Editor>{fakeContent}</Editor>
            </div>
        </Provider>
    )
}

export default App
