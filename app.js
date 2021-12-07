// import functions and grab DOM elements
import { renderGame } from './render-utils.js';

//4 Add and Subtract buttons
const nameForm = document.getElementById('name-form');
const teamOneAddButton = document.getElementById('team-one-add-button');
const teamOneSubtractButton = document.getElementById('team-one-subtract-button');
const teamTwoAddButton = document.getElementById('team-two-add-button');
const teamTwoSubtractButton = document.getElementById('team-two-subtract-button');

const form = document.querySelector('form');
//Finish Game Button
const finishGameButton = document.getElementById('finish-game-button');

const currentGameEl = document.getElementById('current-game-container');
const pastGamesEl = document.getElementById('past-games-container');

const teamOneLabel = document.getElementById('team-one-name');
const teamTwoLabel = document.getElementById('team-two-name');

let name1 = '';
let name2 = '';
let score1 = 0;
let score2 = 0;

// create an array to hold on to the state of past games
const pastGamesArray = [];

//set event listeners
nameForm.addEventListener('submit', (e) => {
    // don't forget to prevent the default form behavior!
    e.preventDefault();
    // get the name data from the form
    const data = new FormData(form);
    // set the state to this data from the form
    name1 = data.get('team-one');
    name2 = data.get('team-two');
    // reset the form values
    nameForm.reset();

    displayCurrentGameEl();
});

teamOneAddButton.addEventListener('click', () => {
    // increment the current state for team one's score
    score1++;
    displayCurrentGameEl();
});

teamTwoAddButton.addEventListener('click', () => {
    // increment the current state for team two's score
    score2++;
    displayCurrentGameEl();
});

teamOneSubtractButton.addEventListener('click', () => {
    // decrement the current state for team one's score
    score1--;
    displayCurrentGameEl();
});

teamTwoSubtractButton.addEventListener('click', () => {
    score2--;
    displayCurrentGameEl();
});

finishGameButton.addEventListener('click', () => {

    // when i click the finish game button, clear out the form
    nameForm.reset();

    //save a copy of state, then save the old game in an object so we can push it to an array
    //create some DOM
    //display each past score in the list

    // HINT: it will be helpful to keep track of these games as objects with 4 properties, one for each piece of state we're tracking
    // const currentGame = {
    //     name1: name1,
    //     name2: name2,
    //     score1: score1,
    //     score2: score2,
    // };
    const currentGame = {
        name1: name1,
        score1: score1,
        name2: name2,
        score2: score2
    };
    //"Update the list"
    // add the current game/score to an array of games in state.
    pastGamesArray.push(currentGame);
  
    displayAllGames();

    // reset the initial state to start with a new form
    name1 = '';
    name2 = '';
    score1 = 0;
    score2 = 0;

    displayCurrentGameEl();
});

function displayCurrentGameEl() {
    // clear out the current game div
    currentGameEl.textContent = '';
    // change the label to show team one's name;
    // change the label to show team two's name;
    teamOneLabel.textContent = name1;
    teamTwoLabel.textContent = name2;

    // call the render game function to create a game element
    const newGame = {
        name1: name1,
        score1: score1,
        name2: name2,
        score2: score2
    };

    renderGame(newGame);
    // append the element to the cleared out current game div
    const newElement = renderGame(newGame);
    currentGameEl.append(newElement);
}

function displayAllGames() {

    // clear out the past games list in the DOM
    pastGamesEl.textContent = '';
    // use a for loop to loop through all past scores
    for (let pastGame of pastGamesArray) {
    // render and append a past game for each past game in state
        const gameEl = renderGame(pastGame);
        pastGamesEl.append(gameEl);
    }
}