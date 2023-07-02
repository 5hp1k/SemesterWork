export default class Participant {
    constructor() {
        this.picture = '';
        this.cards = [];
        this.score = 0;
    }

    resetCards() {
        this.cards = [];
    }

    getCards() {
        return this.cards;
    }

    getScore() {
        this.computeScore()

        return this.score;
    }

    async setPicture() {
        await fetch('https://api.capy.lol/v1/capybara?json=true').then(response =>  response.json()).then(data => {
            this.picture = data.data.url;
        }).catch(error => console.error('Error: ' + error))
    }

    computeScore() {
        let hasAce = false;

        let score = this.cards.reduce((acc, card) => {
          if (card.value === "ACE") {
            hasAce = true;
            return acc + 1
          }

          if (isNaN(card.value)) { return acc + 10 }

          return acc + Number(card.value);
        }, 0)

        if (hasAce) {
          score = (score + 10) > 21 ? score : score + 10;
        }

        this.score = score;
      }
}