$(document).ready(function () {
  var queryStringObject = convertToHash(location.search.substring(1));
  if (queryStringObject.word && queryStringObject.word.length) {
    showTodayWord(queryStringObject);
  }
  else {
    var todayWordAppUrl = 'https://script.google.com/macros/s/AKfycbwabFSQZITkEfwhXg1yjrWmuuVuF3yDuSNYdM7SilsNWp-ZJVjSPZ41e-Ar9GLwNjx3/exec';
    var s = document.createElement('script');
    s.src = todayWordAppUrl;
    document.body.appendChild(s);
  }
});
