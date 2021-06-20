$(document).ready(function () {
  if ($('#daily-english').length > 0) {
    setTimeout(function () {
      var todayWordAppUrl = 'https://script.google.com/macros/s/AKfycbwabFSQZITkEfwhXg1yjrWmuuVuF3yDuSNYdM7SilsNWp-ZJVjSPZ41e-Ar9GLwNjx3/exec';
      var s = document.createElement('script');
      s.src = todayWordAppUrl;
      document.body.appendChild(s);
    }, 500); // It wont affect at all but will remove the annoying loading status
  }
});
