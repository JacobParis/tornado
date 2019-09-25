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
    &:checked + ${TabLabel} {
        color: ${Theme.Colors.Primary}
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
