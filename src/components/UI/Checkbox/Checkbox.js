import React from 'react'
import styled from 'styled-components'

function Checkbox({ selected, children, ...props }) {
    const id = Math.random()
    return (
        <div {...props}>
            <input type="checkbox" id={id} className={"Checkbox-input"} checked={selected} onChange={() => {}}/>
            <label className={"Checkbox-label"} htmlFor={id}>
                {children}
            </label>
        </div>
    )
}

export default styled(Checkbox)`
    .Checkbox-input{
        display: none;
        &:checked + .Checkbox-label{
            color: green;
            background: #c0ffc7;
        }
    }
    .Checkbox-label{
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        width: 100%;
        height: 100%;
        border: none;
        border-radius: 3px;
        background: var(--light-grey);
        font-size: 18px;
        cursor: pointer;
        transition: box-shadow var(--animation-duration), background-color var(--animation-duration), color var(--animation-duration);
        
        &:hover{
            box-shadow: 2px 2px 3px #ededed;
        }
    }
`