let quotes_page;
if ($(location).attr("hostname") === "localhost"){quotes_page="/hanjan/quotes.html"}else{quotes_page="/quotes.html"}

function loadAffirmation() {
  if ($(location).attr('pathname') === quotes_page) {
    const settings = {
      "crossDomain": true,
      "url": "https://type.fit/api/quotes",
      "method": "GET"
    }

    $.ajax(settings).done(function (response) {
      const data = JSON.parse(response);
      const quote = data[Math.floor(Math.random() * data.length)]
      $(".affirmationtext").append(quote.text);
      $(".affirmationauthor").append(quote.author);
    });
  }
  currentQuoteSaved();
}

function currentQuoteSaved(){
  if ($(location).attr('pathname') === quotes_page){
    const text = document.getElementsByClassName("affirmationtext")[0].innerText;
    const quote = getQuote(getQuoteId(text));
    if (quote != null){
      document.getElementsByClassName("savebtn")[0].setAttribute("checked", 'true');
    }
  }
}

function saveQuote(text, author, date) {
  let n = localStorage.length + 1;
  if (getQuote(getQuoteId(text)) == null) {
    while (getQuote(n) != null) {
      n += 1
    }
    const dict = JSON.stringify({"id": n, "text": text, "author": author, "date": date});
    localStorage.setItem(n.toString(), dict);
    if (localStorage.getItem(n.toString())) {
      return true;
    } else {
      return false;
    }
  }
}

function delQuote(id){
  localStorage.removeItem(id.toString());
  if (localStorage.getItem(id.toString()) == null) {return true;} else {return false;}
}

function getQuoteId(text){
  let x = null;
  for (const i in localStorage){
    if ($.isNumeric(i)) {
      const y = JSON.parse(localStorage.getItem((i.toString())));
      if (y.text === text) {
        x = y.id;
        break
      }
    }
  }
  return x
}

function getQuote(id){
  if (id == null){return null;}
  const quote = JSON.parse(localStorage.getItem(id.toString()));
  if (quote){return quote;} else {return null;}
}


$(document).on('change', '.savebtn',function() {
  let text, author;
  const node = this.parentNode.parentNode.childNodes;
  if ($(location).attr("pathname") === quotes_page){
    text = node.item(1).innerText;
    author = node.item(5).innerText;
  } else {
    text = node.item(0).innerText;
    author = node.item(1).innerText;
  }
  if(this.checked) {
    const d = new Date();
    const strDate = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    saveQuote(text, author, strDate);
  } else {
    const quoteId = getQuoteId(text);
    delQuote(quoteId);
  }
});


function showSavedQuotes() {
  const savedquotes = document.getElementById("savedquotes");
  if (localStorage.length > 0) {
    const s = document.createElement("style");
    s.innerText = (".savebtncls{visibility:visible!important;}.savebtn:before{visibility:visible!important;}");
    savedquotes.append(s);
    for (const i in localStorage) {
      if ($.isNumeric(i)) {
        const squote = JSON.parse(localStorage.getItem(i.toString()));
        if (squote != null) {
          const div = document.createElement("li");
          div.className = "affirmation";
          div.innerHTML = (
            "<li id='" + i.toString() + "'>" +
              "<div class='affirmationtext'>" + squote.text + "</div>" +
              "<div style='margin:0.35em;'></div>" +
              "<div class='affirmationauthor'>" + squote.author + "</div>" +
              "<div style=\"margin:5vh;\"></div>" +
              "<label class='savebtncls' style='visibility: visible!important;'>" +
                "<input class='savebtn " + i.toString() + "' type='checkbox' name='save' checked>" +
                "<a>Save Quote</a>" +
              "</label>" +
            "</li>" +
            "<p></p>");
          savedquotes.append(div);
        }
      }
    }
  } else {
    const msg = document.createElement("div");
    msg.className = "affirmation";
    msg.innerHTML = (
        "<div class='affirmationtext' style='font-size:1.15em;'><em>You have no saved quotes.</em></div>"
    )
    savedquotes.append(msg);
  }
}

/*function bouncing_navbar(){
  let i, stop;
  i = 1;
  stop = 4; //num elements
  setInterval(function(){
    if (i > stop){
      return;
    }
    $('#len'+(i++)).toggleClass('bounce');
  }, 500);
}*/

function backToTopFunc(){
  const goToTop = document.getElementById('backToTop');
  window.addEventListener("scroll", function(){
    if(window.scrollY===0){
      //user is at the top of the page; no need to show the back to top button
      goToTop.style.display = "none";
    } else {
      goToTop.style.display = "block";
    }
  });
}

const speed = "slow";
function body_swap(){
  $('body').fadeIn(speed, function() {
    $('a[href], button[href]').click(function(event) {
      const url = $(this).attr('href');
      if (url.indexOf('#') === 0 || url.indexOf('javascript:') === 0) return;
      event.preventDefault();
      $('body').fadeOut(speed, function() {
          window.location = url;
      });
    });
  });
}

$(document).ready(function(){
  loadAffirmation();
  backToTopFunc();
  body_swap();
});