const baseURL = "https://deckofcardsapi.com/";

// 1. Make a request to the Deck of Cards API to request a single card from a newly
// shuffled deck. Once you have the card, console.log the value and the suit
// (e.g. “5 of spades”, “queen of diamonds”).

axios
  .get(`${baseURL}/api/deck/new/draw/`)
  .then((card) => {
    const { suit, value } = card.data.cards[0];
    console.log(`${suit} : ${value}`);
  })
  .catch((err) => console.log(err));

// 2. Make a request to the deck of cards API to request a single card from a newly
// shuffled deck. Once you have the card, make a request to the same API to get one
// more card from the same deck.

axios
  .get(`${baseURL}/api/deck/new/draw/`)
  .then((card) => {
    let { suit, value } = card.data.cards[0];
    console.log(`${suit} : ${value}`);
    return axios.get(`${baseURL}/api/deck/${card.data.deck_id}/draw/?count=1`);
  })
  .then((newCard) => {
    const { suit, value } = newCard.data.cards[0];
    console.log(`${suit} : ${value}`);
  })
  .catch((err) => console.log(err));

// 3. Build an HTML page that lets you draw cards from a deck. When the page loads, go
// to the Deck of Cards API to create a new deck, and show a button on the page that
// will let you draw a card. Every time you click the button, display a new card, until
// there are no cards left in the deck.

let deckId = null;
const pile = [];

axios.get(`${baseURL}/api/deck/new/shuffle/?deck_count=1`).then((deck) => {
  deckId = deck.data.deck_id;
  console.log(`Deck ID = ${deckId}`);
});

$("#pile-button").on("click", function () {
  axios
    .get(`${baseURL}/api/deck/${deckId}/draw/`)
    .then((card) => {
      console.log(card.data.cards[0].image);
      pile.push(card.data.cards[0].image);
      let angle = Math.random() * 90 - 45;
      let randomX = Math.random() * 40 - 20;
      let randomY = Math.random() * 40 - 20;
      $("#card-area").append(
        $("<img>", { 
            src: card.data.cards[0].image,
            css: { transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
        } 
        }));
    })
    .catch((err) => console.log(err));
});
