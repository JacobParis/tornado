import React from "react";
import styled from "styled-components";

import Theme, {
    shadeColor,
    getColorFromProps,
    getTextColorFromProps,
    getBorderColorFromProps
} from "../theme";

const BaseDialog = styled.div`
    background: white;
    position: fixed;
        top: 50%;
        left: 50%;
    transform: translate(-50%, -50%);
    margin: auto;
    padding-top: 1rem;
    width: 100%;
    max-width: 20rem;
    max-height: 100%;
    border-radius: ${Theme.Layout.Corners};
`;

const Overlay = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: black;
    opacity: 0.4;
`;

export const Actions = styled.div`
    display: flex;
    border-radius: 0 0 ${Theme.Layout.Corners} ${Theme.Layout.Corners};
    overflow: hidden;
    
`;

export const ActionButton = styled.button`
    border: none;
    border-top: 1px solid ${getBorderColorFromProps};
    font-size: 1rem;
    padding: 1.25rem;
    flex-grow: 1;
    outline: none;
    cursor: pointer;
    color: ${getTextColorFromProps};
    transition: all 0.3s ease-out;
    &:not(:last-child) {
        border-right: 1px solid ${getBorderColorFromProps};
    }
    background: ${getColorFromProps};
    &:hover {
        background: ${(props) => shadeColor(getColorFromProps(props), 5)};
    }
    &:active {
        background: ${(props) => shadeColor(getColorFromProps(props), -15)};
    }
`;


export function Dialog({children, onClose}) {

    return (
        <div>
            <Overlay onClick={onClose} />
            <BaseDialog>
                {children}
                
            </BaseDialog>

        </div>
    )
}