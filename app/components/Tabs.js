import React from "react";
import styled from "styled-components";

import Theme from "../theme";

export const Tabs = styled.div.attrs({
    role: "radiogroup"
})`
    padding: 0.5rem 0;
    max-width: 800px;
    background: white;
    border-radius: ${Theme.Layout.Corners};
    text-align: center;
    display: inline-block;
    margin: 0.5rem 0;
    border: 1px solid ${Theme.Colors.Primary}33;
    &:focus-within {
        border: 1px solid ${Theme.Colors.Primary};
    }
`;

const TabLabel = styled.span`
    position: relative;
    font-family: Roboto, sans-serif;
    font-size: 1rem;
    text-transform: uppercase;
    padding: 0.5rem 2rem;
    overflow: hidden;
    transition: all 0.2s;
    &:hover {
        background: ${Theme.Colors.Primary}33;
        color: ${Theme.Colors.Primary};
    }
`;

const BaseTab = styled.input.attrs({
    type: "radio"
})`
    position: absolute;
    opacity: 0;
    cursor: pointer;
    + ${TabLabel}:before {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        left: 0;
        right: 0;
        bottom: -0.75rem;
        margin: auto;
        border-left: 1rem solid transparent;
        border-right: 1rem solid transparent;
        border-bottom: 1rem solid ${Theme.Shades.Darkest};
        transition: all 0.2s ease-out;
        transform: translateY(100%);
        opacity: 0;
    }
    &:checked + ${TabLabel}:before {
        transform: translateY(0);
        opacity: 1;
    }
`;


export function Tab({children, group, ...props}) {
    return (
        <label>
            <BaseTab name={group} {...props} />
            <TabLabel>{children}</TabLabel>
        </label>
    )
}
