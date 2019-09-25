# 🌪 Tornado 🌪
A Todo List app for Oscar Intelligence

# Usage

Clone this repository to your local environment

```sh
git clone https://github.com/jacobparis/tornado
```

Install node modules

```sh
npm install
```

# Commands

* `npm run build` to compile and drop the bundle in the `dist` directory

* `npm run serve` to start a local webserver 

# Devlog

For this project I am starting with my own [React boilerplate](https://github.com/JacobParis/react-boilerplate) as a launching point. It's pretty basic, but saves me a lot of time dealing with fundamentals instead of product development.

From this point, we're starting off with a basic React app, using a React-Router for navigation and one single Scene called Home. 

The UI will be built with components stolen from my [UI Library](https://jacobparis.com/ui/) which is an ongoing project to create a reusable set of components ready to drop into React projects. 

For drafting UI designs, I use my [Blackboard](https://writeonblackboard.com/) which I shill so often that if they offered an affiliate program I'd be retired already. I sketched out some UI concepts earlier and the only UI component I wanted that I didn't already have made was **Tabs**, which I took the liberty of coding earlier today before beginning this project. Is that cheating? My lawyer won't answer my calls anymore, so I'm afraid we'll never know.

In the Wizard of Oz, the lead character Dorothy's dog is named Toto and you can't spell the tornado that swept her to Oz without todo either. Puns are my friends.

## Ready, set, code

My first step is to add the viewport meta tags so that mobile browsers will render the site at a reasonable scale. I need to add that to the boilerplate itself, but we're on a time limit. While I'm here I'll also change the font and add Roboto for body text and Roboto Condensed Light for headings. There's an overhead to loading multiple fonts, but not one that's going to be an impediment for this project. 

I'm very fond of the `width: 100%` `max-width: 800px` style of laying out my main container, since it works flawlessly on all screen sizes automatically. If your responsive design looks like miles of media queries, your design is probably not mobile friendly to begin with. 

I can never decide on a good border radius to use for a given product, so that'll be the first Theme controlled variable I have. I declare it in a `theme.js` file and every time I need a border radius I can grab it from the same place, so change once and it changes everywhere. 

There is some chance that live blogging my dev process is going to push me over the 3 hour limit, but todo apps are also literally the first project a junior developer usually does with a language they've never seen before so I'm pretty confident.

## Building the Page

I'm stealing the Text component from my UI Kit and adding a palette of colors and shades to my Theme file. I don't think I'll need more than one Header and the Paragraph text, but I'm kinda making this up as I go. 

I want to show the tasks as a list of square cards, like sticky notes or physical cards. Back when I was in manufacturing I got the shop converted over to a Toyota style kanban system of cards moving back and forth with inventory. An actual kanban engine is way over scope here, so I'll just live vicariously through my square cards.

These are not coming from my UI Kit since those tiles are built on CSS grid, and here I'm only looking for a 1 dimensional row of identically sized cards.

I guess I'm also picking Blue as my primary color here

There are lots of options for choosing how to add a new task. Material design suggests a Floating Action Button that pops up a create dialog, but I like the more implicit design of having a clickable ghosty task card inline with the rest of the cards. I could even just turn that into an editable card onClick that becomes a real one as soon as you save it, but I know from past experience that getting React to play nicely with contentEditable divs is a huge hassle. I'll think more about that later.

Hover effects are falling out of favour as mobile becomes the dominant platform, but they're still pleasant on desktop, so I want the brightness to go up on hover and darken on click. I found a [good lighten/darken script](https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors) on StackOverflow that I will steal and throw in my `theme.js`. I'm not sold on keeping such utility functions here, so it might move later. 

I also hate the default chrome outlines so I need to set manual focus styles with CSS. Keyboard users seem niche until you realize everyone who tabs through an input or submits a form with the Enter key becomes a keyboard user, so we need to accomodate them by default. One of my senior members of my [programming community Devcord](https://devcord.com/) likes to hide focus styles until the user starts to use the keyboard, which is a bit of UX delight I love but I don't think I'll go that for for this project.

## The First Mistake

I named the container where my Cards were `Cards` which seemed appropriate at the time. In truth it's a generic container, and I want to use that name for the function that generates my cards, so time to refactor a bit. 

Having a static list of Card components in my scene doesn't make sense when the data needs to be dynamic, so I can replace them with a function that inputs a JSON list of tasks and outputs a Card for each.

The requirements ask for a way to delete tasks, but it seems weird to not have a way to view complete tasks so I'm adding an intermediate state called Archived. By toggling a state prop called `showArchived` I can show either the active or archived tasks.

On the UI side, I'm controlling the `showArchived` state with the Tabs component from my UI Kit. Under the hood it's just a radio button group, which makes it very accessible to keyboard users and ties in really well to React's state machine.

Displaying the current tab status by highlighting the tab text doesn't really work in a world where I'm also changing the tab text colour on hover, so I'm making a [tiny little CSS arrow](https://css-tricks.com/snippets/css/css-triangle/) using some border magic.

I also want to hide the New Task button when viewing archived tasks. At the moment I don't see a compelling use-case for creating pre-archived tasks, which would be the digital equivalent of the satisfying yet unnecessary *writing items on your todo list and crossing them off immediately*

There are a lot of ways to conditionally show components in React, and I'm still not sold on which I prefer. Using a JSX ternary statement still seems hacky to me, so I'm going to use a basic Switch component that takes an `on` attribute and compares it to the `if` attribute of its children. This is similar to the way React Router shows Routes, so it can't be that bad of practice.

# Dialog City

The Dialog from my UI Kit is in its infancy still, but it'll work here. Dialogs actually present a rather difficult accessibility challenge since they ideally should assume focus and trap focus within themselves until they're canceled.

Text Inputs are tricky from a usability perspective especially concerning the less tech savvy users. I once had a customer complain that a form submit wasn't working, when the reality was they hadn't entered any data into the fields. They saw the placeholder and assumed it was already filled, so I now make sure my inputs have the option of remaining placeholder free. Placeholders are also a WCAG nightmare since any contrast level that makes the text sufficiently readable is indistinguishable from normal text.

Here I'm going to use an input with a placeholder that moves out of the way as the user types like the Material Design spec promotes.

We can toggle the Dialog using the same Switch component that toggles the New Task button. Right now it just handles true or false, but it'll work just as well for switching between distinct different dialogs too.

# Functionality Time

All the hard boilerplate is done, so now everything should run pretty smoothly. 

Creating a new task is as simple as a callback on the dialog that adds one new item to the task state. 

The Edit task dialog is a slightly modified clone of the create task dialog, but its functionality is a little trickier since instead of appending to an array, it needs to swap an element out from the middle of it. 
