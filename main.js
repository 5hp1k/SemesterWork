import Deck from "./cardOperations.mjs"
import Participant from "./participant.mjs";

let roundLost = false;
let roundWon = false;
let roundTied = false;

const announcementNode = document.getElementById("announcement");

const dealerScoreNode = document.getElementById("dealer-number");
const playerScoreNode = document.getElementById("player-number");

const dealerCardsNode = document.getElementById("dealer-cards");
const playerCardsNode = document.getElementById("player-cards");

const playerNicknameNode = document.getElementById("player-nickname");

const dealerAvatar = document.getElementById("dealer-avatar");
const playerAvatar = document.getElementById("player-avatar");
const usernameElement = document.getElementById('username');
const nameInput = document.getElementById('name');
const startButton = document.getElementById('startButton');
const newDeckButton = document.getElementById('newDeckButton');
const newHandButton = document.getElementById('newHandButton');  
const takeCardButton = document.getElementById('takeCardButton');
const passButton = document.getElementById('passButton');  
const welcomeSection = document.getElementById('welcome');
const gameContentSection = document.getElementById('gameContent');

usernameElement.textContent = "Capybara Blackjack";

let username = '';

let player = new Participant();
await player.setPicture();
playerAvatar.src = player.picture;
let dealer = new Participant();
await dealer.setPicture();
dealerAvatar.src = dealer.picture;

let deck = new Deck();
await deck.newDeck();
initGame();

async function initGame() {
  newDeckButton.disabled = false;
  newHandButton.disabled = false;
  takeCardButton.disabled = false;
  passButton.disabled = false; 

  announcementNode.textContent = "";
  dealerScoreNode.textContent = "?";

  let cards = await deck.newHand();

  player.cards.push(cards[0]);
  player.cards.push(cards[1]);

  dealer.cards.push(cards[2]);
  dealer.cards.push(cards[3]);

  renderDealerHand();
  renderPlayerHand();

  let playerScore = player.getScore();
  playerScoreNode.textContent = playerScore;

  if (playerScore > 21) {
    roundLost = true;
    announcementNode.textContent = "Проиграл!";

    takeCardButton.disabled = true;
    passButton.disabled = true; 
  }
  if (playerScore == 21) {
    announcementNode.textContent = "Выиграл!";

    takeCardButton.disabled = true;
    passButton.disabled = true; 
  }
}

function renderPlayerHand() {
  while (playerCardsNode.firstChild) {
    playerCardsNode.firstChild.remove();
  }

  player.cards.forEach(card => {
    let cardDomElement = document.createElement("img");
    cardDomElement.src = card.image;
    playerCardsNode.appendChild(cardDomElement);
  });
}

function renderDealerHand(isDealerPlaying = false) {
  while (dealerCardsNode.firstChild) {
    dealerCardsNode.firstChild.remove();
  }

  dealer.cards.forEach((card, i) => {
    let cardDomElement = document.createElement("img");

    if (i === 0 && !isDealerPlaying) {
      cardDomElement.src = './jack_black.jpg';
    } else {
      cardDomElement.src = card.image;
    }

    dealerCardsNode.appendChild(cardDomElement);
  }); 
}

async function dealerPlays() {
  let dealerScore = dealer.getScore();

  dealerScoreNode.textContent = dealerScore;
  dealerCardsNode.firstChild.src = dealer.cards[0].image;

  while (dealerScore < 17) {
    await delay(900);
    await drawDealerCard();
    dealerScore = dealer.getScore();
  }

  determineRoundResult();
}

async function drawDealerCard() {
  let card = await deck.drawCard();
  dealer.cards.push(card);

  renderDealerHand(true);
  dealerScoreNode.textContent = dealer.getScore();
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


function determineRoundResult() {
  let dealerScore = dealer.getScore();
  let playerScore = player.getScore();

  if (dealerScore > 21) {
    roundWon = true;
    announcementNode.textContent = "Дилер проиграл, победа за тобой!";
  } else if (dealerScore > playerScore) {
    roundLost = true;
    announcementNode.textContent = "Проиграл";
  } else if (dealerScore === playerScore) {
    roundTied = true;
    announcementNode.textContent = "Ничья.";
  }

}

startButton.addEventListener('click', () => {
  username = nameInput.value;

  if (username) {
    welcomeSection.style.display = 'none';
    gameContentSection.style.display = 'block';
    playerNicknameNode.textContent = username;
  }
});


newDeckButton.addEventListener('click', async () => {
  await deck.newDeck();

  player.resetCards();
  dealer.resetCards();

  roundLost = false;
  roundWon = false;
  roundTied = false;

  initGame();
});

newHandButton.addEventListener('click', async () => {
  player.resetCards();
  dealer.resetCards();

  roundLost = false;
  roundWon = false;
  roundTied = false;

  initGame();
});

takeCardButton.addEventListener('click', async () => {
  let card = await deck.drawCard();
  player.cards.push(card);

  renderPlayerHand();

  let playerScore = player.getScore();
  playerScoreNode.textContent = playerScore;

  if (playerScore > 21) {
    roundLost = true;
    announcementNode.textContent = "Проиграл!";

    takeCardButton.disabled = true;
    passButton.disabled = true; 
  }
  if (playerScore == 21) {
    announcementNode.textContent = "Выиграл!";

    takeCardButton.disabled = true;
    passButton.disabled = true; 
  }

});

passButton.addEventListener('click', () => {
  newDeckButton.disabled = true;
  newHandButton.disabled = true;
  takeCardButton.disabled = true;
  passButton.disabled = true; 

  dealerPlays();

  newDeckButton.disabled = false;
  newHandButton.disabled = false;
});
