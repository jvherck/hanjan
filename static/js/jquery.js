function loadAffirmation() {
  const settings = {
    "crossDomain": true,
    "url": "https://type.fit/api/quotes",
    "method": "GET"
  }

  $.ajax(settings).done(function (response) {
    const data = JSON.parse(response);
    const quote = data[Math.floor(Math.random()*data.length)]
    $("#affirmationtext").append(quote.text);
    $("#affirmationauthor").append(quote.author);
  });
}