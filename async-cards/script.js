const baseURL = "https://deckofcardsapi.com/";

// 1. Make a request to the Deck of Cards API to request a single card from a newly
// shuffled deck. Once you have the card, console.log the value and the suit
// (e.g. “5 of spades”, “queen of diamonds”).

async function drawCard() {
  let card = await axios.get(`${baseURL}/api/deck/new/draw/`);
  const { suit, value } = card.data.cards[0];
  console.log(`${suit} : ${value}`);
}

drawCard();

// 2. Make a request to the deck of cards API to request a single card from a newly
// shuffled deck. Once you have the card, make a request to the same API to get one
// more card from the same deck.

async function drawTwoCards() {
  let promisedCards = await Promise.all([
    axios.get(`${baseURL}/api/deck/new/draw/`),
    axios.get(`${baseURL}/api/deck/new/draw/`),
  ]);
  card1 = promisedCards[0].data.cards[0];
  card2 = promisedCards[1].data.cards[0];
  console.log(`${card1.suit} : ${card1.value}`);
  console.log(`${card2.suit} : ${card2.value}`);
}

drawTwoCards();

// 3. Build an HTML page that lets you draw cards from a deck. When the page loads, go
// to the Deck of Cards API to create a new deck, and show a button on the page that
// will let you draw a card. Every time you click the button, display a new card, until
// there are no cards left in the deck.

let deckId = null;

async function getDeck() {
  deck = await axios.get(`${baseURL}/api/deck/new/shuffle/?deck_count=1`);
  deckId = deck.data.deck_id;
  return deckId;
}

getDeck();

$("#pile-button").on("click", async function () {
  card = await axios.get(`${baseURL}/api/deck/${deckId}/draw/`);
  let angle = Math.random() * 90 - 45;
  let randomX = Math.random() * 40 - 20;
  let randomY = Math.random() * 40 - 20;
  $("#card-area").append(
    $("<img>", {
      src: card.data.cards[0].image,
      css: {
        transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`,
      },
    })
  );
});
