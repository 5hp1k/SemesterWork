import Deck from "./cardOperations.mjs"
import Player from "./player.mjs"
import Dealer from "./dealer.mjs"

const usernameElement = document.getElementById('username');
const nameInput = document.getElementById('name');
const startButton = document.getElementById('startButton');
const newDeckButton = document.getElementById('newDeckButton');   
const welcomeSection = document.getElementById('welcome');
const gameContentSection = document.getElementById('gameContent');

usernameElement.textContent = "введите имя пользователя";
let deck = new Deck();
deck.newDeck();

startButton.addEventListener('click', () => {
  const username = nameInput.value;
  if (username) {
    welcomeSection.style.display = 'none';
    gameContentSection.style.display = 'block';
    usernameElement.textContent = username;
  }
});
  
newDeckButton.addEventListener('click', () => {
    deck.newDeck();
  });

