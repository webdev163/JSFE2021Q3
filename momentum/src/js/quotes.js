import { state } from "./settings";

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');
const quotesWrapper = document.querySelector('.quotes-wrapper');

export async function getQuotes() {
  const quotes = state.language === 'english' ? './data/data-en.json' : './data/data-ru.json';
  const res = await fetch(quotes);
  const data = await res.json();
  const randomQuote = data[getRandomInt()];
  
  setTimeout(() => {
    quote.textContent = `"${randomQuote.text}"`;
    author.textContent = randomQuote.author;
  }, 1000);
}

function getRandomInt() {
  return Math.floor(Math.random() * 20);
}

function handleOpacity() {
  quotesWrapper.classList.add('quotes-hidden');
  setTimeout(() => {
    quotesWrapper.classList.remove('quotes-hidden');
  }, 1000);
}

setTimeout(() => {
  getQuotes();
}, 1000);

changeQuote.addEventListener('click', getQuotes);
changeQuote.addEventListener('click', handleOpacity);