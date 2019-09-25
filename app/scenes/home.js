import React from "react";


import { Card, CardButton } from "../components/Card";
import { Dialog, Actions, ActionButton } from "../components/Dialog";
import { TextInput } from "../components/Inputs";
import { Page, Container } from "../components/Layout";
import { Tabs, Tab }  from "../components/Tabs";
import { H1, H2, HighlightText, P } from "../components/Text";

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

const DIALOG_CREATE_TASK = "DIALOG_CREATE_TASK";
const DIALOG_EDIT_TASK = "DIALOG_EDIT_TASK";
const DIALOG_EDIT_ARCHIVED_TASK = "DIALOG_EDIT_ARCHIVED_TASK";

export default function () {
    const [tasks, setTasks] = React.useState(SampleTasks);

    const [showArchived, setShowArchived] = React.useState(false);
    const toggleArchived = e => setShowArchived(e.target.value === TAB_ARCHIVED);

    const [showDialog, setDialog] = React.useState(true);
    const closeDialog = e => setDialog(false);

    const clickNewTask = React.useCallback(() => {
        setDialog(DIALOG_CREATE_TASK);
    }, [tasks]);

    const [newTaskText, setNewTaskText] = React.useState("");
    const changeNewTaskText = e => setNewTaskText(e.target.value);

    const createTask = () => {
        setDialog(false);
        setNewTaskText("");
        setTasks(tasks => [...tasks, {
            text: newTaskText,
        }]);
    }

    const [selectedTask, setSelectedTask] = React.useState();
    const selectTask = task => {
        setSelectedTask(task);
        const dialog = showArchived
            ? DIALOG_EDIT_ARCHIVED_TASK
            : DIALOG_EDIT_TASK;

        setDialog(dialog);
    }

    const [editTaskText, setEditTaskText] = React.useState("");
    const changeEditTaskText = e => setEditTaskText(e.target.value);

    const saveTask = () => {
        setDialog(false);
        modifySelectedTask({
            text: editTaskText
        });
    }

    const archiveTask = () => {
        setDialog(false);
        modifySelectedTask({
            archived: true
        });
    }

    const deleteTask = () => {
        setDialog(false);
        modifySelectedTask();
    }

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
                <Cards cards={tasks} showArchived={showArchived} onClick={selectTask} />
                <Switch on={showArchived}>
                    <CardButton if={false} onClick={clickNewTask}>New Task</CardButton>
                </Switch>
            </Container>

            <Switch on={showDialog}>
                <Dialog if={DIALOG_CREATE_TASK} onClose={closeDialog}>
                    <H2>Create a new task</H2>
                    <TextInput onChange={changeNewTaskText} value={newTaskText} label="Task Name" placeholder />
                    <Actions>
                        <ActionButton onClick={closeDialog}>DISCARD</ActionButton>
                        <ActionButton blue onClick={createTask}>ADD TASK</ActionButton>
                    </Actions>
                </Dialog>

                <Dialog if={DIALOG_EDIT_TASK} onClose={closeDialog}>
                    <H2>Edit task</H2>
                    <TextInput onChange={changeEditTaskText} value={editTaskText} label="Task Name" placeholder />
                    <Actions>
                        <ActionButton onClick={closeDialog}>CANCEL</ActionButton>
                        <ActionButton onClick={saveTask}>SAVE</ActionButton>
                        <ActionButton red onClick={archiveTask}>ARCHIVE</ActionButton>
                    </Actions>
                </Dialog>

                <Dialog if={DIALOG_EDIT_ARCHIVED_TASK} onClose={closeDialog}>
                    <H2>Delete task</H2>
                    <P>If you do this there's no going back</P>
                    <Actions>
                        <ActionButton onClick={closeDialog}>CANCEL</ActionButton>
                        <ActionButton red onClick={deleteTask}>DELETE</ActionButton>
                    </Actions>
                </Dialog>
            </Switch>
        </Page>
    );

    function modifySelectedTask(changes) {
        // Disclaimer: this code is ugly but I'm on a time limit 
        setTasks(tasks => {
            const position = tasks.findIndex(task => (
                task.text === selectedTask.text 
            &&  task.date === selectedTask.date
            ));

            // Delete the item if changes is falsy
            const task = changes && {
                ...selectedTask,
                ...changes
            };

            return [
                ...tasks.slice(0, position),
                ...changes ? [task] : [],
                ...tasks.slice(position + 1)
            ];
        });
    }
}

function Cards({cards, onClick, showArchived}) {

    return cards.filter(card => {
        // Ugly, but the only way we can match against the lack of a key
        // If we set archived to false on the active tasks we can skip this
        // But in a NoSQL production DB we want to leave the key off so we can 
        // maintain a partial index of archived cards and access them instantly
        const isArchived = !!card.archived;

        return isArchived === showArchived;
    }).map(card => {

        return (
            <Card
                onClick={() => onClick(card)}
                text={card.text}
            />
        );
    })
}

function Switch({on, children}) {
    const array = Array.isArray(children) ? children : [children];

    return array.filter(child => child.props.if === on);
}
