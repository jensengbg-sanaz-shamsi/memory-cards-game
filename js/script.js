

//cards array hold all cards
let previousCard = null;
let matchCard = [];
let cardNumbers = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];
const deck = document.getElementById("deck");

// the start button
let start = document.getElementById('starts');
start.addEventListener('click',startGame);



//start the game
function startGame() {
    // remove old cards from the deck and shuffle the cards and reset the previousCard
    deck.innerHTML = '';
    cardNumbers = shuffle(cardNumbers);
    previousCard = null;
    
    // loop to add create and add all the cards
    for (var i = 0; i < cardNumbers.length; i++) {
        let card = document.createElement("div");
        card.innerHTML = `<div class='title'>Memory Game</div><div class='number'>${cardNumbers[i]}</div >`;
        card.setAttribute('id', `card${i}`);
        card.setAttribute('class', 'card');
        card.setAttribute('data-value', cardNumbers[i]);
        card.addEventListener('click', dispalyCard);
        deck.appendChild(card);
        document.getElementById('header').style.display = 'none';
        document.getElementById('pop-up').style.display = 'none';

    };
}




// toggles open and show class to display cards
function dispalyCard(e) {
    const newCard = this;
    newCard.classList.toggle('open');

    if(previousCard != null) {
        setTimeout(function() { compareCards(newCard); }, 1000);
    }
    else {
        previousCard = newCard;
        newCard.removeEventListener('click', dispalyCard);
    }
}

//compare two cards together
function compareCards(newCard) {
    const firstCardValue = previousCard.dataset.value;
    const secondCardValue = newCard.dataset.value;

    if (firstCardValue !== secondCardValue) {
        previousCard.addEventListener('click', dispalyCard);
        previousCard.classList.remove('open');
        newCard.classList.remove('open');
    }
    else {
        //if two cards were  the same
        previousCard.removeEventListener('click', dispalyCard);
        newCard.removeEventListener('click', dispalyCard);
        matchCard.push(previousCard);
        matchCard.push(newCard);
           if (matchCard.length === 16){
               document.getElementById('pop-up').style.display= 'block';
           }
    }
    
    // empty the game memory
    previousCard = null;

}


//the restart button
let restart = document.getElementById('newstart');
restart.addEventListener('click',startGame);



//shuffle cards
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
   
}





