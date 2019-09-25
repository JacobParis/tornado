import React from "react";

import { Page, Container } from "../components/Layout";
import { H1, HighlightText } from "../components/Text";
import { Card, CardButton } from "../components/Card";

const SampleTasks = [
    { text: "Wake Up" },
    { text: "Shower" },
    { text: "Go to Work"}
];

export default function () {
    const [tasks, setTasks] = React.useState(SampleTasks);

    return (
        <Page>
            <H1> 🌪️️ To<HighlightText>rna</HighlightText>do 🌪️</H1>
            
            <Container>
                <Cards cards={tasks} />
                <CardButton>New Task</CardButton>
            </Container>
        </Page>
    );
}

function Cards({cards}) {

    return cards.map(card => {

        return <Card text={card.text} />;
    })
}
