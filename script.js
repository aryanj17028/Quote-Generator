const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//Show Loading
function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide Loading
function removeLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

//Get Quote From API
async function getQuote() {
    showLoadingSpinner();
    const apiUrl =
        "https://type.fit/api/quotes/?method=getQuote&lang=en&format=json";
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        let number = Math.floor(Math.random() * data.length);
        let quote;
        //check if author is blank
        if (data[number].author === null) {

            authorText.innerText = "Unknown";
        } else {
            authorText.innerText = data[number].author;


        }
        //Reduce font size if quote is too long
        if (data[number].text.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data[number].text;

        //Stop loader and show quote
        removeLoadingSpinner();
    } catch (error) {
        getQuote();
        
    }
}

//Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click', getQuote);

twitterBtn.addEventListener('click', tweetQuote);

//On Load
getQuote();