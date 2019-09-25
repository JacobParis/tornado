import React from "react";
import styled from "styled-components";

import Theme from "../theme";

export const InputBase = styled.input.attrs({
    type: "text"
})`
    font-family: Roboto, sans-serif;
    font-weight: 300;
    color: ${({disabled}) => disabled 
        ? Theme.Shades.Lighter
        : Theme.Shades.Dark
    };
    font-size: 1rem;
    padding: 0.8rem 1rem;
    width: 100%;
    min-height: 3rem;
    box-sizing: border-box;
    border-radius: ${Theme.Layout.Corners};
    border: 1px solid ${({disabled, borderColor}) => disabled
        ? Theme.Shades.Lightest
        : borderColor
    };
    background: ${({disabled}) => disabled 
        ? Theme.Shades.White
        : Theme.Shades.White
    };
    outline: none;
    transition: all 0.3s ease-out;
    &::placeholder {
        user-select: none;
        color: ${({disabled, labelColor}) => disabled
            ? Theme.Shades.Lighter
            : Theme.Shades.Light
        };
    } 
    &:hover:not(:focus) {
        border: 1px solid ${({disabled}) => disabled
            ? Theme.Shades.Lightest
            : Theme.Shades.Medium
        };
    }
    &:focus {
        background: white;
        border: 1px solid ${Theme.Colors.Blue};
    }
    & + span {
        color: ${({labelColor}) => labelColor};
    }
`;

const Label = styled.span`
    position: absolute;
    color: ${Theme.Shades.Medium};
    font-family: 'Roboto';
    font-weight: normal;
    transition: all 0.3s ease-out;
    min-width: 16rem;
    text-align: left;
`;

const InputContainer = styled.label`
    position: relative;
    display: block;
    margin: 2rem 1rem 1rem 1rem;
    vertical-align: top;
    flex: 1 0 auto;
    ${({isRequired}) => isRequired && `&::after {
        content: '*';
        position: absolute;
        right: 0.25rem;
        top: 0.25rem;
        line-height: 1rem;
        font-size: 1.2rem;
        color: ${Theme.Shades.Medium};
    }`}
    ${InputBase}[placeholder]:not([placeholder=""]):placeholder-shown + ${Label} {
        left: 0;
        top: 0;
        padding: 0.8rem 1rem;
        font-size: 1rem;
        opacity: 0;
        pointer-events: none;
    }
    & ${InputBase} + ${Label} {
        left: 0;
        top: -1.5rem;
        padding: 0;
        font-size: 0.87rem;
    }
`;

export function TextInput({children, multiline, value, ...props}) {
    const borderColor = getDefaultBorderColorFromProps(props);
    const labelColor = getLabelColorFromProps(props);
    const placeholder = getPlaceholderFromProps(props);
    const isRequired = "required" in props;

    return (
        <InputContainer isRequired={isRequired}>
            <InputBase
                {...props} 
                value={value}
                as={multiline && "textarea"}
                labelColor={labelColor}
                borderColor={borderColor}
                placeholder={placeholder}
            />
            <Label>{props.label}</Label>
        </InputContainer>
    );
}


function getPlaceholderFromProps(props) {
    if ("placeholder" in props) {
        if (props.placeholder && props.placeholder.length) {
            return props.placeholder;
        }
        return props.label;
    }

    return null;
}

function getDefaultBorderColorFromProps(props) {
    if (props.success) return Theme.Colors.Green;
    if (props.warning) return Theme.Colors.Orange;
    if (props.error) return Theme.Colors.Red;

    return Theme.Shades.Lighter;
}

function getLabelColorFromProps(props) {
    if (props.success) return Theme.Colors.Green;
    if (props.warning) return Theme.Colors.Orange;
    if (props.error) return Theme.Colors.Red;

    return Theme.Shades.Dark;
}
