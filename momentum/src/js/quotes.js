import { state } from "./settings";

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');

export async function getQuotes() {
  const quotes = state.language === 'english' ? './data-en.json' : './data-ru.json';
  const res = await fetch(quotes);
  const data = await res.json();
  const randomQuote = data[getRandomInt()];
  
  quote.textContent = `"${randomQuote.text}"`;
  author.textContent = randomQuote.author;
}

function getRandomInt() {
  return Math.floor(Math.random() * 20);
}

setTimeout(() => {
  getQuotes();
}, 1000);

changeQuote.addEventListener('click', getQuotes);