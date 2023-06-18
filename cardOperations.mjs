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

  async newHand() {   
    await fetch('https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=2').then(response =>  response.json()).then(data => {
      result = [data[0], data[1]]
      console.log("Got a new hand: \n" + data[0] + data[1]);

      return result;
    }).catch(error => console.error('Error: ' + error))
  }
} 