const quoteContainer = document.getElementById('quote-container');
const quoteText      = document.getElementById('quote-text');
const authorText     = document.getElementById('author');
const twitterBtn     = document.getElementById('twitter');
const newQuoteBtn    = document.getElementById('new-quote');
const loader         = document.getElementById('loader');
const changeBackgroundBtn = document.getElementById('change-background');
const bodyTag = document.body;
const hackerQuoteBtn = document.getElementById('hacker-quote');
const quotes = document.getElementById('quote-text-container');
function ShowLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide loading
function HideLoadingSpinner(){
    if(loader.hidden === false){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

const normalizeQuoteDataFromApis = (data) => {
    let quoteText;
    return (quoteText = data.quotes
      ? data.quotes[0]
      : data.quoteText
      ? data.quoteText
      : data.paragraphs[0]
      ? data.paragraphs[0].replace(/[<p>][<\/p>]/g, '')
      : 'end');
  };
  
  const normalizeAuthorDataFromApis = (data) => {
    let authorText;
    return (authorText = data.quotes
      ? ' - Hacker'
      : data.source
      ? `${data.source} - in character`
      : data.quoteAuthor === ''
      ? 'Unknown'
      : data.quoteAuthor);
  };

//Get Quote from API
async function getQuote(apiUrl) {
    ShowLoadingSpinner();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    
    try{
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        authorText.innerText = normalizeAuthorDataFromApis(data);
        quoteText.innerText = normalizeQuoteDataFromApis(data);

        HideLoadingSpinner();
    }catch(error){
        getQuote("https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json");//Load another Quote
        console.log('Opps, Something went wrong!', error);
    }

}
const getHackerQuote = async () => {
    getQuote('https://hackerman.wtf/api');
  };

//Tweet Quote
function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.trim()} - ${author}`;
    window.open(encodeURI(twitterUrl), '_blank');
}

//Event Listeners
hackerQuoteBtn.addEventListener('click', getHackerQuote);
changeBackgroundBtn.addEventListener('click',randomizeBackground);
newQuoteBtn.addEventListener('click',getQuote);
twitterBtn.addEventListener('click',tweetQuote);


//Randomize Background
function randomizeBackground() {
    let randomNumber = getRandomNumber(0,28);
    bodyTag.style.backgroundImage = backgroundArray[randomNumber];
}

//Random Number Generator between two given numbers including themselves
function getRandomNumber(firstNumber, lastNumber) {
    firstNumber = Math.ceil(firstNumber); 
    lastNumber = Math.floor(lastNumber); 
    return Math.floor(Math.random() * (lastNumber - firstNumber + 1)) + firstNumber; 
}

//On Load	 	
getQuote("https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json");
randomizeBackground();
