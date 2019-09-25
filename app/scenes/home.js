import React from "react";

import { Page, Cards } from "../components/Layout";
import { H1, HighlightText } from "../components/Text";
import { Card, CardButton } from "../components/Card";


export default function () {

    return (
        <Page>
            <H1> 🌪️️ To<HighlightText>rna</HighlightText>do 🌪️</H1>
            
            <Cards>
                <Card text="Task" />
                <Card text="Task" />
                <Card text="Task" />
                <CardButton>New Task</CardButton>
            </Cards>
        </Page>
    );
}