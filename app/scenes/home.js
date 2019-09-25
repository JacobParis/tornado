import React from "react";

import { Page, Container } from "../components/Layout";
import { H1, HighlightText } from "../components/Text";
import { Card, CardButton } from "../components/Card";

const SampleTasks = [
    { text: "Wake Up" },
    { text: "Shower" },
    { text: "Go to Work"},
    { text: "Eat Supper", archived: true},
    { text: "Brush Teeth", archived: true},
    { text: "Go to sleep", archived: true}
];

export default function () {
    const [tasks, setTasks] = React.useState(SampleTasks);

    const [showArchived, setShowArchived] = React.useState(false);

    return (
        <Page>
            <H1> 🌪️️ To<HighlightText>rna</HighlightText>do 🌪️</H1>
            
            <Container>
                <Cards cards={tasks} showArchived={showArchived} />
                <CardButton>New Task</CardButton>
            </Container>
        </Page>
    );
}

function Cards({cards, showArchived}) {

    return cards.filter(card => {
        // Ugly, but the only way we can match against the lack of a key
        // If we set archived to false on the active tasks we can skip this
        // But in a NoSQL production DB we want to leave the key off so we can 
        // maintain a partial index of archived cards and access them instantly
        const isArchived = !!card.archived;

        return isArchived === showArchived;
    }).map(card => {

        return <Card text={card.text} />;
    })
}
