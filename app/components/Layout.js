import React from "react";
import styled from "styled-components";

import Theme from "../theme";

export const Page = styled.div`
    margin: 1rem auto;
    padding: 1rem 0;
    max-width: 800px;
    background: white;
    border-radius: ${Theme.Layout.Corners};
    text-align: center;  
`;