import React from "react";
import styled from "styled-components";

import Theme, { shadeColor } from "../theme";

const BaseCard = styled.button`
    position: relative;
    background: ${Theme.Colors.Primary};
    height: ${Theme.Layout.Grid};
    flex: 0 0 ${Theme.Layout.Grid};
    margin: 1rem;
    outline: none;
    border-radius: ${Theme.Layout.Corners};
    border: 1px solid ${Theme.Colors.Primary};
    cursor: pointer;
    &:focus {
        border: 1px solid ${Theme.Shades.Lightest}99;
    }
    &:hover {
        background: ${shadeColor(Theme.Colors.Primary, 15)}
    }
    &:active {
        background: ${shadeColor(Theme.Colors.Primary, -15)}
    }
    &:before {
        font-family: Roboto, sans-serif;
        content: attr(data-annotation);
        text-transform: uppercase;
        position: absolute;
            top: -1rem;
            left: 0;
            right: 0;
        color: white;
        opacity: 0.8;
    }
`;

const CardText = styled.span`
    font-family: 'Roboto Condensed', sans-serif;
    font-size: ${getFontSizeFromProps};
    color: white;
`;

function getFontSizeFromProps(props) {
    if (!props || !props.text) {
        return "1rem";
    }

    if (props.text.length < 10) {
        return "2.25rem";
    }

    if (props.text.length < 35) {
        return "1.75rem";
    }

    return "1.25rem";

}

export function Card({children, annotation, ...props}) {
    return (
        <BaseCard data-annotation={annotation} {...props}>
            <CardText text={props.text}>
                {props.text}
            </CardText>
        </BaseCard>
    )
}

const BaseCardButton = styled.button`
    position: relative;
    background: none;
    height: ${Theme.Layout.Grid};
    flex: 0 0 ${Theme.Layout.Grid};
    border-radius: ${Theme.Layout.Corners};
    margin: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    font-weight: 300;
    border: 1px solid ${Theme.Colors.Primary};
    cursor: pointer;
    outline: none;
    &:focus {
        border: 1px solid ${Theme.Shades.Lightest}99;
    }
    &:hover {
        background: ${Theme.Colors.Primary}66;
    }
    &:active {
        background: ${Theme.Colors.Primary}33;
    }
`;

export function CardButton({children, ...props}) {
    return (
        <BaseCardButton {...props}>
            <CardText text={children}>
                {children}
            </CardText>
        </BaseCardButton>
    )
}
