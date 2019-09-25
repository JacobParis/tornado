import React from "react";


import { Card, CardButton } from "../components/Card";
import { Dialog, Actions, ActionButton } from "../components/Dialog";
import { TextInput } from "../components/Inputs";
import { Page, Container } from "../components/Layout";
import { Tabs, Tab }  from "../components/Tabs";
import { H1, H2, HighlightText, P } from "../components/Text";

const SampleTasks = [
    { text: "Wake Up", time: new Date().getTime()  },
    { text: "Shower", time: new Date().getTime()  },
    { text: "Go to Work", time: new Date().getTime() },
    { text: "Eat Supper", archived: true, time: new Date().getTime() },
    { text: "Brush Teeth", archived: true, time: new Date().getTime() },
    { text: "Go to sleep", archived: true, time: new Date().getTime() }
];

const MAX_TASKS = 8;

const TAB_GROUP = "PAGE";
const TAB_TASKS = "TAB_TASKS";
const TAB_ARCHIVED = "TAB_ARCHIVED";

const DIALOG_CREATE_TASK = "DIALOG_CREATE_TASK";
const DIALOG_ERROR_TASK = "DIALOG_ERROR_TASK";
const DIALOG_EDIT_TASK = "DIALOG_EDIT_TASK";
const DIALOG_EDIT_ARCHIVED_TASK = "DIALOG_EDIT_ARCHIVED_TASK";

export default function () {
    const [tasks, setTasks] = React.useState(SampleTasks);

    const [showArchived, setShowArchived] = React.useState(false);
    const toggleArchived = e => setShowArchived(e.target.value === TAB_ARCHIVED);

    const [showDialog, setDialog] = React.useState(true);
    const closeDialog = e => setDialog(false);

    const clickNewTask = React.useCallback(() => {
        const activeTasks = tasks.filter(task => !task.archived);
        const dialog = activeTasks.length > MAX_TASKS 
            ? DIALOG_ERROR_TASK 
            : DIALOG_CREATE_TASK;
        setDialog(dialog);
    }, [tasks]);

    const [newTaskText, setNewTaskText] = React.useState("");
    const changeNewTaskText = e => setNewTaskText(e.target.value);

    const createTask = () => {
        if (!newTaskText.length) return;

        setDialog(false);
        setNewTaskText("");
        setTasks(tasks => [...tasks, {
            text: newTaskText,
            time: new Date().getTime()
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
                    <TextInput
                        onChange={changeNewTaskText}
                        onKeyPress={e => e.key === "Enter" && createTask()}
                        value={newTaskText}
                        label="Task Name"
                        placeholder
                    />
                    <Actions>
                        <ActionButton onClick={closeDialog}>DISCARD</ActionButton>
                        <ActionButton blue onClick={createTask}>ADD TASK</ActionButton>
                    </Actions>
                </Dialog>

                <Dialog if={DIALOG_EDIT_TASK} onClose={closeDialog}>
                    <H2>Edit task</H2>
                    <TextInput
                        onChange={changeEditTaskText}
                        onKeyPress={e => e.key === "Enter" && (editTaskText.length ? saveTask() : archiveTask())}
                        value={editTaskText}
                        label="Task Name"
                        placeholder
                    />
                    <Actions>
                        <ActionButton onClick={closeDialog}>CANCEL</ActionButton>
                        <ActionButton green={editTaskText.length} onClick={saveTask}>SAVE</ActionButton>
                        <ActionButton red={!editTaskText.length} onClick={archiveTask}>ARCHIVE</ActionButton>
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

                <Dialog if={DIALOG_ERROR_TASK} onClose={closeDialog}>
                    <H2>Too Much Todo</H2>
                    <P> Todo, I have a feeling we're not in Kansas anymore </P>
                    <Actions>
                        <ActionButton onClick={closeDialog}>🌪</ActionButton>
                    </Actions>
                </Dialog>
            </Switch>
            <P>Made with ❤️ by Jacob Paris</P>
        </Page>
    );

    function modifySelectedTask(changes) {
        // Disclaimer: this code is ugly but I'm on a time limit 
        setTasks(tasks => {
            const position = tasks.findIndex(task => (
                task.text === selectedTask.text 
            &&  task.time === selectedTask.time
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
    const currentTime = new Date().getTime();

    return cards.filter(card => {
        // Ugly, but the only way we can match against the lack of a key
        // If we set archived to false on the active tasks we can skip this
        // But in a NoSQL production DB we want to leave the key off so we can 
        // maintain a partial index of archived cards and access them instantly
        const isArchived = !!card.archived;

        return isArchived === showArchived;
    }).map(card => {
        const timeSentence = timeDifference(currentTime, card.time);

        return (
            <Card
                onClick={() => onClick(card)}
                text={card.text}
                annotation={timeSentence}
            />
        );
    })
}

function Switch({on, children}) {
    const array = Array.isArray(children) ? children : [children];

    return array.filter(child => child.props.if === on);
}


// Stolen from
// https://stackoverflow.com/questions/6108819/javascript-timestamp-to-relative-time-eg-2-seconds-ago-one-week-ago-etc-best
//
function timeDifference(current, previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        return Math.round(elapsed/msPerDay) + ' days ago';   
    }

    else if (elapsed < msPerYear) {
        return Math.round(elapsed/msPerMonth) + ' months ago';   
    }

    else {
        return Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}