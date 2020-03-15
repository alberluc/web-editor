import React from 'react'
import styled from 'styled-components'

function Button({ children, ...props }) {
    return <button {...props}>{children}</button>
}

export default styled(Button)`
    cursor: pointer;
    border: none;
    padding: 4px 10px;
    font-size: 12px;
    border-radius: 3px;
    background: none;
    color: var(--dark-grey);
    border: solid 1px var(--dark-grey);
    transition: color var(--animation-duration), background var(--animation-duration), border var(--animation-duration);
    &:hover{
        color: green;
        background: #c0ffc7;
        border: solid 1px green;
    }
`