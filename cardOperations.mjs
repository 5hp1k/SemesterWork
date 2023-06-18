export default class Deck {
  constructor() {
    this.deckID = '';
  }

  async newDeck() {   
    await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6').then(response =>  response.json()).then(data => {
      this.deckID = data.deck_id;
      console.log("Got a new deck: \n" + this.deckID);
    }).catch(error => console.error('Error: ' + error))
  }

  async shuffleDeck() {
    await fetch(`https://deckofcardsapi.com/api/deck/${this.deckID}/shuffle`).then(response =>  response.json()).then(data => {
      console.log("Shuffled the deck with ID: \n" + this.deckID);
    }).catch(error => console.error('Error: ' + error))
  }

  async newHand() {   
    return fetch(`https://deckofcardsapi.com/api/deck/${this.deckID}/draw/?count=4`).then(response => response.json()).then(data => {
        let result = data.cards;
        console.log("Got a new hand: \n" + JSON.stringify(result));

        return result;
      }).catch(error => console.error('Error: ' + error));
  }
  
  async drawCard() {
    return fetch(`https://deckofcardsapi.com/api/deck/${this.deckID}/draw/?count=1`).then(response => response.json()).then(data => {
        let result = data.cards[0];
        console.log("Took a card: \n" + JSON.stringify(result));

        return result;
      }).catch(error => console.error('Error: ' + error));
  }
  
} 