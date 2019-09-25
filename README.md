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