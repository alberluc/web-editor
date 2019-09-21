import React from 'react'
import styled from 'styled-components'

function Button({ children, ...props }) {
    return <button {...props}>{children}</button>
}

export default styled(Button)`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    border: none;
    border-radius: 3px;
    background: var(--light-grey);
    font-size: 18px;
    cursor: pointer;
    transition: box-shadow var(--animation-duration), background-color var(--animation-duration);
`