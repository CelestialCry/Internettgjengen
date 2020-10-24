// Intialiserer sessionObject og henter ut active user
let sessionStorage = window.sessionStorage;
let activeUser = JSON.parse(sessionStorage.getItem("activeUser"));

// ~~~~ MATCHER ~~~~
let matches = [];

// Funksjon for å generere matcher
function generateMatch(bildeUrl, bio, activeIn, interests, exphGrad, born) {
  let matchObj = {
    bilde: bildeUrl, // Filepath til bildet
    bio: bio,
    activeIn: activeIn,
    interests: interests,
    exphGrad: exphGrad,
    born: born
  };
  return matchObj;
}

matches.push(generateMatch("img/profilbilder/E1.jpg", "Monader er egt bare en monoide i kategorien av endofunktorer. Hva er så vanskelig med det?", "Hackerspace, Realfagsdagene","Monader", "C", "01.05.1999"));
matches.push(generateMatch("https://3.bp.blogspot.com/-99GXeCJkLuE/UXL8mClxm0I/AAAAAAAACUw/JTenHOuNbx0/w1200-h630-p-k-no-nu/bilde.jpg", "Hei, jeg heter Magnus. Hva faen heter du?", "Orbit NTNU", "BURN: Bruk koden Magnus15 for 15% avslag på Burn.", "B", "13.01.1999"));
matches.push(generateMatch("https://www.fosna-folket.no/incoming/article9783978.ece/ALTERNATES/w380-default/DSC_2420.JPG", "Hei hei hei, jeg heter Martin, hei hei hei hva heter du?", "Kaffedrikker", "løping", "D", "23.03.99"));
matches.push(generateMatch("img/Indok-styret/maren.jpg","Hei, jeg er vennen til Thomas, men jeg er på utkikk etter flere venner. Vil du være vennen min?", "Thomas", "Være med Thomas", "A", "dd.mm.yy"));
matches.push(generateMatch("img/Indok-styret/sarah.jpg", "Skapkommunist, ja visst. Vil du bli min comrade?", "Rød ungdom", "Maos lille røde", "E", "19.10.98"));

function chooseRandomMatch(gradeReq) {
  let matchesThatSatisfyReqs =  [];
  for (var i=0; i<matches.length; i++) {
    if (matches[i].exphGrad == gradeReq) {
      matchesThatSatisfyReqs.push(matches[i]);
    }
  }
  let randomInt = Math.floor(Math.random() * (matchesThatSatisfyReqs.length));
  let yourMatch = matchesThatSatisfyReqs[randomInt];

  document.getElementById("pbilde").src = yourMatch.bilde;
  document.getElementById("profiltekst").innerHTML = yourMatch.bio;
  document.getElementById("activeInMatch").innerHTML = "<b>Aktiv i:</b> " + yourMatch.activeIn;
  document.getElementById("interestsMatch").innerHTML = "<b>Interesser:</b> " + yourMatch.interests;
  document.getElementById("exphGrad").innerHTML = "<b>Karakter i Ex.Phil:</b> " + yourMatch.exphGrad;
  document.getElementById("born").innerHTML = "<b>Født:</b> " + yourMatch.born;
}

function back() {
    document.getElementById("side2").style = "display: none;"
    document.getElementById("hjerte").style = "display: none;"
    document.getElementById("side1").style = "display: flex;"
  }

function chat() {
    document.getElementById("side1").style = "display:none;"
    document.getElementById("side2").style = "display:inline-flex;"
    document.getElementById("hjerte").style = "display:block"
    chooseRandomMatch(activeUser.grade);
}

function displayMessage(caller)
{

  var chatview = document.getElementById("chatview");

  var nameNode = document.createElement("p");
  var message;
  var name;

  if (caller === 'user')
  {
    message = document.getElementById("chatbar").value;
    name = document.createTextNode("Du: ");
    nameNode.setAttribute("class", "userChatID");
    // clearer chatboxen :))
    document.getElementById("chatbar").value = "";
  }
  else if (caller === "bot")
  {
    message = chatBotMessage();
    name = document.createTextNode("Match: ");
    nameNode.setAttribute("class", "botChatID");
  }
  else { console.log("unknown caller of displayMessage(), pls check ur shit"); }

  nameNode.appendChild(name);

  var messageNode = document.createElement("p");
  var textNode = document.createTextNode(message);
  messageNode.appendChild(textNode);
  messageNode.setAttribute("class", "chatMessage");

  chatview.appendChild(nameNode);
  chatview.appendChild(messageNode);
  chatview.appendChild(document.createElement("br"));
  // scroller til bunn av chat på ny mld
  chatview.scrollTop = chatview.scrollHeight;

  if (caller === "user") { displayMessage("bot"); }
}

// returnerer en random chat-string
function chatBotMessage()
{
  messages = ['hei', 'du er kul', 'vil du booke et grupperom sammen?'];
  return messages[Math.round(Math.random()*(messages.length-1))];
}

document.getElementById("chatbar").addEventListener("keydown", function(key) {
  if(key.keyCode == 13){
      key.preventDefault();
      displayMessage('user');
  }
});
