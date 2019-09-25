import React from "react";


import { Card, CardButton } from "../components/Card";
import { Dialog, Actions, ActionButton } from "../components/Dialog";
import { TextInput } from "../components/Inputs";
import { Page, Container } from "../components/Layout";
import { Tabs, Tab }  from "../components/Tabs";
import { H1, H2, HighlightText } from "../components/Text";

const SampleTasks = [
    { text: "Wake Up" },
    { text: "Shower" },
    { text: "Go to Work"},
    { text: "Eat Supper", archived: true},
    { text: "Brush Teeth", archived: true},
    { text: "Go to sleep", archived: true}
];

const TAB_GROUP = "PAGE";
const TAB_TASKS = "TAB_TASKS";
const TAB_ARCHIVED = "TAB_ARCHIVED";

export default function () {
    const [tasks, setTasks] = React.useState(SampleTasks);

    const [showArchived, setShowArchived] = React.useState(false);
    const toggleArchived = e => setShowArchived(e.target.value === TAB_ARCHIVED);

    const [newTaskText, setNewTaskText] = React.useState("");
    const changeNewTaskText = e => setNewTaskText(e.target.value);

    return (
        <Page>
            <H1> 🌪️️ To<HighlightText>rna</HighlightText>do 🌪️</H1>
            
            <Tabs onChange={toggleArchived}>
                <Tab group={TAB_GROUP} value={TAB_TASKS} defaultChecked>
                    Tasks
                </Tab>
                <Tab group={TAB_GROUP} value={TAB_ARCHIVED} >
                    Archived
                </Tab>
            </Tabs>

            <Container>
                <Cards cards={tasks} showArchived={showArchived} />
                <Switch on={showArchived}>
                    <CardButton if={false}>New Task</CardButton>
                </Switch>
            </Container>

            <Dialog>
                <H2>Create a new task</H2>
                <TextInput onChange={changeNewTaskText} value={newTaskText} label="Task Name" placeholder />
                <Actions>
                    <ActionButton>DISCARD</ActionButton>
                    <ActionButton blue>ADD TASK</ActionButton>
                </Actions>
            </Dialog>
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

function Switch({on, children}) {
    const array = Array.isArray(children) ? children : [children];

    return array.filter(child => child.props.if === on);
}
