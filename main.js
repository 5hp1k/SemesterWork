import Deck from "./cardOperations.mjs"
import Participant from "./participant.mjs";

let dealerScoreNode = document.getElementById("dealer-number");
let playerScoreNode = document.getElementById("player-number");

let dealerCardsNode = document.getElementById("dealer-cards");
let playerCardsNode = document.getElementById("player-cards");

const usernameElement = document.getElementById('username');
const nameInput = document.getElementById('name');
const startButton = document.getElementById('startButton');
const newDeckButton = document.getElementById('newDeckButton');
const newHandButton = document.getElementById('newHandButton');  
const takeCardButton = document.getElementById('takeCardButton');  
const welcomeSection = document.getElementById('welcome');
const gameContentSection = document.getElementById('gameContent');

usernameElement.textContent = "введите имя пользователя";

//TEMP
welcomeSection.style.display = 'none';
gameContentSection.style.display = 'block';
//TEMP

let player = new Participant();
let dealer = new Participant();

let deck = new Deck();
await deck.newDeck();
initGame();

async function initGame() {
  let cards = await deck.newHand();

  player.cards.push(cards[0]);
  player.cards.push(cards[1]);

  dealer.cards.push(cards[2]);
  dealer.cards.push(cards[3]);

  renderHand();
}

function deleteCards() {
  while (dealerCardsNode.firstChild) {
    dealerCardsNode.firstChild.remove();
  }

  while (playerCardsNode.firstChild) {
    playerCardsNode.firstChild.remove();
  }
}

function renderHand() {
  deleteCards();

  player.cards.forEach(card => {
    let cardDomElement = document.createElement("img");
    cardDomElement.src = card.image;
    playerCardsNode.appendChild(cardDomElement);
  });
}

startButton.addEventListener('click', () => {
  const username = nameInput.value;

  if (username) {
    welcomeSection.style.display = 'none';
    gameContentSection.style.display = 'block';
    usernameElement.textContent = username;
  }
});
  
newDeckButton.addEventListener('click', async () => {
  await deck.newDeck();

  player.resetCards();
  dealer.resetCards();

  initGame();
});

newHandButton.addEventListener('click', async () => {
  player.resetCards();
  dealer.resetCards();

  initGame();
});

takeCardButton.addEventListener('click', async () => {
  let card = await deck.drawCard();
  player.cards.push(card);

  renderHand();

  let playerScore = player.getScore();

  playerScoreNode.textContent = player.playerScore;
  if (playerScore > 21) {
    console.log("You lost!");
    //roundLost = true;
    //announcementNode.textContent = "You broke. Pay up."
  }
});
