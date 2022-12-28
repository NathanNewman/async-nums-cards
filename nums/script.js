let favNumber = 4;
let baseURL = "http://numbersapi.com";

// 1.
let numberPromise = axios.get(`${baseURL}/${favNumber}?json`)
    .then(trivia => console.log(trivia.data.text))
    .catch((err) => console.log(err));

// 2.
let numbers = "1..10";
let numbersPromise = axios.get(`${baseURL}/${numbers}?json`)
    .then((trivia) => {
        facts = Object.values(trivia.data);
        facts.forEach((fact) => console.log(fact));
    })
    .catch((err) => console.log(err));

// 3.
const fourNums = [];

for (let i = 0; i < 4; i++) {
  fourNums.push(axios.get(`${baseURL}/${i}?json`));
}
Promise.all(fourNums)
  .then((trivia) => {
    trivia.forEach((fact) => $("ul").append(`<li>${fact.data.text}</li>`));
  })
  .catch((err) => console.log(err));
