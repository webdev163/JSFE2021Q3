const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');

async function getQuotes() {
  const quotes = './data-en.json';
  const res = await fetch(quotes);
  const data = await res.json();
  const randomQuote = data[getRandomInt()];
  
  quote.textContent = `"${randomQuote.text}"`;
  author.textContent = randomQuote.author;
}

function getRandomInt() {
  return Math.floor(Math.random() * 20);
}

getQuotes();

changeQuote.addEventListener('click', getQuotes);