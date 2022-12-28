let favNumber = 4;
let baseURL = "http://numbersapi.com";

// 1. Make a request to the Numbers API (http://numbersapi.com/) to get a fact
// about your favorite number. (Make sure you get back JSON by including the json
// query key, specific to this API. Details.
let numberPromise = axios
  .get(`${baseURL}/${favNumber}?json`)
  .then((trivia) => console.log(trivia.data.text))
  .catch((err) => console.log(err));

// 2. Figure out how to get data on multiple numbers in a single request. Make
// that request and when you get the data back, put all of the number facts on
// the page.
let numbers = "1..10";
let numbersPromise = axios
  .get(`${baseURL}/${numbers}?json`)
  .then((trivia) => {
    facts = Object.values(trivia.data);
    facts.forEach((fact) => console.log(fact));
  })
  .catch((err) => console.log(err));

// 3. Use the API to get 4 facts on your favorite number. Once you have them all,
// put them on the page. It’s okay if some of the facts are repeats.

Promise.all([
  axios.get(`${baseURL}/${favNumber}?json`),
  axios.get(`${baseURL}/${favNumber}?json`),
  axios.get(`${baseURL}/${favNumber}?json`),
  axios.get(`${baseURL}/${favNumber}?json`),
])
  .then((trivia) => {
    trivia.forEach((fact) => $("ul").append(`<li>${fact.data.text}</li>`));
  })
  .catch((err) => console.log(err));
