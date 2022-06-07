// Animated header section on page load

window.onload = () => {
  anime({
    targets: '.logo, .nav-item',
    translateY: {
      value: 50,
      duration: 2300
    },
    rotate: {
      value: 0,
      duration: 1800,
      easing: 'easeInOutSine'
    },
    scale: {
      value: 1,
      duration: 1600,
      delay: 800,
      easing: 'easeInOutQuart'
    },
    delay: 250,
  });
};


// Assigning DOM elements to variables

const searchForm = document.querySelector('.search-form');

const searchInput = document.querySelector('.search-input');

const validationMessage = document.querySelector('.validation-message');

const searchingText = document.querySelector('.searching-text');

const results = document.querySelector('.dictionary-results');

const wordText = document.querySelector('.word');

const posText = document.querySelector('.word-part');

const subtitleText = document.querySelector('.definition-subtitle');

const definitionText = document.querySelector('.definition-text');

const errorText = document.querySelector('.error');

// Event Listeners

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  resetDisplay();

  let word = searchInput.value.toLowerCase();
  let check = checkInput(word);

  if (check) {
    displayValidationMessage();
  }
  else {
    getResult(word);
  }
});

function resetDisplay() {
  anime({
    targets: '.validation-message',
    translateY: -5,
    direction: 'alternate',
    loop: false,
    easing: 'linear'
  });

  anime({
    targets: '.dictionary-results',
    translateY: -5,
    direction: 'alternate',
    loop: false,
    easing: 'linear'
  });

  validationMessage.style.display = 'none';
  validationMessage.textContent = '';

  errorText.textContent = '';

  results.style.display = 'none';

  wordText.style.display = 'none';
  wordText.textContent = '';

  posText.style.display = 'none';
  posText.textContent = '';

  subtitleText.style.display = 'none';
  subtitleText.textContent = '';

  definitionText.style.display = 'none';
  definitionText.textContent = '';
}
// Functions

function displayValidationMessage() {
  anime({
    targets: '.validation-message',
    translateY: 10,
    direction: 'alternate',
    loop: false,
    easing: 'linear'
  });

  searchingText.style.display = 'none';
  searchingText.textContent = '';  

  let message = `Your search must only contain letters. Spaces and hyphens are only accepted if you are searching for open or hyphenated compound words (e.g. 'ice cream', 'mother-in-law').`;
  
  validationMessage.style.display = 'block';
  validationMessage.classList.add('invalid');
  
  validationMessage.textContent = message;
}

function checkInput(word) {
  return (/[0-9]/.test(word)) || 
         (/^\-+$/i.test(word)) || 
         (/^\s+$/i.test(word)) ||
         (/\s+-/.test(word)) ||
         (/- /.test(word)) ||
         (/[!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test(word));
}

async function getResult(word) {
  typeSearchingText(word);

  try {
    const URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
    const response = await fetch(`${URL}${word}`);
    let data = await response.json();

    if (data) {
      anime({
        targets: '.dictionary-results',
        translateY: 10,
        direction: 'alternate',
        loop: false,
        easing: 'linear'
      });

      const partOfSpeech = data[0].meanings[0].partOfSpeech;
      const definition = data[0].meanings[0].definitions[0].definition;
      displayResult(word, partOfSpeech, definition);
    }
  } catch (error) {
    displayError(word);
  }
}

function displayError(word) {
  results.style.display = 'block';
  
  errorText.style.display = 'block';
  errorText.textContent = `Oops! No definition found for ${word}.`;
}

function displayResult(word, partOfSpeech, definition) {
  const resultsElements = [results, wordText, posText, subtitleText, definitionText];

  resultsElements.forEach(element => {
  element.style.display = 'block';
  });

  wordText.textContent = word;
  posText.textContent = partOfSpeech;
  subtitleText.textContent = 'Definition';
  definitionText.textContent = definition;
}

function typeSearchingText(word) {
  const searchingString = `Searching for <span class="search-word">'${word}'</span> ...`;

  searchingText.style.display = 'block';
  searchingText.style.marginTop = '1rem';

  const typed = new Typed('.searching-text', {
    /*
    @property {array} strings strings to be typed
    */
    strings: [
      searchingString,
    ],
  
    /*
    @property {number} typeSpeed type speed in milliseconds
    */
    typeSpeed: 0,

    /*
    @property {string} fadeOutClass css class for fade animation
    @property {boolean} fadeOutDelay Fade out delay in milliseconds
    */
    fadeOut: true,
    fadeOutClass: 'typed-fade-out',
    fadeOutDelay: 50,
  
    /*
     @property {boolean} loop loop strings
     @property {number} loopCount amount of loops
    */
    loop: true,
    loopCount: 1,

    showCursor: false,
    cursorChar: '|',
    autoInsertCss: false,
  });
}