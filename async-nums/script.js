let baseURL = "http://numbersapi.com";

// 1. Make a request to the Numbers API (http://numbersapi.com/) to get a fact
// about your favorite number. (Make sure you get back JSON by including the json
// query key, specific to this API. Details.

async function favoriteNumber(favNumber) {
  try {
    let { data: number } = await axios.get(`${baseURL}/${favNumber}?json`);
    console.log(number.text);
    return number.text;
  } catch (error) {
    console.log(error);
    return error;
  }
}

favoriteNumber(4);

// 2. Figure out how to get data on multiple numbers in a single request. Make
// that request and when you get the data back, put all of the number facts on
// the page.

async function favoriteNumbers(nums) {
  try {
    let { data: numbers } = await axios.get(`${baseURL}/${nums}?json`);
    Object.values(numbers).forEach((number) => console.log(number));
  } catch (error) {
    console.log(error);
  }
}

favoriteNumbers('1..10');

// 3. Use the API to get 4 facts on your favorite number. Once you have them all,
// put them on the page. It’s okay if some of the facts are repeats.
// const fourNums = [];

async function fourFacts(favNumber) {
  try {
    let number = await Promise.all([
      axios.get(`${baseURL}/${favNumber}?json`),
      axios.get(`${baseURL}/${favNumber}?json`),
      axios.get(`${baseURL}/${favNumber}?json`),
      axios.get(`${baseURL}/${favNumber}?json`),
    ]);
    for (let i = 0; i < 4; i++) {
      $("ul").append(`<li>${number[i].data.text}</li>`);
    }
  } catch (error) {
    console.log(error);
  }
}

fourFacts(4);
