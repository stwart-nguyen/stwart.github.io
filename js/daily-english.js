function handleTodayWord(todayWordObject) {
  if (todayWordObject.word && todayWordObject.word.length) {
    showTodayWord(todayWordObject);
  }
}

function convertToHash(queryString) {
  if (queryString && queryString.length && queryString.search('=') >= 0) {
    return JSON.parse('{"' + decodeURIComponent(queryString).replace(/\+/g, ' ').replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
  }
  else {
    return {};
  }
}

function convertShallowObjectToQueryString(object) {
  var queryString = Object.keys(object).map(function (key) {
    return encodeURIComponent(key) + '=' + encodeURIComponent(object[key]);
  }).join('&');

  return queryString;
}

function showTodayWord(wordObject) {
  var dailyEnglishElement = document.getElementById('daily-english');

  if (!dailyEnglishElement) return;

  document.getElementById('daily-english__word').innerHTML = wordObject.word;

  var googleWordAnchor = document.getElementById('search-google');
  googleWordAnchor.href = 'https://www.google.com/search?q=' + encodeURIComponent(wordObject.word);
  googleWordAnchor.innerHTML = 'Google it';

  document.getElementById('daily-english__description').innerHTML = wordObject.description || '';

  $(dailyEnglishElement).fadeIn(2000);
}
