import React from "react";
import styled from "styled-components";

import Theme from "../theme";

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
`;

const CardText = styled.span`
    font-family: 'Roboto Condensed', sans-serif;
    font-size: 2rem;
    color: white;
`;

export function Card(props) {
    return (
        <BaseCard>
            <CardText>
                {props.text}
            </CardText>
        </BaseCard>
    )
}
